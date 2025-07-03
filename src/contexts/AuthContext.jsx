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
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check for stored user on app load
    const storedUser = localStorage.getItem('financeApp_user');
    const userId = localStorage.getItem('userId');
    const userToken = localStorage.getItem('userToken');
    
    if (storedUser && userId && userToken) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  // Quest Login Handler - receives data from QuestLogin component
  const handleQuestLogin = async ({ userId, token, newUser, email }) => {
    try {
      // Store Quest credentials
      localStorage.setItem('userId', userId);
      localStorage.setItem('userToken', token);
      
      // Create or update user profile
      const userData = {
        id: userId,
        email: email || `user-${userId}@example.com`,
        name: email ? email.split('@')[0] : `User ${userId.slice(-4)}`,
        role: email && email.includes('admin') ? 'admin' : 'professional',
        avatar: `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face`,
        company: 'Financial Solutions Inc.',
        title: 'Senior Financial Advisor',
        phone: '+1 (555) 123-4567',
        location: 'New York, NY',
        bio: 'Experienced financial advisor with over 10 years of experience helping clients achieve their financial goals.',
        specialties: ['Investment Planning', 'Retirement Planning', 'Tax Strategy'],
        certifications: ['CFP', 'CPA', 'ChFC'],
        createdAt: new Date().toISOString(),
        isNewUser: newUser
      };

      setUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem('financeApp_user', JSON.stringify(userData));

      return { user: userData, newUser };
    } catch (error) {
      console.error('Quest login error:', error);
      throw error;
    }
  };

  // Traditional login (fallback)
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
      createdAt: new Date().toISOString(),
      isNewUser: false
    };

    setUser(mockUser);
    setIsAuthenticated(true);
    localStorage.setItem('financeApp_user', JSON.stringify(mockUser));
    localStorage.setItem('userId', mockUser.id);
    
    return mockUser;
  };

  const register = async (userData) => {
    // Simulate API call
    const newUser = {
      id: uuidv4(),
      ...userData,
      role: 'professional',
      avatar: `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face`,
      createdAt: new Date().toISOString(),
      isNewUser: true
    };

    setUser(newUser);
    setIsAuthenticated(true);
    localStorage.setItem('financeApp_user', JSON.stringify(newUser));
    localStorage.setItem('userId', newUser.id);
    
    return newUser;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('financeApp_user');
    localStorage.removeItem('userId');
    localStorage.removeItem('userToken');
  };

  const updateProfile = (updates) => {
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    localStorage.setItem('financeApp_user', JSON.stringify(updatedUser));
  };

  const value = {
    user,
    isAuthenticated,
    login,
    register,
    logout,
    updateProfile,
    loading,
    handleQuestLogin
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};