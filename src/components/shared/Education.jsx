import React from 'react';
import { motion } from 'framer-motion';
import { FaGraduationCap } from 'react-icons/fa';
import { useTheme } from '../../context/ThemeContext';

const Education = ({ isResumePage = false }) => {
  const { theme } = useTheme();
  
  const educations = [
    {
      id: 1,
      period: '2023 - Present',
      degree: "Bachelor's Degree in Computer Science",
      institution: 'Your University Name',
      description: 'Currently pursuing Computer Science degree. Learning programming fundamentals, data structures, algorithms, and software development practices.'
    },
    {
      id: 2,
      period: '2021 - 2023',
      degree: 'High School Diploma',
      institution: 'Your High School Name',
      description: 'Completed high school education with focus on mathematics and science subjects.'
    }
  ];

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  // Resume page style timeline item
  const TimelineItem = ({ item }) => (
    <motion.div 
      variants={itemVariants}
      className="relative pl-8 pb-8 border-l border-gray-300 dark:border-gray-700 last:border-0 last:pb-0"
    >
      <div className={`absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-primary flex items-center justify-center`}>
        <FaGraduationCap size={10} className="text-white" />
      </div>
      <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-md rounded-lg p-6`}>
        <div className="flex justify-between items-start mb-2">
          <h3 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
            {item.degree}
          </h3>
          <span className="px-3 py-1 text-xs font-medium text-white rounded-full bg-primary">
            {item.period}
          </span>
        </div>
        <h4 className="text-primary text-lg mb-3">{item.institution}</h4>
        <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
          {item.description}
        </p>
      </div>
    </motion.div>
  );

  // About page style timeline item
  const CompactTimelineItem = ({ edu }) => (
    <motion.div 
      variants={itemVariants}
      className={`relative pl-10 pb-6 border-l-2 ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'} last:border-0`}
    >
      <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-primary flex items-center justify-center">
        <FaGraduationCap className="text-xs text-white" />
      </div>
      
      <span className="inline-block px-4 py-1 mb-3 text-xs rounded-full bg-primary/10 text-primary font-medium">
        {edu.period}
      </span>
      
      <h4 className={`text-lg font-bold mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
        {edu.degree} - <span className="text-primary">{edu.institution}</span>
      </h4>
      
      <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
        {edu.description}
      </p>
    </motion.div>
  );

  // For Resume page
  if (isResumePage) {
    return (
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { 
            opacity: 1,
            transition: { 
              duration: 0.6,
              when: "beforeChildren",
              staggerChildren: 0.2
            }
          }
        }}
      >
        <motion.h2 
          variants={itemVariants} 
          className={`text-2xl font-bold mb-8 flex items-center gap-3 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}
        >
          <FaGraduationCap className="text-primary" />
          Education
        </motion.h2>
        
        <div className="space-y-6">
          {educations.map(item => (
            <TimelineItem key={item.id} item={item} />
          ))}
        </div>
      </motion.div>
    );
  }

  // For About page
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: { 
          opacity: 1,
          transition: { 
            duration: 0.6,
            when: "beforeChildren",
            staggerChildren: 0.1
          }
        }
      }}
    >
      <h3 className={`text-xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
        Education
      </h3>
      
      <div className="space-y-6">
        {educations.map((edu) => (
          <CompactTimelineItem key={edu.id} edu={edu} />
        ))}
      </div>
    </motion.div>
  );
};

export default Education;