import React from "react";
import { useLocation } from "react-router-dom";

const EmailSent = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const email = searchParams.get("email");

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900 px-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md text-center">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4 dark:text-gray-100">
          Verify Your Email
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          We’ve sent a verification link to{" "}
          <span className="font-medium text-blue-600">{email}</span>. <br />
          Please check your inbox and click the link to complete your
          registration.
        </p>
      </div>
    </div>
  );
};

export default EmailSent;
