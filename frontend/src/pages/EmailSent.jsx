import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import NET from "vanta/dist/vanta.net.min";
import { useLocation } from "react-router-dom";

const EmailSent = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const email = searchParams.get("email");

  const vantaRef = useRef(null);
  const [vantaEffect, setVantaEffect] = useState(null);

  useEffect(() => {
    if (!vantaEffect) {
      const effect = NET({
        el: vantaRef.current,
        THREE: THREE,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.0,
        minWidth: 200.0,
        scale: 1.0,
        scaleMobile: 1.0,
        color: 0x3fff6a,
        backgroundColor: 0x0b0b1b,
        points: 14.0,
        maxDistance: 18.0,
        spacing: 18.0,
      });
      setVantaEffect(effect);
    }

    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  return (
    <div
      ref={vantaRef}
      className="flex flex-col items-center justify-center h-screen px-4"
    >
      <div className="max-w-xl w-full bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md text-center z-10 relative">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4 dark:text-gray-100">
          Verify Your Email
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          We’ve sent a verification link to{" "}
          <span className="text-sm text-blue-600">{email}</span>. <br />
          Please check your inbox and click the link to complete your
          registration.
        </p>
      </div>
    </div>
  );
};

export default EmailSent;
