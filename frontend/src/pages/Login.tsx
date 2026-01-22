import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleLoginSuccess = (credentialResponse: any) => {
    console.log("Google login success:", credentialResponse);
    // Save token in localStorage
    localStorage.setItem("token", credentialResponse.credential);
    navigate("/dashboard");
  };

  const handleLoginError = () => {
    console.error("Login Failed");
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md text-center">
        <h1 className="text-2xl font-bold mb-4">ReachInbox Login</h1>
        <GoogleLogin
          onSuccess={handleLoginSuccess}
          onError={handleLoginError}
        />
      </div>
    </div>
  );
};

export default Login;
