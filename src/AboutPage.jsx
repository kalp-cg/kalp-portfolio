import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from './context/ThemeContext';
import PersonalInfo from './components/shared/PersonalInfo';
import Skills from './components/shared/Skills';
import Education from './components/shared/Education';
import ResumeButton from './components/shared/ResumeButton';

const AboutPage = () => {
  const { theme } = useTheme();
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.6,
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
      transition: { duration: 0.6 }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full h-full overflow-y-auto py-16 px-6 md:px-12"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div variants={itemVariants} className="mb-12">
          <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
            ABOUT <span className="text-primary">ME</span>
          </h1>
          <div className="flex items-center gap-2">
            <span className="w-12 h-1 bg-primary"></span>
            <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              PERSONAL INFO
            </span>
          </div>
        </motion.div>
        
        {/* About Me Section */}
        <motion.div variants={itemVariants} className="mb-16">
          <h3 className={`text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
            I'm Kalp Patel and <span className="text-primary">Web Developer</span>
          </h3>
          
          <p className={`mb-4 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>
            I'm a web designer and developer based in Tunisia with a passion for creating user-friendly, accessible, and responsive websites. 
            I'm very passionate about the work that I do, and always eager to connect with other creative professionals.
          </p>
          
          <p className={`mb-8 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>
            I have been developing websites since 2016, including frontend and backend development. 
            I have a wide range of skills in web design, web development, mobile app development, and desktop application development.
          </p>
          
          <PersonalInfo />
          
          <div className="mt-8">
            <ResumeButton />
          </div>
        </motion.div>
        
        {/* Skills Section */}
        <motion.div variants={itemVariants} className="mb-16">
          <Skills />
        </motion.div>
        
        {/* Education Section */}
        <motion.div variants={itemVariants} className="mb-8">
          <Education />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AboutPage;