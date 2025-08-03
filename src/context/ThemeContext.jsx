import React, { createContext, useState, useEffect, useContext } from "react";

// Create theme context
export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // States
  const [theme, setTheme] = useState("dark");
  const [transitionDirection, setTransitionDirection] = useState("slide-right");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Initialize theme from localStorage on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dark";
    const savedDirection = localStorage.getItem("transitionDirection") || "slide-right";
    
    setTheme(savedTheme);
    setTransitionDirection(savedDirection);
    
    // Apply theme class to body
    document.body.className = savedTheme;
  }, []);

  // Theme toggle handler
  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.body.classList.remove("dark", "light");
    document.body.classList.add(newTheme);
  };

  // Transition direction handler
  const changeTransitionDirection = (direction) => {
    setTransitionDirection(direction);
    localStorage.setItem("transitionDirection", direction);
  };

  // Toggle sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Context value
  const contextValue = {
    theme,
    toggleTheme,
    transitionDirection,
    changeTransitionDirection,
    isSidebarOpen,
    toggleSidebar,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook for using theme context
export const useTheme = () => useContext(ThemeContext);