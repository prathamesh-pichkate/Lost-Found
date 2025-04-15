import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

console.log("sendVerificationEmail called email_user", process.env.EMAIL_USER);
console.log("sendVerificationEmail called email_pass", process.env.EMAIL_PASS);

export const sendVerificationEmail = async (userEmail, token) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  console.log("user email", userEmail);
  console.log("token", token);

  const verificationLink = `${process.env.CLIENT_URL}/verify-email?token=${token}`;
  console.log("verificationLink :", verificationLink);

  const mailOptions = {
    from: `"Lost & Found" <${process.env.EMAIL_USER}>`,
    to: userEmail,
    subject: "Verify your email - Lost & Found",
    html: `
      <h2>Verify your Email</h2>
      <p>Click the link below to verify your email and complete registration:</p>
      <a href="${verificationLink}" target="_blank">Verify Email</a>
    `,
  };

  await transporter.sendMail(mailOptions);
};
