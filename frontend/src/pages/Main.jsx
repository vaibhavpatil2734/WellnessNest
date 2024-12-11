import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Main = () => {
  const { isAuthenticated } = useAuth(); // Get authentication state
  const [isFirstVisit, setIsFirstVisit] = useState(true);

  useEffect(() => {
    if (isFirstVisit) {
      alert('Welcome! This site is under development. For the best experience, please use desktop view.');
      setIsFirstVisit(false);
    }
  }, [isFirstVisit]);
  return (
    <div className="bg-[#181c24] text-white flex flex-col items-center gap-10 w-[90%] m-auto py-10">
      <div className="flex flex-col items-center justify-center md:grid md:grid-cols-2 gap-8 mt-10">
        <div className="flex flex-col items-start gap-4 animate-slideInFromLeft">
          <h1 className="text-5xl font-bold text-teal-400">WellnessNest</h1>
          <p className="text-3xl font-semibold text-gray-300">
            Track your fitness journey, monitor your diet, and set personalized goals.
          </p>
          <Link
            to={"/Features"}
            className="bg-teal-600 p-3 mt-4 text-white rounded-lg hover:bg-teal-500 transition duration-300"
          >
            Discover Our Features
          </Link>
        </div>
        <div>
          {/* Removed Lottie Animation here */}
        </div>
      </div>
      
      <div className="bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 w-full h-[300px] flex items-center justify-center text-white text-2xl rounded-lg shadow-lg">
        <p className="font-semibold text-center text-3xl md:text-4xl">
          "Your potential is limitless. Start today, stay consistent, and achieve your fitness goals."
        </p>
      </div>

      <div className="flex flex-col items-center justify-center gap-4 mt-16">
        <div className="flex flex-col text-center gap-2 animate-fadeIn">
          <h2 className="text-4xl font-semibold text-teal-300">Your Fitness, Your Way</h2>
          <p className="text-gray-400">
            Whether you're looking to lose weight, build muscle, or track your overall health, WellnessNest provides the tools you need to succeed.
          </p>
        </div>
        <div className="flex md:flex-row flex-col gap-8 mt-8">
          <div className="flex flex-col gap-4 border border-gray-600 p-6 rounded-lg bg-gray-800 animate-slideInFromLeft md:animate-scaleIn">
            <h3 className="text-xl font-semibold text-teal-400">Track Your Progress</h3>
            <p className="text-gray-300">
              Monitor your workouts, diet, and progress to achieve your fitness goals.
            </p>
          </div>
          <div className="flex flex-col gap-4 border border-gray-600 p-6 rounded-lg bg-gray-800 animate-slideInFromRight md:animate-scaleIn">
            <h3 className="text-xl font-semibold text-teal-400">Personalized Goals</h3>
            <p className="text-gray-300">
              Set personalized goals and receive tailored insights for your fitness journey.
            </p>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col md:grid md:grid-cols-2 items-center justify-center gap-8 mt-16 mb-16">
        <div className="flex flex-col gap-4 animate-slideInFromLeft">
          <div className="flex flex-col gap-3">
            <h3 className="text-4xl font-semibold text-teal-400">
              Join WellnessNest Today!
            </h3>
            <p className="text-gray-300">
              Sign up and start tracking your workouts, meals, and progress with a personalized dashboard.
            </p>
          </div>
          {!isAuthenticated && (
            <div className="flex gap-4 mt-4">
              <Link
                to="/Register"
                className="bg-teal-600 p-3 text-white rounded-md hover:bg-teal-500 transition duration-300"
              >
                Register
              </Link>
              <Link
                to="/SignIn"
                className="bg-white border border-teal-600 p-3 px-6 text-teal-600 rounded-md hover:bg-teal-100 transition duration-300"
              >
                Login
              </Link>
            </div>
          )}
        </div>
        <div>
          {/* Removed Lottie Animation here */}
        </div>
      </div>
    </div>
  );
};

export default Main;
