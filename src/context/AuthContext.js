import React, { createContext, useState, useEffect } from 'react';
import api from '../configs/api';

// create context
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
      api.get('/users/${user._id}')
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
  }, [token]);

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
      const { token } = response.data;
      setToken(token);
      localStorage.setItem('authToken', token);  // save token to local storage
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
  };

  return (
    <AuthContext.Provider value={{ user_id, userData, token, loading, signup, login, forgotPassword, resetPassword, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
