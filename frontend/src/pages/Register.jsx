import React from "react";
import { useForm } from "react-hook-form";
// import { useDispatch } from "react-redux";
import { signup } from "../assets/images";
import EmailSent from "./EmailSent";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const {
    register: formRegister,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // const dispatch = useDispatch(); // Connect to Redux store if needed

  const onSubmit = async (formData) => {
    try {
      const response = await fetch(`http://localhost:3000/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.status) {
        // Navigate to the email sent page
        navigate(`/email-sent?email=${formData.email}`);
      } else {
        console.error("Registration failed:", data.message);
      }
    } catch (error) {
      console.error("Error during registration:", error.message);
    }
  };

  return (
    <div className="flex flex-col md:flex-row w-full h-screen p-2 md:10 dark:bg-gray-900">
      {/* Left Side: Form */}
      <div className="w-full md:w-[50%] flex flex-col justify-center p-6 lg:p-32 gap-6 ">
        <h1 className="text-3xl md:text-5xl font-semibold dark:text-gray-100">
          Register
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          {/* Fullname */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="fullname"
              className="text-sm font-medium dark:text-gray-100"
            >
              Fullname
            </label>
            <input
              type="text"
              id="fullname"
              {...formRegister("fullname", {
                required: "Fullname is required",
              })}
              placeholder="Enter your full name"
              className="p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition dark:bg-gray-700"
            />
            {errors.fullname && (
              <span className="text-red-500 text-sm">
                {errors.fullname.message}
              </span>
            )}
          </div>

          {/* Username */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="username"
              className="text-sm font-medium dark:text-gray-100"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              {...formRegister("username", {
                required: "Username is required",
              })}
              placeholder="Choose a username"
              className="p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition dark:bg-gray-700"
            />
            {errors.username && (
              <span className="text-red-500 text-sm">
                {errors.username.message}
              </span>
            )}
          </div>

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
              {...formRegister("email", {
                required: "Email is required",
                pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
              })}
              placeholder="Enter your email"
              className="p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition dark:bg-gray-700"
            />
            {errors.email && (
              <span className="text-red-500 text-sm">
                {errors.email.message}
              </span>
            )}
          </div>

          {/* Mobile */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="mobile"
              className="text-sm font-medium dark:text-gray-100"
            >
              Mobile
            </label>
            <input
              type="text"
              id="mobile"
              {...formRegister("mobile", {
                required: "Mobile number is required",
              })}
              placeholder="Enter your mobile number"
              className="p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition dark:bg-gray-700"
            />
            {errors.mobile && (
              <span className="text-red-500 text-sm">
                {errors.mobile.message}
              </span>
            )}
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
              {...formRegister("password", {
                required: "Password is required",
                minLength: 6,
              })}
              placeholder="Enter your password"
              className="p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition dark:bg-gray-700"
            />
            {errors.password && (
              <span className="text-red-500 text-sm">
                {errors.password.message}
              </span>
            )}
          </div>

          {/* Profession */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="profession"
              className="text-sm font-medium dark:text-gray-100"
            >
              Profession
            </label>
            <input
              type="text"
              id="profession"
              {...formRegister("profession")}
              placeholder="Enter your profession"
              className="p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition dark:bg-gray-700"
            />
          </div>

          {/* Already have account */}
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Already have an account?{" "}
              <a href="/login" className="text-blue-600 hover:underline">
                Login here
              </a>
            </p>
          </div>

          {/* Submit */}
          <div>
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
            >
              Register
            </button>
          </div>
        </form>
      </div>

      {/* Right Side: Image */}
      <div className="hidden md:flex md:w-[50%] items-center justify-center p-4">
        <img
          src={signup}
          alt="Register Visual"
          className="w-full h-auto object-cover rounded-lg"
        />
      </div>
    </div>
  );
};

export default Register;
