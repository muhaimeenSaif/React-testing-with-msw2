import React, { useState, useEffect } from 'react';
import Navigation from './Navigation';
import '../App.css';
import { Outlet } from 'react-router';

interface LayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC = () => {
  // Initialize dark mode from localStorage or default to false
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('darkMode');
    return savedTheme ? JSON.parse(savedTheme) : false;
  });

  // Save theme preference to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`app-container ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      <Navigation darkMode={darkMode} onDarkModeToggle={toggleDarkMode} />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;