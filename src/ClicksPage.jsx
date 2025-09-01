import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from './context/ThemeContext';
import { FaCamera, FaHeart, FaShare, FaEye, FaCalendar, FaMapMarkerAlt, FaChevronLeft, FaChevronRight, FaTimes } from 'react-icons/fa';

const ClicksPage = () => {
  const { theme } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageStats, setImageStats] = useState({});
  const [likedImages, setLikedImages] = useState(new Set());
  
  const categories = ['All', 'Landscape', 'Forest', 'Seascape', 'Flora', 'Winter', 'Desert'];
  
  const naturePosts = [
    {
      id: 1,
      title: 'Sunset at Mountain Valley',
      date: '23 March, 2022',
      location: 'Mountain Valley',
      category: 'Landscape',
      image: 'https://res.cloudinary.com/demtjxg7q/image/upload/v1753503476/IMG_20250610_114007_o8nk9s.jpg',
      description: 'Beautiful sunset captured at the mountain valley during my hiking trip. The golden hour light created a magical atmosphere.'
    },
    {
      id: 2,
      title: 'Misty Forest Morning',
      date: '10 February, 2022',
      location: 'Dense Forest',
      category: 'Forest',
      image: 'https://res.cloudinary.com/demtjxg7q/image/upload/v1753462419/IMG_20240629_195857_fnchpo.jpg',
      description: 'Early morning fog in the dense forest creates a mystical atmosphere. The sunlight filtering through the trees was breathtaking.'
    },
    {
      id: 3,
      title: 'Coastal Waves at Dusk',
      date: '15 January, 2022',
      location: 'Rocky Coastline',
      category: 'Seascape',
      image: 'https://res.cloudinary.com/demtjxg7q/image/upload/v1753462691/IMG_20240705_135916_1_gtjehr.jpg',
      description: 'The powerful waves crashing against the rocky coastline during dusk. The colors of the sky reflected in the water were stunning.'
    },
    {
      id: 4,
      title: 'Spring Wildflowers',
      date: '5 December, 2021',
      location: 'Wildflower Field',
      category: 'Flora',
      image: 'https://res.cloudinary.com/demtjxg7q/image/upload/v1753517641/IMG_20250630_215300_zkxchm.jpg',
      description: 'A field of colorful wildflowers blooming in early spring. The variety of colors and textures created a beautiful natural tapestry.'
    },
    {
      id: 5,
      title: 'Frozen Lake Reflection',
      date: '20 November, 2021',
      location: 'Frozen Lake',
      category: 'Winter',
      image: 'https://res.cloudinary.com/demtjxg7q/image/upload/v1753517991/IMG_20250726_134721_qojwev.jpg',
      description: 'A perfectly still frozen lake reflecting the surrounding mountains. The winter scene was peaceful and serene.'
    },
    {
      id: 6,
      title: 'Desert Sunset Dunes',
      date: '8 October, 2021',
      location: 'Golden Desert',
      category: 'Desert',
      image: 'https://res.cloudinary.com/demtjxg7q/image/upload/v1753518177/IMG_20250609_100248-EDIT_bv3suj.jpg',
      description: 'The golden sand dunes of the desert during sunset. The shadows and light created fascinating patterns across the landscape.'
    },
     {
      id: 7,
      title: 'Desert Sunset Dunes',
      date: '8 October, 2021',
      location: 'Golden Desert',
      category: 'Desert',
      image: 'https://res.cloudinary.com/demtjxg7q/image/upload/v1753520504/nature.jpg_1_fttbex.jpg',
      description: 'The golden sand dunes of the desert during sunset. The shadows and light created fascinating patterns across the landscape.'
    }
  ];

  const filteredPosts = selectedCategory === 'All' 
    ? naturePosts 
    : naturePosts.filter(post => post.category === selectedCategory);

  // Initialize stats from localStorage or default to 0
  useEffect(() => {
    const savedStats = localStorage.getItem('imageStats');
    if (savedStats) {
      setImageStats(JSON.parse(savedStats));
    } else {
      // Initialize with 0 stats for all images
      const initialStats = {};
      naturePosts.forEach(post => {
        initialStats[post.id] = { likes: 0, views: 0 };
      });
      setImageStats(initialStats);
      localStorage.setItem('imageStats', JSON.stringify(initialStats));
    }

    // Load liked images from localStorage
    const savedLikes = localStorage.getItem('likedImages');
    if (savedLikes) {
      setLikedImages(new Set(JSON.parse(savedLikes)));
    }
  }, []);

  // Track view when image is clicked
  const handleImageClick = (post, index) => {
    setSelectedImage(post);
    setCurrentImageIndex(index);
    
    // Increment view count
    const newStats = { ...imageStats };
    if (!newStats[post.id]) {
      newStats[post.id] = { likes: 0, views: 0 };
    }
    newStats[post.id].views += 1;
    setImageStats(newStats);
    localStorage.setItem('imageStats', JSON.stringify(newStats));
  };

  // Handle like button click
  const handleLikeClick = (e, postId) => {
    e.stopPropagation(); // Prevent modal from opening
    
    const newLikedImages = new Set(likedImages);
    const newStats = { ...imageStats };
    
    if (!newStats[postId]) {
      newStats[postId] = { likes: 0, views: 0 };
    }
    
    if (newLikedImages.has(postId)) {
      // Unlike
      newLikedImages.delete(postId);
      newStats[postId].likes -= 1;
    } else {
      // Like
      newLikedImages.add(postId);
      newStats[postId].likes += 1;
    }
    
    setLikedImages(newLikedImages);
    setImageStats(newStats);
    localStorage.setItem('imageStats', JSON.stringify(newStats));
    localStorage.setItem('likedImages', JSON.stringify([...newLikedImages]));
  };

  // Handle share button click
  const handleShareClick = (e, post) => {
    e.stopPropagation(); // Prevent modal from opening
    
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.description,
        url: window.location.href
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(`${post.title} - ${window.location.href}`);
      alert('Link copied to clipboard!');
    }
  };

  // Navigation functions for lightbox
  const goToPrevious = () => {
    const newIndex = currentImageIndex === 0 ? filteredPosts.length - 1 : currentImageIndex - 1;
    setCurrentImageIndex(newIndex);
    setSelectedImage(filteredPosts[newIndex]);
  };

  const goToNext = () => {
    const newIndex = currentImageIndex === filteredPosts.length - 1 ? 0 : currentImageIndex + 1;
    setCurrentImageIndex(newIndex);
    setSelectedImage(filteredPosts[newIndex]);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedImage) return;
      
      switch(e.key) {
        case 'ArrowLeft':
          goToPrevious();
          break;
        case 'ArrowRight':
          goToNext();
          break;
        case 'Escape':
          setSelectedImage(null);
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, currentImageIndex]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.6,
        when: "beforeChildren",
        staggerChildren: 0.1
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

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.5 }
    },
    hover: {
      y: -8,
      scale: 1.03,
      transition: { duration: 0.3 }
    }
  };

  return (
    <div className="w-full min-h-screen py-16 px-6 md:px-12">
      <div className="max-w-screen-xl mx-auto">
        {/* Hero Section */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center mb-16"
        >
          <motion.div variants={itemVariants} className="flex items-center justify-center gap-4 mb-8">
            <FaCamera className="text-5xl text-primary" />
            <h1 className="text-5xl md:text-7xl font-bold text-white dark:text-white light:text-gray-800">
              MY <span className="text-primary">CLICKS</span>
            </h1>
          </motion.div>
          <motion.div variants={itemVariants} className="flex items-center justify-center gap-4 mb-6">
            <span className="w-20 h-1 bg-primary"></span>
            <span className="text-xl text-gray-300 dark:text-gray-300 light:text-gray-600">
              CAPTURING MOMENTS IN NATURE
            </span>
            <span className="w-20 h-1 bg-primary"></span>
          </motion.div>
          <motion.p 
            variants={itemVariants}
            className="max-w-3xl mx-auto text-lg text-gray-300 dark:text-gray-300 light:text-gray-600"
          >
            A collection of my favorite nature photographs, each telling a unique story of beauty, tranquility, and the wonders of the natural world.
          </motion.p>
        </motion.div>

        {/* Category Filter */}
        <motion.div variants={itemVariants} className="mb-12">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category)}
                               className={`px-8 py-4 rounded-full font-medium transition-all duration-300 ${
                 selectedCategory === category
                   ? 'bg-primary text-white shadow-lg'
                   : 'bg-gray-800 dark:bg-gray-800 light:bg-gray-100 text-gray-300 dark:text-gray-300 light:text-gray-700 hover:bg-gray-700 dark:hover:bg-gray-700 light:hover:bg-gray-200'
               }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Image Grid */}
        <motion.div 
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="wait">
            {filteredPosts.map((post, index) => (
              <motion.div
                key={post.id}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                whileHover="hover"
                               className="group relative overflow-hidden rounded-2xl shadow-xl cursor-pointer bg-gray-800 dark:bg-gray-800 light:bg-white"
                onClick={() => handleImageClick(post, index)}
              >
                {/* Image */}
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 text-xs font-medium text-white bg-primary/80 rounded-full backdrop-blur-sm">
                      {post.category}
                    </span>
                  </div>

                  {/* Interactive Stats Overlay */}
                  <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex items-center justify-between text-white text-sm">
                      <div className="flex items-center gap-4">
                        <motion.button
                          onClick={(e) => handleLikeClick(e, post.id)}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="flex items-center gap-1 hover:text-red-400 transition-colors"
                        >
                          <FaHeart className={`${likedImages.has(post.id) ? 'text-red-400' : 'text-white/80'}`} />
                          <span>{imageStats[post.id]?.likes || 0}</span>
                        </motion.button>
                        <div className="flex items-center gap-1">
                          <FaEye />
                          <span>{imageStats[post.id]?.views || 0}</span>
                        </div>
                      </div>
                      <motion.button
                        onClick={(e) => handleShareClick(e, post)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="text-white/80 hover:text-white transition-colors"
                      >
                        <FaShare />
                      </motion.button>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                                   <h3 className="text-xl font-bold text-white dark:text-white light:text-gray-800">
                   {post.title}
                 </h3>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Enhanced Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
                             className="relative max-w-6xl w-full max-h-[90vh] rounded-2xl overflow-hidden bg-gray-800 dark:bg-gray-800 light:bg-white"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Navigation Arrows */}
              <motion.button
                onClick={goToPrevious}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
              >
                <FaChevronLeft />
              </motion.button>
              
              <motion.button
                onClick={goToNext}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
              >
                <FaChevronRight />
              </motion.button>

              {/* Close Button */}
              <motion.button
                onClick={() => setSelectedImage(null)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="absolute top-4 right-4 z-10 w-12 h-12 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
              >
                <FaTimes />
              </motion.button>

              {/* Image */}
              <div className="relative">
                <img
                  src={selectedImage.image}
                  alt={selectedImage.title}
                  className="w-full h-auto max-h-[70vh] object-cover"
                />
                
                {/* Image Counter */}
                <div className="absolute top-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                  {currentImageIndex + 1} / {filteredPosts.length}
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                                 <h2 className="text-3xl font-bold mb-4 text-white dark:text-white light:text-gray-800">
                   {selectedImage.title}
                 </h2>
                 <p className="mb-6 text-lg text-gray-300 dark:text-gray-300 light:text-gray-600">
                   {selectedImage.description}
                 </p>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2 text-gray-500">
                      <FaCalendar />
                      <span>{selectedImage.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500">
                      <FaMapMarkerAlt />
                      <span>{selectedImage.location}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <motion.button
                      onClick={(e) => handleLikeClick(e, selectedImage.id)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="flex items-center gap-2 hover:text-red-400 transition-colors"
                    >
                      <FaHeart className={`text-xl ${likedImages.has(selectedImage.id) ? 'text-red-400' : 'text-gray-500'}`} />
                      <span className="text-lg">{imageStats[selectedImage.id]?.likes || 0}</span>
                    </motion.button>
                    <div className="flex items-center gap-2 text-gray-500">
                      <FaEye className="text-xl" />
                      <span className="text-lg">{imageStats[selectedImage.id]?.views || 0}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ClicksPage;