import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowLeft, FaArrowRight, FaTimes, FaExpand, FaSpinner } from 'react-icons/fa';
import { useTheme } from '../../context/ThemeContext';
import PropTypes from 'prop-types';

const ImageViewer = ({ images }) => {
  const { theme } = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loadedImages, setLoadedImages] = useState(new Set());
  const [visibleImages, setVisibleImages] = useState(new Set());
  const [loadingImages, setLoadingImages] = useState(new Set());
  const imageRefs = useRef({});
  
  // Guard clause for empty or undefined images array
  if (!images || images.length === 0) {
    return (
      <div className={`w-full p-8 text-center ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
        <p>No images available</p>
      </div>
    );
  }
  
  const currentImage = images[currentIndex];

  // Intersection Observer for lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const imageId = entry.target.dataset.imageId;
            setVisibleImages(prev => new Set([...prev, imageId]));
          }
        });
      },
      {
        rootMargin: '200px', // Increased margin for earlier loading
        threshold: 0.1
      }
    );

    // Observe all image containers
    Object.values(imageRefs.current).forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [images]);

  // Immediately show first few images for better UX
  useEffect(() => {
    if (images.length > 0) {
      const initialImages = images.slice(0, 6).map(img => img.id); // Show first 6 images immediately
      setVisibleImages(new Set(initialImages));
    }
  }, [images]);

  // Keyboard navigation for modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isModalOpen) return;
      
      switch (e.key) {
        case 'Escape':
          closeModal();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          prevImage();
          break;
        case 'ArrowRight':
          e.preventDefault();
          nextImage();
          break;
        default:
          break;
      }
    };

    if (isModalOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isModalOpen]);

  // Load image when it becomes visible
  const handleImageLoad = (imageId) => {
    setLoadedImages(prev => new Set([...prev, imageId]));
    setLoadingImages(prev => {
      const newSet = new Set(prev);
      newSet.delete(imageId);
      return newSet;
    });
  };

  const handleImageError = (imageId) => {
    setLoadingImages(prev => {
      const newSet = new Set(prev);
      newSet.delete(imageId);
      return newSet;
    });
  };

  const startImageLoad = (imageId) => {
    setLoadingImages(prev => new Set([...prev, imageId]));
  };

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const openModal = (index) => {
    setCurrentIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Lazy Image Component
  const LazyImage = ({ image, index, isThumbnail = false, onClick }) => {
    const isVisible = visibleImages.has(image.id);
    const isLoaded = loadedImages.has(image.id);
    const isLoading = loadingImages.has(image.id);

    // For thumbnails, always show them when visible
    // For main image, use lazy loading
    const shouldShowImage = isThumbnail ? isVisible : (isVisible && isLoaded);

    useEffect(() => {
      if (isVisible && !isLoaded && !isLoading) {
        startImageLoad(image.id);
      }
    }, [isVisible, isLoaded, isLoading, image.id]);

    return (
      <div
        ref={(el) => {
          imageRefs.current[image.id] = el;
        }}
        data-image-id={image.id}
        className={`relative ${isThumbnail ? 'h-20' : 'h-96'} rounded-lg overflow-hidden cursor-pointer ${
          isThumbnail && index === currentIndex ? 'ring-2 ring-primary' : ''
        }`}
        onClick={onClick}
      >
        {/* Loading Spinner - only for main image */}
        {isLoading && !isThumbnail && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-200 dark:bg-gray-700">
            <FaSpinner className="animate-spin text-primary" size={24} />
          </div>
        )}

        {/* Placeholder - only when image is not visible */}
        {!isVisible && (
          <div 
            className="w-full h-full bg-gray-200 dark:bg-gray-700 animate-pulse"
          />
        )}

        {/* Actual Image */}
        {isVisible && (
          <img
            src={image.image}
            alt={image.title}
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              shouldShowImage ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => handleImageLoad(image.id)}
            onError={() => handleImageError(image.id)}
            loading={isThumbnail ? "lazy" : "eager"}
          />
        )}

        {/* Overlay for main image */}
        {!isThumbnail && (
          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-white text-center p-6"
            >
              <h2 className="text-3xl font-bold mb-2">{image.title}</h2>
              <p className="text-lg">{image.category}</p>
            </motion.div>
          </div>
        )}

        {/* Active indicator for thumbnails */}
        {isThumbnail && index === currentIndex && (
          <div className="absolute inset-0 bg-primary bg-opacity-30"></div>
        )}

        {/* Hover effect for thumbnails */}
        {isThumbnail && (
          <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-200"></div>
        )}
      </div>
    );
  };

  return (
    <div className="w-full">
      {/* Main Featured Image */}
      <div className="relative w-full mb-6">
        <LazyImage 
          image={currentImage} 
          index={currentIndex}
          onClick={() => openModal(currentIndex)}
        />

        {/* Navigation Arrows */}
        <button 
          onClick={prevImage}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black bg-opacity-50 text-white flex items-center justify-center hover:bg-opacity-70 transition-all"
          aria-label="Previous image"
        >
          <FaArrowLeft />
        </button>
        <button 
          onClick={nextImage}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black bg-opacity-50 text-white flex items-center justify-center hover:bg-opacity-70 transition-all"
          aria-label="Next image"
        >
          <FaArrowRight />
        </button>
      </div>

      {/* Thumbnail Gallery with Lazy Loading */}
      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-3 mb-8">
        {images.map((image, index) => (
          <motion.div
            key={image.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`relative ${index === currentIndex ? 'ring-2 ring-primary ring-offset-2' : ''}`}
          >
            <LazyImage 
              image={image} 
              index={index}
              isThumbnail={true}
              onClick={() => openModal(index)}
            />
            
            {/* Image number indicator */}
            <div className="absolute top-1 right-1 bg-black bg-opacity-50 text-white text-xs px-1 py-0.5 rounded">
              {index + 1}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Image Details */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className={`p-6 rounded-xl mb-8 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}
      >
        <h3 className={`text-2xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
          {currentImage.title}
        </h3>
        <div className="flex items-center gap-4 mb-4">
          <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            {currentImage.date}
          </span>
          <span className="px-3 py-1 text-xs font-medium text-white rounded-full bg-primary">
            {currentImage.category}
          </span>
        </div>
        <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
          {currentImage.description}
        </p>
      </motion.div>

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-4"
          >
            <button 
              onClick={closeModal}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black bg-opacity-50 text-white flex items-center justify-center hover:bg-opacity-70 transition-all z-10"
              aria-label="Close modal"
            >
              <FaTimes />
            </button>
            
            <button 
              onClick={toggleFullscreen}
              className="absolute top-4 left-4 w-10 h-10 rounded-full bg-black bg-opacity-50 text-white flex items-center justify-center hover:bg-opacity-70 transition-all z-10"
              aria-label="Toggle fullscreen"
            >
              <FaExpand />
            </button>

            <div className="relative w-full max-w-5xl">
              <motion.div
                key={`modal-${currentIndex}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className={`w-full ${isFullscreen ? 'h-screen' : 'h-auto max-h-[80vh]'} flex items-center justify-center`}
              >
                <img 
                  src={currentImage.image} 
                  alt={currentImage.title} 
                  className="max-w-full max-h-full object-contain"
                />
              </motion.div>

              <button 
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black bg-opacity-50 text-white flex items-center justify-center hover:bg-opacity-70 transition-all"
                aria-label="Previous image"
              >
                <FaArrowLeft />
              </button>
              <button 
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black bg-opacity-50 text-white flex items-center justify-center hover:bg-opacity-70 transition-all"
                aria-label="Next image"
              >
                <FaArrowRight />
              </button>
            </div>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black bg-opacity-70 px-4 py-2 rounded-lg text-white text-center">
              <h3 className="font-bold">{currentImage.title}</h3>
              <p className="text-sm">{currentImage.category} - {currentImage.date}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

ImageViewer.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      title: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired
    })
  ).isRequired
};

export default ImageViewer;