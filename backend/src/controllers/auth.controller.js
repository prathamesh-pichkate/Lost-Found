import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { registerValidation } from "../validations/userValidation.js";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "../utils/sendVerificationEmail.js";
import dotenv from "dotenv";
dotenv.config();

console.log("CLIENT_URL", process.env.CLIENT_URL);

export const registerUser = async (req, res) => {
  try {
    // Validate the data before creating a user
    const { error } = registerValidation.validate(req.body);

    if (error) {
      return res.status(400).json({
        status: false,
        message: error.details[0].message,
      });
    }

    //get the data from the request body
    const { username, fullname, email, password, mobile, profession } =
      req.body;

    //check for user existence
    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(400).json({
        status: false,
        message: "User already exists",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    //Create the token
    const token = jwt.sign(
      {
        username,
        fullname,
        email,
        password: hashedPassword,
        mobile,
        profession,
      },
      process.env.JWT_TOKEN_SECRET,
      { expiresIn: "1h" }
    );

    //verify the email
    await sendVerificationEmail(email, token);

    res.status(200).json({
      status: true,
      message:
        "Verification email sent.Please verify the email for completing the registration",
    });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

export const verifyEmail = async (req, res) => {
  const { token } = req.query;
  console.log("verifyEmail called", token);

  try {
    console.log("JWT_TOKEN_SECRET", process.env.JWT_TOKEN_SECRET);
    const decoded = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
    const { username, fullname, email, password, mobile, profession } = decoded;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.redirect(`${process.env.CLIENT_URL}/login`);

    const newUser = new User({
      username,
      fullname,
      email,
      password,
      mobile,
      profession,
      isEmailVerified: true,
    });
    console.log("newUser", newUser);

    await newUser.save();

    res.status(200).json({ message: "User created successfully." });
  } catch (err) {
    res.status(400).send("Invalid or expired token.");
  }
};

export const loginUser = async (req, res) => {
  console.log("Login request received");

  try {
    const { email, password } = req.body;
    console.log("Login data:", { email, password });

    // 1. Find user
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // 2. Check email verification
    if (!user.isEmailVerified)
      return res
        .status(403)
        .json({ message: "Please verify your email before logging in." });

    // 3. Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    // 4. Create tokens
    const accessToken = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_ACCESS_SECRET,
      { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: "7d" }
    );

    // 5. Save refresh token to DB
    if (!user.refreshTokens.includes(refreshToken)) {
      user.refreshTokens.push(refreshToken);
      await user.save();
    }

    // 6. Set refresh token in secure HTTP-only cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // 7. Send response
    res.status(200).json({
      message: "Login successful",
      accessToken,
      user: {
        id: user._id,
        username: user.username,
        fullname: user.fullname,
        email: user.email,
        mobile: user.mobile,
        profession: user.profession,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

export const logoutUser = async (req, res) => {
  console.log("Logout request received");
  try {
    const token = req.cookies.refreshToken;
    console.log("Token from cookies:", token);

    if (!token) {
      return res.status(204).json({ message: "No token to clear" });
    }

    // 1. Find user with this refresh token
    const user = await User.findOne({ refreshTokens: token });

    if (user) {
      // 2. Remove the refresh token from DB
      user.refreshTokens = user.refreshTokens.filter((t) => t !== token);
      await user.save();
    }

    // 3. Clear the cookie from browser
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    });

    // 4. Respond with success
    return res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    console.error("Logout error:", err);
    res.status(500).json({ message: "Server Error" });
  }
};
