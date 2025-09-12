import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useTheme } from './context/ThemeContext';

const HomePage = ({ setActivePage }) => {
  const { theme } = useTheme();
  const [currentRole, setCurrentRole] = useState(0);

  const roles = ['MERN Stack Developer', 'UI/UX Enthusiast'];

  // Alternating text effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole(prev => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const backgroundCircleVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: { opacity: 0.1, scale: 1, transition: { delay: 0.6, duration: 1.2, ease: "easeOut" } }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full min-h-[calc(100vh-65px)] flex flex-col lg:flex-row items-center justify-center relative overflow-hidden"
    >
      {/* Background elements */}
      <motion.div
        variants={backgroundCircleVariants}
        className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-primary opacity-5 hidden md:block"
      />
      <motion.div
        variants={backgroundCircleVariants}
        className="absolute bottom-20 -left-20 w-64 h-64 rounded-full bg-primary opacity-5 hidden md:block"
      />

      {/* Main content */}
      <div className="max-w-7xl w-full px-6 sm:px-10 py-10 flex flex-col lg:flex-row items-center justify-between gap-10">
        <div className="w-full lg:w-1/2">
          <motion.span
            variants={itemVariants}
            className="inline-block text-primary text-lg font-medium mb-4 border-b-2 border-primary pb-1"
          >
            WELCOME TO MY WORLD
          </motion.span>

          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight"
          >
            <span className={`block ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>Hi, I'm</span>
            <span className="block text-primary mt-2">Kalp Patel</span>
            <span className={`block mt-2 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
              <span className="inline typing-text relative">
                <motion.span
                  key={currentRole}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="text-primary"
                >
                  {roles[currentRole]}
                </motion.span>
                <span className="absolute -right-1 top-0 h-full w-1 bg-primary animate-blink"></span>
              </span>
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className={`text-lg mb-8 max-w-2xl ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}
          >
            I build clean, scalable, and user-friendly web applications with a focus on modern design and real-world impact.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
            <Link to="/about">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary"
              >
                EXPLORE MY WORK <FaArrowRight className="ml-2" />
              </motion.button>
            </Link>

            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-3 rounded font-medium border-2 border-primary ${theme === 'dark' ? 'text-white' : 'text-gray-800'} hover:bg-primary hover:text-white transition-all duration-300 flex items-center gap-2`}
              >
                CONTACT ME
              </motion.button>
            </Link>
          </motion.div>
        </div>

        {/* Profile Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="w-full lg:w-2/5 flex justify-center lg:justify-end"
        >
          <div className="w-64 h-64 md:w-80 md:h-80 relative">
            <div className="w-full h-full rounded-full bg-primary/20 overflow-hidden flex items-center justify-center">
              <div className="w-[90%] h-[90%] rounded-full bg-primary/30 flex items-center justify-center">
                <div className="w-[85%] h-[85%] rounded-full bg-gray-200 overflow-hidden border-4 border-white dark:border-gray-800 shadow-lg">
                  <img
                    src="https://res.cloudinary.com/dhyds3low/image/upload/v1756541323/file_00000000f8cc62439b42c2e0a5758ffa_ll4x87.png"
                    alt="Profile"
                  />
                  <div className="w-full h-full bg-gradient-to-br from-primary/60 to-blue-400/60"></div>
                </div>
              </div>
            </div>

            {/* Experience badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
              className={`absolute -bottom-4 -right-4 md:bottom-0 md:right-0 rounded-full py-2 px-4 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg`}
            >
              <p className="text-primary font-bold">STILL</p>
              <p className={`text-xs ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>LEARNING</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default HomePage;
