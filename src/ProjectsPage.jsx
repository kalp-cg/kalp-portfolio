// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import { useTheme } from './context/ThemeContext';
// import ProjectItem from './components/shared/ProjectItem';

// const ProjectsPage = () => {
//   const { theme } = useTheme();
//   const [activeFilter, setActiveFilter] = useState('all');
  
//   const categories = [
//     { id: 'all', name: 'ALL' },
//     { id: 'web', name: 'WEB APPS' },
//     { id: 'mobile', name: 'MOBILE APPS' },
//     { id: 'ui', name: 'UI/UX DESIGN' },
//     { id: 'other', name: 'OTHER' }
//   ];
  
//   const projectItems = [
//     {
//       id: 1,
//       title: 'E-Commerce Platform',
//       category: 'web',
//       image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&h=300&fit=crop',
//       link: 'https://shimmering-scone-089ed6.netlify.app/',
//       description: 'Full-stack e-commerce platform with React, Node.js, and MongoDB'
//     },
//     {
//       id: 2,
//       title: 'Task Management App',
//       category: 'web',
//       image: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=500&h=300&fit=crop',
//       link: 'https://regal-truffle-9575c2.netlify.app/',
//       description: 'React-based task management application with drag-and-drop functionality'
//     },
//     {
//       id: 3,
//       title: 'Weather Dashboard',
//       category: 'web',
//       image: 'https://images.unsplash.com/photo-1592210454359-9043f067919b?w=500&h=300&fit=crop',
//       link: 'https://odoo-hackathone-round2.vercel.app/',
//       description: 'Real-time weather application with location-based forecasts'
//     },
//     {
//       id: 4,
//       title: 'Portfolio Website',
//       category: 'web',
//       image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=500&h=300&fit=crop',
//       link: 'https://simple-timer-7v03knwx2-kalp-cgs-projects.vercel.app/',
//       description: 'Personal portfolio website built with React and Tailwind CSS'
//     },
//     {
//       id: 5,
//       title: 'Fitness Tracker',
//       category: 'mobile',
//       image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=300&fit=crop',
//       link: 'https://tranquil-kheer-38144e.netlify.app/',
//       description: 'React Native mobile app for tracking workouts and nutrition'
//     },
//     {
//       id: 6,
//       title: 'UI Design System',
//       category: 'ui',
//       image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&h=300&fit=crop',
//       link: 'https://heartfelt-bombolone-ca6190.netlify.app/',
//       description: 'Comprehensive UI design system with reusable components'
//     },
//     {
//       id: 7,
//       title: 'UI Design System',
//       category: 'ui',
//       image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&h=300&fit=crop',
//       link: 'https://chess-html-css-javascript.netlify.app/',
//       description: 'Comprehensive UI design system with reusable components'
//     },
//     {
//       id: 8,
//       title: 'UI Design System',
//       category: 'ui',
//       image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&h=300&fit=crop',
//       link: 'https://heartfelt-bombolone-ca6190.netlify.app/',
//       description: 'Comprehensive UI design system with reusable components'
//     },
//     {
//       id: 9,
//       title: 'UI Design System',
//       category: 'ui',
//       image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&h=300&fit=crop',
//       link: 'https://heartfelt-bombolone-ca6190.netlify.app/',
//       description: 'Comprehensive UI design system with reusable components'
//     },
//     {
//       id: 10,
//       title: 'UI Design System',
//       category: 'ui',
//       image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&h=300&fit=crop',
//       link: 'https://heartfelt-bombolone-ca6190.netlify.app/',
//       description: 'Comprehensive UI design system with reusable components'
//     }
//   ];
  
//   const filteredItems = activeFilter === 'all' 
//     ? projectItems 
//     : projectItems.filter(item => item.category === activeFilter);

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: { 
//       opacity: 1,
//       transition: { 
//         duration: 0.6,
//         when: "beforeChildren",
//         staggerChildren: 0.2
//       }
//     }
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { 
//       opacity: 1, 
//       y: 0,
//       transition: { duration: 0.6 }
//     }
//   };

//   return (
//     <motion.div
//       variants={containerVariants}
//       initial="hidden"
//       animate="visible"
//       className="w-full h-full overflow-y-auto py-16 px-6 md:px-12"
//     >
//       <motion.div variants={itemVariants} className="mb-12">
//         <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
//           MY <span className="text-primary">PROJECTS</span>
//         </h1>
//         <div className="flex items-center gap-2">
//           <span className="w-12 h-1 bg-primary"></span>
//           <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
//             WORKS
//           </span>
//         </div>
//       </motion.div>
      
//       <motion.div 
//         variants={itemVariants}
//         className="flex flex-wrap items-center justify-center gap-4 mb-8"
//       >
//         {categories.map((category) => (
//           <button
//             key={category.id}
//             onClick={() => setActiveFilter(category.id)}
//             className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
//               ${activeFilter === category.id 
//                 ? 'bg-primary text-white' 
//                 : theme === 'dark' 
//                   ? 'bg-gray-800 text-white hover:bg-primary/20' 
//                   : 'bg-gray-200 text-gray-700 hover:bg-primary/20'}`}
//           >
//             {category.name}
//           </button>
//         ))}
//       </motion.div>
      
//       <motion.div 
//         variants={itemVariants}
//         className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
//       >
//         {filteredItems.map((item) => (
//           <ProjectItem key={item.id} item={item} />
//         ))}
//       </motion.div>
//     </motion.div>
//   );
// };

// export default ProjectsPage;


import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from './context/ThemeContext';
import ProjectItem from './components/shared/ProjectItem';
import ProjectModal from './components/shared/ProjectModal';

const ProjectsPage = () => {
  const { theme } = useTheme();
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);

  const categories = [
    { id: 'all', name: 'ALL' },
    { id: 'web', name: 'WEB APPS' },
    { id: 'mobile', name: 'MOBILE APPS' },
    { id: 'ui', name: 'UI/UX DESIGN' },
    { id: 'other', name: 'OTHER' }
  ];

  const projectItems = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      category: 'web',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&h=300&fit=crop',
      link: 'https://shimmering-scone-089ed6.netlify.app/',
      description: 'Full-stack e-commerce platform with React, Node.js, and MongoDB',
      techStack: ['React', 'Node.js', 'MongoDB'],
      github: 'https://github.com/your-repo/ecommerce',
      backendDocs: 'https://your-backend-docs.com',
      dbDiagram: 'https://dbdiagram.io/embed/your-diagram'
    },
    {
      id: 2,
      title: 'Task Management App',
      category: 'web',
      image: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=500&h=300&fit=crop',
      link: 'https://regal-truffle-9575c2.netlify.app/',
      description: 'React-based task management application with drag-and-drop functionality',
      techStack: ['React', 'Redux', 'Firebase'],
      github: 'https://github.com/your-repo/task-manager'
    },
    // ...add techStack, github, backendDocs, dbDiagram for other projects as needed...
  ];

  const filteredItems = activeFilter === 'all'
    ? projectItems
    : projectItems.filter(item => item.category === activeFilter);

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
    <>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full h-full overflow-y-auto py-16 px-6 md:px-12"
      >
        <motion.div variants={itemVariants} className="mb-12">
          <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
            MY <span className="text-primary">PROJECTS</span>
          </h1>
          <div className="flex items-center gap-2">
            <span className="w-12 h-1 bg-primary"></span>
            <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              WORKS
            </span>
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="flex flex-wrap items-center justify-center gap-4 mb-8"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveFilter(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
                ${activeFilter === category.id
                  ? 'bg-primary text-white'
                  : theme === 'dark'
                    ? 'bg-gray-800 text-white hover:bg-primary/20'
                    : 'bg-gray-200 text-gray-700 hover:bg-primary/20'}`}
            >
              {category.name}
            </button>
          ))}
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredItems.map((item) => (
            <ProjectItem key={item.id} item={item} onClick={() => setSelectedProject(item)} />
          ))}
        </motion.div>
      </motion.div>
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </>
  );
};

export default ProjectsPage;