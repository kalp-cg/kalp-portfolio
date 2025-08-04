import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPaperPlane, FaCheck, FaExclamationTriangle } from 'react-icons/fa';
import { useTheme } from '../../context/ThemeContext';

const ContactForm = () => {
  const { theme } = useTheme();
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState(null); // null, 'success', 'error'

  const validateForm = () => {
    const newErrors = {};
    
    // Name validation
    if (!formState.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formState.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formState.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    // Subject validation
    if (!formState.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    
    // Message validation
    if (!formState.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formState.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    
    // Clear submit status when user makes changes
    if (submitStatus) {
      setSubmitStatus(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setSubmitStatus('loading');
      setTimeout(() => {
        setSubmitStatus('success');
        setFormState({ name: '', email: '', subject: '', message: '' });
      }, 1000);
    } else {
      setSubmitStatus('error');
    }
  };

  const inputClasses = (fieldName) => `w-full px-4 py-3 border rounded-lg outline-none transition-all
    ${errors[fieldName] ? 'border-red-500' : ''}
    ${theme === 'dark' 
      ? 'bg-gray-800 border-gray-700 text-white focus:border-primary' 
      : 'bg-white border-gray-300 text-gray-800 focus:border-primary'}`;

  const formVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  return (
    <motion.form 
      onSubmit={handleSubmit} 
      className="space-y-6"
      variants={formVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div variants={itemVariants}>
          <input
            type="text"
            name="name"
            value={formState.name}
            onChange={handleChange}
            placeholder="YOUR NAME"
            className={inputClasses('name')}
            aria-label="Your name"
            autoComplete="name"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-500">{errors.name}</p>
          )}
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <input
            type="email"
            name="email"
            value={formState.email}
            onChange={handleChange}
            placeholder="YOUR EMAIL"
            className={inputClasses('email')}
            aria-label="Your email"
            autoComplete="email"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email}</p>
          )}
        </motion.div>
      </div>
      
      <motion.div variants={itemVariants}>
        <input
          type="text"
          name="subject"
          value={formState.subject}
          onChange={handleChange}
          placeholder="YOUR SUBJECT"
          className={inputClasses('subject')}
          aria-label="Subject"
          autoComplete="off"
        />
        {errors.subject && (
          <p className="mt-1 text-sm text-red-500">{errors.subject}</p>
        )}
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <textarea
          name="message"
          value={formState.message}
          onChange={handleChange}
          placeholder="YOUR MESSAGE"
          rows={5}
          className={inputClasses('message')}
          aria-label="Your message"
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-500">{errors.message}</p>
        )}
      </motion.div>
      
      {submitStatus === 'success' && (
        <motion.div 
          variants={itemVariants}
          className="p-3 rounded-lg bg-green-100 text-green-700 flex items-center gap-2"
        >
          <FaCheck />
          <span>Thank you for your message! We will get back to you soon.</span>
        </motion.div>
      )}
      
      {submitStatus === 'error' && (
        <motion.div 
          variants={itemVariants}
          className="p-3 rounded-lg bg-red-100 text-red-700 flex items-center gap-2"
        >
          <FaExclamationTriangle />
          <span>Please fix the errors in the form.</span>
        </motion.div>
      )}

      {submitStatus === 'loading' && (
        <motion.div 
          variants={itemVariants}
          className="p-3 rounded-lg bg-blue-100 text-blue-700 flex items-center gap-2"
        >
          <span>Sending...</span>
        </motion.div>
      )}
      
      <motion.button
        variants={itemVariants}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        type="submit"
        className="btn-primary"
      >
        SEND MESSAGE <FaPaperPlane className="ml-2" />
      </motion.button>
    </motion.form>
  );
};

export default ContactForm;