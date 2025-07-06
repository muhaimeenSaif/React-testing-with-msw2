import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  lastVisitedPath: string;
  login: (token: string) => void;
  logout: () => void;
  setLastVisitedPath: (path: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [lastVisitedPath, setLastVisitedPath] = useState<string>('/home');

  useEffect(() => {
    // Check for existing token on app load
    const savedToken = localStorage.getItem('authToken');
    const savedPath = localStorage.getItem('lastVisitedPath');
    
    if (savedToken) {
      setToken(savedToken);
      setIsAuthenticated(true);
    }
    
    if (savedPath) {
      setLastVisitedPath(savedPath);
    }
  }, []);

  const login = (newToken: string) => {
    localStorage.setItem('authToken', newToken);
    setToken(newToken);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('lastVisitedPath');
    setToken(null);
    setIsAuthenticated(false);
    setLastVisitedPath('/home');
  };

  const updateLastVisitedPath = (path: string) => {
    setLastVisitedPath(path);
    localStorage.setItem('lastVisitedPath', path);
  };

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      token, 
      lastVisitedPath, 
      login, 
      logout, 
      setLastVisitedPath: updateLastVisitedPath 
    }}>
      {children}
    </AuthContext.Provider>
  );
};