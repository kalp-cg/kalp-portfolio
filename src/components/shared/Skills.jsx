import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

const Skills = () => {
  const { theme } = useTheme();

  const skills = [
    'HTML5', 'JavaScript', 'C++', 'CSS3', 'AWS', 'Google Cloud', 
    'Cloudflare', 'Netlify', 'Vercel', 'Firebase', 'Chakra', 
    'Context-API', 'Express.js', 'JWT', 'MUI', 'NodeJS', 'React', 
    'Vite', 'TailwindCSS', 'MongoDB', 'Figma', 'Canva'
  ];

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: { duration: 0.6 }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full"
    >
      <h3 className={`text-2xl font-bold mb-8 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
        Skills & Technologies
      </h3>
      
      <div className="relative overflow-hidden bg-gray-100 dark:bg-gray-800 rounded-lg p-6 max-w-full">
        <div className="flex animate-scroll" style={{ width: 'max-content' }}>
          {/* First set of skills */}
          <div className="flex gap-4 whitespace-nowrap">
            {skills.map((skill, index) => (
              <span
                key={`${skill}-1`}
                className={`px-4 py-2 rounded-full text-sm font-medium flex-shrink-0 ${
                  theme === 'dark' 
                    ? 'bg-gray-700 text-gray-200 border border-gray-600' 
                    : 'bg-white text-gray-700 border border-gray-200'
                } hover:border-primary transition-colors duration-300 shadow-sm`}
              >
                {skill}
              </span>
            ))}
          </div>
          
          {/* Duplicate set for seamless loop */}
          <div className="flex gap-4 whitespace-nowrap ml-8">
            {skills.map((skill, index) => (
              <span
                key={`${skill}-2`}
                className={`px-4 py-2 rounded-full text-sm font-medium flex-shrink-0 ${
                  theme === 'dark' 
                    ? 'bg-gray-700 text-gray-200 border border-gray-600' 
                    : 'bg-white text-gray-700 border border-gray-200'
                } hover:border-primary transition-colors duration-300 shadow-sm`}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Skills;