import React, { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored user on app load
    const storedUser = localStorage.getItem('financeApp_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    // Simulate API call
    const mockUser = {
      id: uuidv4(),
      email,
      name: email.split('@')[0],
      role: email.includes('admin') ? 'admin' : 'professional',
      avatar: `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face`,
      company: 'Financial Solutions Inc.',
      title: 'Senior Financial Advisor',
      phone: '+1 (555) 123-4567',
      location: 'New York, NY',
      bio: 'Experienced financial advisor with over 10 years of experience helping clients achieve their financial goals.',
      specialties: ['Investment Planning', 'Retirement Planning', 'Tax Strategy'],
      certifications: ['CFP', 'CPA', 'ChFC'],
      createdAt: new Date().toISOString()
    };

    setUser(mockUser);
    localStorage.setItem('financeApp_user', JSON.stringify(mockUser));
    return mockUser;
  };

  const register = async (userData) => {
    // Simulate API call
    const newUser = {
      id: uuidv4(),
      ...userData,
      role: 'professional',
      avatar: `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face`,
      createdAt: new Date().toISOString()
    };

    setUser(newUser);
    localStorage.setItem('financeApp_user', JSON.stringify(newUser));
    return newUser;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('financeApp_user');
  };

  const updateProfile = (updates) => {
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    localStorage.setItem('financeApp_user', JSON.stringify(updatedUser));
  };

  const value = {
    user,
    login,
    register,
    logout,
    updateProfile,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};