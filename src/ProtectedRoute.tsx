import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, setLastVisitedPath } = useAuth();
  const location = useLocation();

  useEffect(() => {
    if (isAuthenticated) {
      setLastVisitedPath(location.pathname);
    }
  }, [location.pathname, isAuthenticated, setLastVisitedPath]);

  return isAuthenticated ? <>{children}</> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
