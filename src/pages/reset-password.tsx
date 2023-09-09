// pages/reset-password.tsx
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import HTTPService from "@/services/HttpService";
import UrlConstants from "@/utils/constants/UrlConstants";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);
  const router = useRouter();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.authenticated
  );

  const handleResetPassword = async () => {
    try {
      // Send a request to your server to initiate the password reset process
      await HTTPService(
        "POST",
        UrlConstants.base_url + UrlConstants.resetPassword,
        { email }
      );
      setIsEmailSent(true); // Password reset email sent
    } catch (error) {
      // Handle error (e.g., show an error message to the user)
      console.log(error);
    }
  };
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard"); // Redirect to the dashboard if authenticated
    }
  }, [isAuthenticated, router]);

  return (
    <div>
      {isEmailSent ? (
        <p>
          An email with instructions to reset your password has been sent to
          your inbox.{" "}
          <button onClick={() => router.replace("/login")}>
            Back to Login
          </button>
        </p>
      ) : (
        <div>
          <h2>Forgot Password</h2>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={handleResetPassword}>Reset Password</button>
        </div>
      )}
    </div>
  );
};

export default ResetPassword;
