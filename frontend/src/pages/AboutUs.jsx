import React from "react";
import { motion } from "framer-motion";

const AboutUs = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      className="min-h-screen py-16 bg-gray-900 text-white"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="container mx-auto px-6 md:px-12">
        {/* Section: About WellnessNest */}
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <h1 className="text-4xl md:text-5xl font-bold text-blue-500 mb-6">
            About WellnessNest
          </h1>
          <motion.p
            className="text-lg md:text-xl leading-relaxed text-gray-300 mx-auto max-w-3xl"
            variants={itemVariants}
          >
            WellnessNest is a cutting-edge MERN stack application designed to help
            individuals track their fitness journeys. It combines the power of
            modern web technologies with an easy-to-use interface, allowing users to
            log workouts, monitor nutrition, set personalized goals, and track their
            progress in real-time. Whether you're just starting your fitness journey
            or aiming to take it to the next level, WellnessNest provides the tools
            to guide you every step of the way.
          </motion.p>
        </motion.div>

        {/* Section: Project Features */}
        <motion.div
          className="bg-gray-800 rounded-lg shadow-lg p-8 mb-16"
          variants={itemVariants}
        >
          <h2 className="text-3xl font-semibold text-center text-blue-400 mb-8">
            Key Features of WellnessNest
          </h2>
          <motion.ul
            className="text-lg md:text-xl text-gray-300 leading-relaxed list-disc pl-6 space-y-4"
            variants={itemVariants}
          >
            <li>
              <strong>Workout Logging:</strong> Easily log your daily workouts with
              detailed metrics for each session.
            </li>
            <li>
              <strong>Nutrition Tracking:</strong> Track your meals and receive
              nutrition insights to help you stay on track with your goals.
            </li>
            <li>
              <strong>Goal Setting:</strong> Set personalized fitness goals and
              track your progress with visual reports.
            </li>
            <li>
              <strong>Progress Monitoring:</strong> View detailed progress charts and
              insights based on your logged data, helping you adjust your routine as
              needed.
            </li>
            <li>
              <strong>Community Support:</strong> Engage with the WellnessNest
              community for motivation, tips, and support.
            </li>
          </motion.ul>
        </motion.div>

        {/* Section: Our Mission */}
        <motion.div
          className="mb-16"
          variants={itemVariants}
        >
          <h2 className="text-3xl font-semibold text-center text-blue-400 mb-8">
            Our Mission
          </h2>
          <motion.p
            className="text-lg md:text-xl text-gray-300 leading-relaxed"
            variants={itemVariants}
          >
            At WellnessNest, our mission is simple: to make fitness accessible,
            engaging, and sustainable. We aim to empower individuals by providing
            them with a platform where they can log their fitness activities, track
            their progress, and receive expert insights that help them achieve their
            health and fitness goals. We are driven by the belief that everyone
            deserves a healthier, happier life.
          </motion.p>
        </motion.div>

        {/* Section: Join Us on Your Fitness Journey */}
        <motion.div
          className="bg-gray-700 rounded-lg shadow-lg p-8"
          variants={itemVariants}
        >
          <h2 className="text-3xl font-semibold text-center text-blue-500 mb-8">
            Start Your Fitness Journey Today
          </h2>
          <motion.p
            className="text-lg md:text-xl text-gray-300 leading-relaxed mb-8"
            variants={itemVariants}
          >
            WellnessNest is here to support you at every stage of your fitness
            journey. Whether you're just beginning or striving to push your limits,
            we have the tools and resources to help you succeed. Join us and start
            your fitness journey today!
          </motion.p>
          <div className="text-center">
          
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AboutUs;
