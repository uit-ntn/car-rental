import React, { createContext, useState, useEffect } from 'react';
import { signup, login, forgotPassword, resetPassword } from '../services/authService';
import api from '../configs/api';

// Tạo context
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
