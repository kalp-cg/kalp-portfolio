import React from 'react';
import { motion } from 'framer-motion';
import { FaDownload } from 'react-icons/fa';
import { useTheme } from '../../context/ThemeContext';

const ResumeButton = ({ className = '' }) => {
  const { theme } = useTheme();
  
  return (
    <motion.a
      href="/resume.pdf"
      download
      className={`inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-white font-medium transition-all hover:bg-primary-dark ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <FaDownload />
      Download Resume
    </motion.a>
  );
};

export default ResumeButton;