import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';

// Layout Components
import Sidebar from './Sidebar';
import Header from './Header';
import PageLoader from './components/shared/PageLoader';

// Page Components
import HomePage from './HomePage';
import AboutPage from './AboutPage';
import ResumePage from './ResumePage';
import ProjectsPage from './ProjectsPage';
import ClicksPage from './ClicksPage';
import ContactPage from './ContactPage';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
};

function App() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Close mobile nav when route changes
  const handleNavigation = () => {
    if (isMobileNavOpen) setIsMobileNavOpen(false);
  };


  
  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Handle page visibility for accessibility
  useEffect(() => {
    const handleVisibilityChange = () => {
      document.title = document.hidden ? 'Come Back to Portfolio' : 'Kalp Patel | Portfolio';
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);
  
  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileNavOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMobileNavOpen]);

  if (isLoading) {
    return (
      <ThemeProvider>
        <PageLoader />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="flex flex-col md:flex-row min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
    
          <Sidebar 
            isMobileNavOpen={isMobileNavOpen} 
            setIsMobileNavOpen={setIsMobileNavOpen}
            handleNavigation={handleNavigation}
          />
   
          <div className="flex-1 flex flex-col w-full md:ml-20 lg:ml-72 transition-all duration-300 relative">

            <Header 
              isMobileNavOpen={isMobileNavOpen}
              setIsMobileNavOpen={setIsMobileNavOpen}
            />
            
            <main className="flex-1">
              <AnimatePresence mode="wait">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/resume" element={<ResumePage />} />
                  <Route path="/projects" element={<ProjectsPage />} />
                  <Route path="/clicks" element={<ClicksPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="*" element={<Navigate to="/" />} />
                </Routes>
              </AnimatePresence>
            </main>
            
            <footer className="text-center py-4 text-sm text-gray-500 dark:text-gray-400 mt-auto">
              © {new Date().getFullYear()} Portfolio. All rights reserved.
            </footer>
          </div>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;