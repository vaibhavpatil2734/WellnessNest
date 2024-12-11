import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false); // New loading state
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    try {
      // Sending login request to the server with the email and password
      const response = await axios.post("https://wellnessnest.onrender.com/api/users/login", {
        email,
        password,
      });

      // Display success toast
      toast.success("Sign in successful");

      // Use the login function to store the token and mark the user as logged in
      login(response.data.token);

      // Redirect to the home page
      navigate("/");
    } catch (error) {
      // Display error toast if login fails
      console.error("Error signing in:", error.response?.data || error.message);
      toast.error("Login failed, please try again!");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="flex justify-center items-center w-full h-[80vh]">
      <div className="text-white w-[90%] max-w-[400px] bg-[rgba(0,0,0,0.25)] rounded-[2.5rem] p-8">
        <h2 className="text-5xl font-semibold text-center">Sign In</h2>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col w-full justify-center items-center gap-6 mt-8"
        >
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="p-6 bg-slate-900 py-3 text-2xl border-white border w-full hover:border-orange-400 rounded-full"
            />
          </div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              className="p-6 bg-slate-900 py-3 text-2xl border-white border w-full hover:border-orange-400 rounded-full"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2"
            >
              <FontAwesomeIcon
                icon={showPassword ? faEyeSlash : faEye}
                className="text-white"
              />
            </button>
          </div>

          {/* Disable the button when loading */}
          <button
            className={`p-3 text-2xl bg-slate-900 py-3 border-white border hover:border-orange-400 w-full mt-12 rounded-full ${
              loading ? "cursor-not-allowed opacity-50" : ""
            }`}
            type="submit"
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"} {/* Show loading state */}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
