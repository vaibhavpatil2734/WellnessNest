import React, { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post("https://wellnessnest.onrender.com/api/users/register", {
        name,
        email,
        password,
      });

      navigate("/SignIn");
      toast.success(
        "Registration successful. Please check your email to verify your account."
      );
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.response?.data || error.message;
      toast.error(errorMessage);
    }
  };

  return (
    <div
      className="flex justify-center items-center w-full h-screen bg-cover bg-center bg-no-repeat animate-fadeIn"
      style={{ backgroundImage: `url('/registerbg1.jpg')` }}
    >
      <div className="bg-black bg-opacity-60 rounded-xl p-8 w-96 animate-slideUp">
        <h2 className="text-4xl font-semibold text-white text-center mb-8">Register</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              required
              className="w-full p-4 bg-transparent border-2 border-white rounded-full text-white text-lg placeholder:text-gray-400 focus:outline-none focus:border-orange-400"
            />
          </div>
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="w-full p-4 bg-transparent border-2 border-white rounded-full text-white text-lg placeholder:text-gray-400 focus:outline-none focus:border-orange-400"
            />
          </div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="w-full p-4 bg-transparent border-2 border-white rounded-full text-white text-lg placeholder:text-gray-400 focus:outline-none focus:border-orange-400"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2"
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} className="text-white" />
            </button>
          </div>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              required
              className="w-full p-4 bg-transparent border-2 border-white rounded-full text-white text-lg placeholder:text-gray-400 focus:outline-none focus:border-orange-400"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2"
            >
              <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} className="text-white" />
            </button>
          </div>
          <button
            className="w-full p-4 text-lg bg-transparent border-2 border-white rounded-full text-white hover:bg-orange-400 hover:text-black transition duration-300"
            type="submit"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
