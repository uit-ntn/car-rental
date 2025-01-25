// AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import { signup, login, forgotPassword, resetPassword } from '../services/authService';
import api from '../configs/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [user_id, setUser_id] = useState(localStorage.getItem('user_id') || null);
  const [token, setToken] = useState(localStorage.getItem('authToken') || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      api.defaults.headers['Authorization'] = `Bearer ${token}`;
      api.get(`/api/users/${user_id}`)
        .then(response => {
          setUserData(response.data);
          console.log('User Data:', response.data);  // Log to check the response
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

  const loginHandler = async (email, password) => {
    try {
      const response = await login(email, password);
      setToken(response.token);
      setUser_id(response.user_id);
      localStorage.setItem('authToken', response.token);
      localStorage.setItem('user_id', response._id);
      return response;
    } catch (err) {
      throw err;
    }
  };

  const signupHandler = async (email, password) => {
    try {
      const response = await signup(email, password);
      console.log('Signup Response:', response);  // Log to check the response
      setToken(response.token);
      setUser_id(response.user_id);
      localStorage.setItem('authToken', response.token);
      localStorage.setItem('user_id', response._id);
      return response;
    } catch (err) {
      console.error('Signup Error:', err);  // Log to check the error
      throw err;
    }
  };
  

  return (
    <AuthContext.Provider value={{ user_id, userData, token, loading, loginHandler, signupHandler, forgotPassword, resetPassword, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
