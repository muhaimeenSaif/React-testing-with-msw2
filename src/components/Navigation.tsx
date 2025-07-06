import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router';

interface NavigationProps {
  darkMode?: boolean;
  onDarkModeToggle?: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ 
  darkMode = false, 
  onDarkModeToggle,
}) => {
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(false);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const toggleLeftSidebar = () => {
    setLeftSidebarOpen(!leftSidebarOpen);
  };

  const toggleRightSidebar = () => {
    setRightSidebarOpen(!rightSidebarOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      {/* Fixed Top Navigation Bar */}
      <header className="top-nav">
        <div className="nav-left">
          <button className="sidebar-toggle" onClick={toggleLeftSidebar}>
            ☰
          </button>
          <h1 className="app-title">My Application</h1>
        </div>
        <nav className="nav-center">
          <a href="/home" className="nav-link">Home</a>
          <a href="/search" className="nav-link">User Search</a>
          <a href="#about" className="nav-link">About</a>
          <a href="/contact" className="nav-link">Contact Me</a>
        </nav>
        <div className="nav-right">
          <button className="settings-toggle" onClick={toggleRightSidebar}>
            ⚙️
          </button>
        </div>
      </header>

      {/* Left Navigation Sidebar */}
      <aside className={`left-sidebar ${leftSidebarOpen ? 'open' : ''}`}>
        <nav className="left-nav">
          <h3>Navigation</h3>
          <ul className="nav-menu">
            <li><a href="#dashboard" className="nav-item">Dashboard</a></li>
            <li><a href="#profile" className="nav-item">Profile</a></li>
            <li><a href="#projects" className="nav-item">Projects</a></li>
            <li><a href="#tasks" className="nav-item">Tasks</a></li>
            <li><a href="#calendar" className="nav-item">Calendar</a></li>
            <li><a href="#reports" className="nav-item">Reports</a></li>
            <li><a href="#analytics" className="nav-item">Analytics</a></li>
            <li><a href="#settings" className="nav-item">Settings</a></li>
          </ul>
        </nav>
      </aside>

      {/* Right Settings Sidebar */}
      <aside className={`right-sidebar ${rightSidebarOpen ? 'open' : ''}`}>
        <div className="settings-panel">
          <h3>System Settings</h3>
          <div className="setting-item">
            <label className="setting-label">
              <span>Theme Mode</span>
              <div className="theme-toggle">
                <button 
                  className={`theme-btn ${!darkMode ? 'active' : ''}`}
                  onClick={() => onDarkModeToggle && onDarkModeToggle()}
                >
                  ☀️ Light
                </button>
                <button 
                  className={`theme-btn ${darkMode ? 'active' : ''}`}
                  onClick={() => onDarkModeToggle && onDarkModeToggle()}
                >
                  🌙 Dark
                </button>
              </div>
            </label>
          </div>
          <div className="setting-item">
            <label className="setting-label">
              <span>Notifications</span>
              <input type="checkbox" className="setting-checkbox" defaultChecked />
            </label>
          </div>
          <div className="setting-item">
            <label className="setting-label">
              <span>Auto Save</span>
              <input type="checkbox" className="setting-checkbox" defaultChecked />
            </label>
          </div>
          {/* New Logout Button */}
          <div className="setting-item">
            <button 
              className="logout-btn" 
              onClick={handleLogout}
            >
              🚪 Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {(leftSidebarOpen || rightSidebarOpen) && (
        <div 
          className="overlay" 
          onClick={() => {
            setLeftSidebarOpen(false);
            setRightSidebarOpen(false);
          }}
        />
      )}
    </>
  );
};

export default Navigation;