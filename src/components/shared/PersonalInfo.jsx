import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

const PersonalInfo = ({ showTitle = true }) => {
  const { theme } = useTheme();
  
  const personalDetails = [
    { label: 'First Name', value: 'Kalp' },
    { label: 'Last Name', value: 'Patel' },
    { label: 'Age', value: '18 Years' },
    { label: 'Nationality', value: 'Indian' },
    { label: 'Address', value: 'Ahmedabad, Gujarat, India' },
    { label: 'Phone', value: '+91 99788*****' },
    { label: 'Email', value: 'kalppatel1209@gmail.com' },
    { label: 'Languages', value: 'English, Hindi, Gujarati' }
  ];

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: { 
          opacity: 1,
          transition: { 
            duration: 0.6,
            when: "beforeChildren",
            staggerChildren: 0.05
          }
        }
      }}
    >
      {showTitle && (
        <h3 className={`text-xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
          Personal Info
        </h3>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {personalDetails.map((detail, index) => (
          <motion.div 
            key={index} 
            className="flex"
            variants={itemVariants}
          >
            <span className={`font-medium mr-2 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
              {detail.label}:
            </span>
            <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              {detail.value}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default PersonalInfo;