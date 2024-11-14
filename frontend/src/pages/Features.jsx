import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowRight, FaDumbbell, FaAppleAlt, FaCalculator, FaUserPlus, FaChartLine, FaEdit } from "react-icons/fa";

const FeatureCard = ({ title, description, link, icon }) => {
  return (
    <motion.div 
      className="bg-gray-800 text-center rounded-xl shadow-lg p-6 mb-6 flex flex-col items-center justify-between h-full hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105"
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div>
        <motion.h3 
          className="text-xl font-semibold text-center mt-3 mb-4 text-teal-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {title}
        </motion.h3>
        <motion.p 
          className="text-gray-300 mb-6 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <span className="mr-2 text-xl">{icon}</span> {description}
        </motion.p>
      </div>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Link
          to={link}
          className="group flex items-center bg-teal-600 text-white px-5 py-3 rounded-full hover:bg-teal-500 transition-colors duration-300 transform hover:scale-105"
        >
          Learn More
          <motion.span
            initial={{ x: 0 }}
            animate={{ x: 5 }}
            transition={{ repeat: Infinity, duration: 0.8, repeatType: "reverse" }}
          >
            <FaArrowRight className="ml-2" />
          </motion.span>
        </Link>
      </motion.div>
    </motion.div>
  );
};

const Features = () => {
  const features = [
    {
      title: "Explore Our Workout Library",
      description:
        "Find the perfect routine tailored to your fitness goals.",
      link: "/WorkoutDatabase",
      icon: <FaDumbbell />
    },
    {
      title: "Analyze Your Nutrition",
      description:
        "Check the nutritional values of any food, including calories, protein, and more.",
      link: "/NutritionChecker",
      icon: <FaAppleAlt />
    },
    {
      title: "Calculate Your BMR",
      description:
        "Calculate your Basal Metabolic Rate (BMR) to understand your daily calorie needs.",
      link: "/BmrCalculator",
      icon: <FaCalculator />
    },
    {
      title: "Join Us Today",
      description:
        "Create an account to access personalized features and save your progress.",
      link: "/Register",
      icon: <FaUserPlus />
    },
    {
      title: "Track Your Progress",
      description:
        "Track your progress with detailed charts and visual analytics.",
      link: "/profile/workout-details",
      icon: <FaChartLine />
    },
    {
      title: "Update Your Profile",
      description:
        "Keep your profile up-to-date with the latest information.",
      link: "/profile/update-profile",
      icon: <FaEdit />
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  // New animation for the title letters
  const letterVariants = {
    hover: {
      scale: 1.3,
      color: "#38bdf8", // neon effect
      textShadow: "0px 0px 8px #38bdf8",
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <motion.div 
      className="min-h-screen py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-4xl font-bold text-center mb-12 text-teal-300"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {"App Features".split('').map((letter, index) => (
            <motion.span
              key={index}
              variants={letterVariants}
              whileHover="hover"
              style={{ display: 'inline-block' }}
            >
              {letter}
            </motion.span>
          ))}
        </motion.h2>
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={itemVariants}>
              <FeatureCard
                title={feature.title}
                description={feature.description}
                link={feature.link}
                icon={feature.icon}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Features;
