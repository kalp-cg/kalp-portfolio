import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaPlus, FaLink, FaPlay, FaSpinner } from 'react-icons/fa';
import { useTheme } from '../../context/ThemeContext';
import PropTypes from 'prop-types';

const ProjectItem = ({ item }) => {
  const { theme } = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isImageVisible, setIsImageVisible] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const imageRef = useRef(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsImageVisible(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '50px',
        threshold: 0.1
      }
    );

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Start loading when image becomes visible
  useEffect(() => {
    if (isImageVisible && !isImageLoaded && !isImageLoading) {
      setIsImageLoading(true);
    }
  }, [isImageVisible, isImageLoaded, isImageLoading]);

  const handleImageLoad = () => {
    setIsImageLoaded(true);
    setIsImageLoading(false);
  };

  const handleImageError = () => {
    setIsImageLoading(false);
  };

  const getIcon = () => {
    if (item.category === 'mobile') {
      return <FaPlay />;
    } else {
      return <FaLink />;
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`overflow-hidden rounded-lg shadow-lg ${theme === 'dark' ? 'shadow-gray-800' : 'shadow-gray-200'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden w-full h-64" ref={imageRef}>
        {/* Loading Spinner */}
        {isImageLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-200 dark:bg-gray-700">
            <FaSpinner className="animate-spin text-primary" size={24} />
          </div>
        )}

        {/* Placeholder */}
        {!isImageVisible && !isImageLoaded && (
          <div 
            className="w-full h-full bg-gray-200 dark:bg-gray-700 animate-pulse"
          />
        )}

        {/* Project Image */}
        {item.image && isImageVisible ? (
          <img 
            src={item.image} 
            alt={item.title}
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              isImageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={handleImageLoad}
            onError={handleImageError}
            loading="lazy"
          />
        ) : (
          <div 
            className="w-full h-full bg-gray-300"
            style={{ backgroundColor: theme === 'dark' ? '#333' : '#e5e7eb' }}
          />
        )}

        <motion.div 
          className="absolute inset-0 bg-primary/90 flex flex-col items-center justify-center p-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.span 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="text-xl font-bold text-white mb-2 text-center"
          >
            {item.title}
          </motion.span>
          
          <motion.span 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="text-sm text-white/90 capitalize mb-4 text-center"
          >
            {item.category}
          </motion.span>
          
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="flex flex-col items-center gap-2"
          >
            <motion.a 
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ scale: 0 }}
              animate={{ scale: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
              className="w-12 h-12 rounded-full bg-white text-primary flex items-center justify-center hover:bg-gray-200 transition-colors shadow-lg"
            >
              {getIcon()}
            </motion.a>
            <span className="text-xs text-white/80">View Live</span>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

ProjectItem.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    image: PropTypes.string
  }).isRequired
};

export default ProjectItem;