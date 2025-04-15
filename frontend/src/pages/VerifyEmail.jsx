import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

const VerifyEmail = () => {
  const [status, setStatus] = useState("Verifying...");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async () => {
      const token = searchParams.get("token");
      console.log("Token from URL:", token);
      if (!token) {
        setStatus("❌Invalid verification link.");
        return;
      }

      try {
        const res = await fetch(
          `http://localhost:3000/api/auth/verify-email?token=${token}`
        );
        if (res.ok) {
          setStatus("✅ Email verified successfully!");
          setTimeout(() => navigate("/login"), 2000);
        } else {
          const msg = await res.text();
          setStatus(`❌ Verification failed: ${msg}`);
        }
      } catch (error) {
        setStatus("❌ Something went wrong.");
      }
    };

    verifyToken();
  }, [searchParams, navigate]);

  return (
    <div className="text-center mt-20 text-xl font-medium">
      <h1>{status}</h1>
    </div>
  );
};

export default VerifyEmail;
