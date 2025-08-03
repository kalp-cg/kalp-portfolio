import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import PropTypes from 'prop-types';

const Logo = ({ size = 'default', showText = true }) => {
  const { theme } = useTheme();
  
  // Define size classes
  const sizeClasses = {
    small: 'w-10 h-10 text-lg',
    default: 'w-16 h-16 text-2xl',
    large: 'w-20 h-20 text-3xl'
  };
  
  return (
    <Link to="/" className="flex items-center gap-3 group">
      <motion.div 
        className={`relative ${sizeClasses[size]} rounded-lg bg-gradient-to-br from-primary to-primary/80 shadow-md overflow-hidden`}
        whileHover={{ 
          scale: 1.05,
          transition: { duration: 0.2 }
        }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 400, damping: 15 }}
      >
        {/* Simple logo content */}
        <div className="flex items-center justify-center w-full h-full">
          <div className="relative">
            {/* Simple code brackets */}
            <div className="text-white font-mono font-bold text-xl">
              {'</>'}
            </div>
            
            {/* Simple dot */}
            <motion.div
              className="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.8, 1, 0.8]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            />
          </div>
        </div>
        
        {/* Simple border */}
        <div className="absolute inset-0 rounded-lg border border-white/20"></div>
      </motion.div>
      
      {showText && (
        <motion.div 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="hidden lg:block"
        >
          <motion.h1 
            className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}
            whileHover={{ color: 'var(--color-primary)' }}
            transition={{ duration: 0.3 }}
          >
            Kalp Patel
          </motion.h1>
          <motion.p 
            className="text-primary font-medium text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
          >
            Web Developer & UI/UX Designer
          </motion.p>
        </motion.div>
      )}
    </Link>
  );
};

Logo.propTypes = {
  size: PropTypes.oneOf(['small', 'default', 'large']),
  showText: PropTypes.bool
};

export default Logo;