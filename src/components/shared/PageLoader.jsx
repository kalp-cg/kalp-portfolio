import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

const PageLoader = ({ message = 'Loading' }) => {
  const { theme } = useTheme();
  
  return (
    <div className={`fixed inset-0 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'} flex items-center justify-center z-50`}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: 1,
          transition: {
            duration: 0.3,
          }
        }}
        className="flex flex-col items-center"
      >
        <motion.div 
          className="w-24 h-24 relative mb-6"
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ 
            duration: 2,
            ease: "linear",
            repeat: Infinity
          }}
        >
          <motion.div 
            className="absolute inset-0 rounded-full border-t-4 border-primary"
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, ease: "linear", repeat: Infinity }}
          />
          <motion.div 
            className="absolute inset-2 rounded-full border-r-4 border-primary/70"
            initial={{ rotate: 0 }}
            animate={{ rotate: -360 }}
            transition={{ duration: 2, ease: "linear", repeat: Infinity }}
          />
          <motion.div 
            className="absolute inset-4 rounded-full border-b-4 border-primary/50"
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 2.5, ease: "linear", repeat: Infinity }}
          />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <h2 className={`${theme === 'dark' ? 'text-white' : 'text-gray-800'} text-xl font-semibold text-center`}>
            {message}
            <motion.span
              initial={{ opacity: 0 }}
              animate={[
                { opacity: 1, transition: { delay: 0.3 } },
                { opacity: 0, transition: { delay: 0.3 } }
              ]}
              transition={{ repeat: Infinity, duration: 1 }}
            >
              .
            </motion.span>
            <motion.span
              initial={{ opacity: 0 }}
              animate={[
                { opacity: 1, transition: { delay: 0.6 } },
                { opacity: 0, transition: { delay: 0.6 } }
              ]}
              transition={{ repeat: Infinity, duration: 1 }}
            >
              .
            </motion.span>
            <motion.span
              initial={{ opacity: 0 }}
              animate={[
                { opacity: 1, transition: { delay: 0.9 } },
                { opacity: 0, transition: { delay: 0.9 } }
              ]}
              transition={{ repeat: Infinity, duration: 1 }}
            >
              .
            </motion.span>
          </h2>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PageLoader;