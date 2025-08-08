import React from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaEnvelope, FaPhone } from 'react-icons/fa';
import { useTheme } from './context/ThemeContext';
import ContactForm from './components/shared/ContactForm';

const ContactPage = () => {
  const { theme } = useTheme();
  
  const contactInfo = [
    {
      icon: <FaMapMarkerAlt className="text-primary text-2xl" />,
      title: 'ADDRESS POINT',
      details: 'ahmedabad',
    },
    {
      icon: <FaEnvelope className="text-primary text-2xl" />,
      title: 'MAIL ME',
      details: 'kalppatel1209@gmail.com',
    },
    {
      icon: <FaPhone className="text-primary text-2xl" />,
      title: 'CALL ME',
      details: '+91 99788*****',
    }
  ];

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
      <motion.div variants={itemVariants} className="mb-12">
        <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
          GET IN <span className="text-primary">TOUCH</span>
        </h1>
        <div className="flex items-center gap-2">
          <span className="w-12 h-1 bg-primary"></span>
          <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            CONTACT
          </span>
        </div>
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {contactInfo.map((info, index) => (
          <motion.div 
            key={index}
            variants={itemVariants}
            className={`flex flex-col items-center text-center p-6 rounded-lg ${
              theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'
            } hover:bg-primary group transition-colors duration-300`}
          >
            <div className="group-hover:text-white transition-colors duration-300">
              {info.icon}
            </div>
            <h3 className={`mt-4 mb-2 font-bold text-lg group-hover:text-white transition-colors duration-300 ${
              theme === 'dark' ? 'text-white' : 'text-gray-800'
            }`}>
              {info.title}
            </h3>
            <p className={`group-hover:text-white transition-colors duration-300 ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}>
              {info.details}
            </p>
          </motion.div>
        ))}
      </div>
      
      <motion.div variants={itemVariants}>
        <h2 className={`text-2xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
          Contact Form
        </h2>
        <ContactForm />
      </motion.div>
      
      <motion.div variants={itemVariants} className="mt-12 h-80 w-full rounded-lg overflow-hidden">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387193.3059353029!2d-74.25986548248684!3d40.69714941932609!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2stn!4v1612517535212!5m2!1sen!2stn" 
          className="w-full h-full border-0"
          title="Google Maps"
          loading="lazy"
        ></iframe>
      </motion.div>
    </motion.div>
  );
};

export default ContactPage;