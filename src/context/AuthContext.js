import React, { createContext, useState, useEffect } from 'react';
import api from '../apis/api';

// Tạo context
export const AuthContext = createContext();

// Cung cấp AuthProvider
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('authToken') || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      api.defaults.headers['Authorization'] = `Bearer ${token}`;
      // Gửi yêu cầu lấy thông tin người dùng
      api.get('/user/me')  // Thay thế bằng endpoint lấy thông tin user
        .then(response => {
          setUser(response.data);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
          setUser(null);
        });
    } else {
      setLoading(false);
    }
  }, [token]);

  // Đăng ký người dùng
  const signup = async (email, password) => {
    try {
      const response = await api.post('/auth/signup', { email, password });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  };

  // Đăng nhập
  const login = async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      const { token } = response.data;
      setToken(token);
      localStorage.setItem('authToken', token);  // Lưu token vào localStorage
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  };

  // Quên mật khẩu
  const forgotPassword = async (email) => {
    try {
      const response = await api.post('/auth/forgot-password', { email });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  };

  // Đặt lại mật khẩu
  const resetPassword = async (token, newPassword) => {
    try {
      const response = await api.post('/auth/reset-password', { token, newPassword });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  };

  // Đăng xuất
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('authToken');
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, signup, login, forgotPassword, resetPassword, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
