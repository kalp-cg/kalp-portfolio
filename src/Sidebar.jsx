// Sidebar.jsx
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaHome, FaUser, FaGraduationCap, FaBriefcase, FaEnvelope, FaRss, FaGithub, FaLinkedin, FaTwitter, FaCode } from 'react-icons/fa';
import { useTheme } from './context/ThemeContext';
import Logo from './components/shared/Logo';

const Sidebar = ({ isMobileNavOpen, setIsMobileNavOpen, handleNavigation }) => {
  const { theme } = useTheme();
  const location = useLocation();

  const menuItems = [
    { path: '/', icon: <FaHome />, text: 'HOME' },
    { path: '/about', icon: <FaUser />, text: 'ABOUT' },
    { path: '/resume', icon: <FaGraduationCap />, text: 'CERTIFICATES' },
    { path: '/projects', icon: <FaBriefcase />, text: 'PROJECTS' },
    { path: '/clicks', icon: <FaRss />, text: 'CLICKS' },
    { path: '/contact', icon: <FaEnvelope />, text: 'CONTACT' },
  ];

  const socialLinks = [
    { icon: <FaGithub />, url: 'https://github.com/kalp-cg', label: 'GitHub' },
    { icon: <FaLinkedin />, url: 'https://www.linkedin.com/in/kalp-patel-/', label: 'LinkedIn' },
    { icon: <FaCode />, url: 'https://leetcode.com/u/kalp-cg/', label: 'LeetCode' },
    { icon: <FaTwitter />, url: 'https://x.com/patel_kalp92111', label: 'Twitter' },
  ];

  const sidebarVariants = {
    hidden: { x: '-100%', opacity: 0 },
    visible: { 
      x: 0,
      opacity: 1,
      transition: { 
        type: 'spring', 
        stiffness: 300, 
        damping: 30,
        when: 'beforeChildren',
        staggerChildren: 0.1,
      },
    },
    exit: { x: '-100%', opacity: 0, transition: { duration: 0.3 } },
  };

  const childVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { type: 'spring', stiffness: 300, duration: 0.3 },
    },
  };

  const menuItemVariants = {
    hover: { 
      scale: 1.05,
      x: 8,
      color: 'var(--color-primary)',
      transition: { type: 'spring', stiffness: 400, damping: 10 },
    },
  };

  const socialIconVariants = {
    hover: { 
      scale: 1.2,
      color: 'var(--color-primary)',
      transition: { type: 'spring', stiffness: 400, damping: 10 },
    },
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <motion.aside
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={sidebarVariants}
        className={`fixed top-0 left-0 w-20 lg:w-72 h-full z-[100] hidden md:flex flex-col will-change-transform
          ${theme === 'dark' 
            ? 'bg-gray-900 border-r border-gray-800' 
            : 'bg-white shadow-lg border-r border-gray-100'}`}
      >
        <motion.div 
          variants={childVariants}
          className="flex flex-col items-center lg:items-start pt-8 px-4 lg:px-10 mb-8"
        >
          <Logo />
        </motion.div>
        
        <motion.nav 
          variants={childVariants}
          className="flex-1 px-2 lg:px-6 py-8"
        >
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <motion.li key={item.path} variants={childVariants}>
                <NavLink
                  to={item.path}
                  onClick={handleNavigation}
                  className={({ isActive }) => 
                    `flex flex-col lg:flex-row items-center lg:items-center justify-center lg:justify-start py-3 px-3 lg:px-6 rounded-xl transition-all duration-300
                     ${isActive 
                       ? `text-primary ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-gray-100/80'}` 
                       : theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`
                  }
                >
                  <motion.div
                    whileHover="hover"
                    variants={menuItemVariants}
                    className="flex items-center w-full"
                  >
                    <span className="text-xl lg:text-lg lg:mr-4">{item.icon}</span>
                    <span className="hidden lg:block font-medium">{item.text}</span>
                    
                    {/* Active indicator - only visible on active and lg screens */}
                    {location.pathname === item.path && (
                      <motion.span 
                        layoutId="activeIndicator"
                        className="hidden lg:block ml-auto w-2 h-2 rounded-full bg-primary"
                      />
                    )}
                  </motion.div>
                  
                  {/* Text label for md screens */}
                  <span className="text-xs mt-1 lg:hidden font-medium">{item.text}</span>
                </NavLink>
              </motion.li>
            ))}
          </ul>
        </motion.nav>
        
        {/* Social Media Links */}
        <motion.div 
          variants={childVariants}
          className="hidden lg:block mt-auto px-10 pb-8"
        >
          <div className="pt-6 border-t border-gray-200 dark:border-gray-800">
            <p className={`text-xs mb-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>FOLLOW ME</p>
            <div className="flex justify-start gap-4">
              {socialLinks.map((link, index) => (
                <motion.a 
                  key={index}
                  href={link.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  whileHover="hover"
                  variants={socialIconVariants}
                  className={`text-lg p-2 rounded-full transition-all duration-300 
                    ${theme === 'dark' ? 'text-gray-400 hover:text-primary' : 'text-gray-600 hover:text-primary'}`}
                  aria-label={link.label}
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>
        
        {/* Copyright - only on lg screens */}
        <motion.div 
          variants={childVariants}
          className="hidden lg:block px-10 py-4 text-xs text-gray-500 dark:text-gray-400"
        >
          © {new Date().getFullYear()} Kalp Patel
        </motion.div>
      </motion.aside>
      
      {/* Mobile Menu Overlay */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: isMobileNavOpen ? 0.7 : 0 }}
        transition={{ duration: 0.3 }}
        className={`fixed inset-0 bg-black z-[90] backdrop-blur-sm ${isMobileNavOpen ? 'block pointer-events-auto' : 'pointer-events-none'}`}
        onClick={() => setIsMobileNavOpen(false)}
      ></motion.div>
      
      {/* Mobile Menu */}
      <motion.div
        initial={{ x: '-100%', opacity: 0 }}
        animate={{ 
          x: isMobileNavOpen ? 0 : '-100%',
          opacity: isMobileNavOpen ? 1 : 0,
        }}
        exit={{ x: '-100%', opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className={`fixed top-0 left-0 w-72 h-full z-[110] overflow-y-auto will-change-transform
          ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'} shadow-2xl md:hidden`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-800">
            <Logo size="small" />
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMobileNavOpen(false)} 
              className={`rounded-full p-2 ${theme === 'dark' ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-600'}`}
              aria-label="Close menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.button>
          </div>
          
          {/* Navigation */}
          <nav className="flex-1 p-6">
            <ul className="space-y-4">
              {menuItems.map((item) => (
                <motion.li 
                  key={item.path}
                  whileHover={{ x: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <NavLink
                    to={item.path}
                    onClick={handleNavigation}
                    className={({ isActive }) => 
                      `flex items-center gap-4 py-3 px-4 rounded-xl transition-all duration-300
                       ${isActive 
                         ? `text-primary ${theme === 'dark' ? 'bg-gray-800/70' : 'bg-gray-100'}` 
                         : theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`
                    }
                  >
                    <span className="text-xl">{item.icon}</span>
                    <span className="font-medium">{item.text}</span>
                    
                    {/* Active indicator */}
                    {location.pathname === item.path && (
                      <motion.span 
                        layoutId="mobileActiveIndicator"
                        className="ml-auto w-2 h-2 rounded-full bg-primary"
                      />
                    )}
                  </NavLink>
                </motion.li>
              ))}
            </ul>
          </nav>
          
          {/* Social Links */}
          <div className="p-6 border-t border-gray-200 dark:border-gray-800">
            <p className={`text-sm font-medium mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              Connect with me
            </p>
            <div className="flex gap-4">
              {socialLinks.map((link, index) => (
                <motion.a 
                  key={index}
                  href={link.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.15, color: 'var(--color-primary)' }}
                  transition={{ type: 'spring', stiffness: 400 }}
                  className={`p-3 rounded-full ${theme === 'dark' ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-700'}`}
                  aria-label={link.label}
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;