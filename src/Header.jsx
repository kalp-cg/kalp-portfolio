import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { FaSun, FaMoon, FaCog, FaBars, FaTimes } from 'react-icons/fa';
import { useTheme } from './context/ThemeContext';
import PropTypes from 'prop-types';

const Header = ({ isMobileNavOpen, setIsMobileNavOpen }) => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [pageTitle, setPageTitle] = useState('Home');

  // Handle scroll event to change header style
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Set page title based on current path
  useEffect(() => {
    const path = location.pathname;
    switch(path) {
      case '/':
        setPageTitle('Home');
        break;
      case '/about':
        setPageTitle('About Me');
        break;
      case '/resume':
        setPageTitle('Resume');
        break;
      case '/projects':
        setPageTitle('Projects');
        break;
      case '/clicks':
        setPageTitle('Clicks');
        break;
      case '/contact':
        setPageTitle('Contact');
        break;
      default:
        setPageTitle('Home');
    }
  }, [location]);

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`sticky top-0 w-full z-40 px-5 sm:px-8 py-4 flex justify-between items-center transition-all duration-300
        ${scrolled 
          ? `${theme === 'dark' ? 'bg-gray-900/90 shadow-lg' : 'bg-white/90 shadow-md'} backdrop-blur-md` 
          : `${theme === 'dark' ? 'bg-transparent' : 'bg-transparent'}`}
        ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
    >
      <div className="flex items-center gap-4">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
          className="text-xl md:hidden relative z-50"
          aria-label="Toggle mobile menu"
        >
          {isMobileNavOpen ? <FaTimes /> : <FaBars />}
        </motion.button>
        
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="hidden md:flex items-center"
        >
          {location.pathname !== '/' && (
            <motion.h1 
              className="text-xl font-bold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              key={pageTitle}
            >
              {pageTitle}
            </motion.h1>
          )}
        </motion.div>
      </div>
      
      {/* Right Side Controls */}
      <div className="flex items-center gap-3 sm:gap-4">
        <motion.button
          onClick={toggleTheme}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className={`flex justify-center items-center w-9 h-9 rounded-full 
            ${theme === 'dark' 
              ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700' 
              : 'bg-gray-100 text-gray-800 hover:bg-gray-200'} 
            transition-colors duration-300`}
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {theme === 'dark' ? <FaSun /> : <FaMoon />}
        </motion.button>
        

      </div>
    </motion.header>
  );
};

Header.propTypes = {
  isMobileNavOpen: PropTypes.bool.isRequired,
  setIsMobileNavOpen: PropTypes.func.isRequired
};

export default Header;