// AuthContext.js

import React, { createContext, useState, useEffect } from 'react';
import api from '../configs/api';

// Create context
export const AuthContext = createContext();

// AuthProvider
export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [user_id, setUser_id] = useState(localStorage.getItem('user_id') || null);
  const [token, setToken] = useState(localStorage.getItem('authToken') || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      api.defaults.headers['Authorization'] = `Bearer ${token}`;
      api.get(`/users/${user_id}`)
        .then(response => {
          setUserData(response.data);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
          setUserData(null);
        });
    } else {
      setLoading(false);
    }
  }, [token, user_id]);

  // Sign up
  const signup = async (email, password) => {
    try {
      const response = await api.post('/auth/signup', { email, password });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  };

  // Login
  const login = async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      const { token, user } = response.data;
      setToken(token);
      setUser_id(user.id);  // Assuming the user data includes an ID
      localStorage.setItem('authToken', token);  // Save token to local storage
      localStorage.setItem('user_id', user.id);  // Save user ID
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  };

  // Forgot password
  const forgotPassword = async (email) => {
    try {
      const response = await api.post('/auth/forgot-password', { email });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  };

  // Reset password
  const resetPassword = async (token, newPassword) => {
    try {
      const response = await api.post('/auth/reset-password', { token, newPassword });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  };

  // Logout
  const logout = () => {
    setToken(null);
    setUserData(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('user_id');
  };

  return (
    <AuthContext.Provider value={{ user_id, userData, token, loading, signup, login, forgotPassword, resetPassword, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
