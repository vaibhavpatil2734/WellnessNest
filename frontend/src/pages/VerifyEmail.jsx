// VerifyEmail.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const VerifyEmail = () => {
  const { token } = useParams();
  const [message, setMessage] = useState("");

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await fetch(`https://wellnessnest.onrender.com/api/users/verify-email/${token}`);
  
        if (!response.ok) {
          throw new Error(await response.text());
        }
  
        const data = await response.json();
        setMessage(data.message);
      } catch (error) {
        setMessage(error.message || "An error occurred");
      }
    };
  
    verifyEmail();
  }, [token]);

  return (
    <div className="text-center flex justify-center items-center">
      <h1 className="text-6xl">{message}</h1>
    </div>
  );
};

export default VerifyEmail;
