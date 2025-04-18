import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../assets/images";
import { useDispatch, useSelector } from "react-redux";
import {
  loginFailure,
  loginStart,
  loginSuccess,
} from "../redux/auth/authSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  // State for form fields and error
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Handle input change
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
    console.log("Form Data:", formData);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const response = await fetch(`http://localhost:3000/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        dispatch(loginFailure(data.message || "Login failed"));
        return;
      }

      // Save accessToken to localStorage or global state
      localStorage.setItem("accessToken", data.accessToken);
      // Optional: Save user info
      localStorage.setItem("user", JSON.stringify(data.user));

      // Redirect to dashboard or home

      dispatch(loginSuccess(data.user));
      navigate("/");
    } catch (err) {
      console.error("Login error:", err);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex flex-col md:flex-row w-full h-screen p-2 md:10 dark:bg-gray-900">
      {/* Left Side: Form */}
      <div className="w-full md:w-[50%] flex flex-col justify-center p-6 lg:p-32 gap-6 ">
        <h1 className="text-3xl md:text-5xl font-semibold dark:text-gray-100">
          Login
        </h1>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          {/* Email */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="email"
              className="text-sm font-medium dark:text-gray-100"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition dark:bg-gray-700"
              required
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="password"
              className="text-sm font-medium dark:text-gray-100"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition dark:bg-gray-700"
              required
            />
          </div>

          {/* Error */}
          {error && <div className="text-sm text-red-500">{error}</div>}

          {/* Register Link */}
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Don't have an account?{" "}
              <a href="/register" className="text-blue-600 hover:underline">
                Register here
              </a>
            </p>
          </div>

          {/* Submit */}
          <div>
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>
      </div>

      {/* Right Side: Image */}
      <div className="hidden md:flex md:w-[50%] items-center justify-center p-4">
        <img
          src={login}
          alt="Login Visual"
          className="w-full h-auto object-cover rounded-lg"
        />
      </div>
    </div>
  );
};

export default Login;
