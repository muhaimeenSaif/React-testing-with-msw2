import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router';
interface Notification {
  id: string;
  message: string;
  time: string;
  read: boolean;
  type: 'info' | 'warning' | 'success' | 'error';
}

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
  const [notificationPanelOpen, setNotificationPanelOpen] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

   // Sample notifications data
   const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      message: 'Welcome to the application! Your account has been successfully created.',
      time: '2 minutes ago',
      read: false,
      type: 'success'
    },
    {
      id: '2',
      message: 'System maintenance scheduled for tonight at 2:00 AM.',
      time: '1 hour ago',
      read: false,
      type: 'warning'
    },
    {
      id: '3',
      message: 'Your profile has been updated successfully.',
      time: '3 hours ago',
      read: true,
      type: 'info'
    },
    {
      id: '4',
      message: 'New feature: Drag and drop functionality is now available!',
      time: '1 day ago',
      read: true,
      type: 'info'
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;
  const toggleLeftSidebar = () => {
    setLeftSidebarOpen(!leftSidebarOpen);
  };

  const toggleRightSidebar = () => {
    setRightSidebarOpen(!rightSidebarOpen);
  };

  const toggleNotificationPanel = () => {
    setNotificationPanelOpen(!notificationPanelOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success': return '✅';
      case 'warning': return '⚠️';
      case 'error': return '❌';
      default: return 'ℹ️';
    }
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
          <button className="notification-toggle" onClick={toggleNotificationPanel}>
            🔔
            {unreadCount > 0 && (
              <span className="notification-badge">{unreadCount}</span>
            )}
          </button>
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

       {/* Notification Panel */}
       <aside className={`notification-panel ${notificationPanelOpen ? 'open' : ''}`}>
        <div className="notification-header">
          <h3 className="notification-title">Notifications</h3>
        </div>
        <ul className="notification-list">
          {notifications.length === 0 ? (
            <div className="empty-notifications">
              <div className="empty-notifications-icon">🔔</div>
              <p>No notifications yet</p>
            </div>
          ) : (
            notifications.map((notification) => (
              <li 
                key={notification.id}
                className={`notification-item ${!notification.read ? 'unread' : ''}`}
                onClick={() => markAsRead(notification.id)}
              >
                <div className="notification-content">
                  <span className="notification-icon">
                    {getNotificationIcon(notification.type)}
                  </span>
                  <div className="notification-text">
                    <div className="notification-message">
                      {notification.message}
                    </div>
                    <div className="notification-time">
                      {notification.time}
                    </div>
                  </div>
                </div>
              </li>
            ))
          )}
        </ul>
      </aside>

      {/* Overlay for mobile */}
      {(leftSidebarOpen || rightSidebarOpen || notificationPanelOpen) && (
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