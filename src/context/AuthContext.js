import React, { createContext, useState, useEffect } from 'react';
import { signup, login, forgotPassword, resetPassword } from '../services/authService';
import api from '../configs/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [user_id, setUser_id] = useState(localStorage.getItem('user_id') || null);
  const [token, setToken] = useState(localStorage.getItem('authToken') || null);
  const [loading, setLoading] = useState(true); // Luôn bắt đầu với loading = true

  useEffect(() => {
    const fetchUserData = async () => {
      if (!token || !user_id) {
        setLoading(false);
        return;
      }

      try {
        api.defaults.headers['Authorization'] = `Bearer ${token}`;
        const response = await api.get(`/api/users/${user_id}`);
        setUserData(response.data);
        console.log('User Data:', response.data);  // Log để kiểm tra phản hồi từ server
      } catch (error) {
        console.error("Lỗi tải dữ liệu user:", error);
        setUserData(null);
      } finally {
        setLoading(false); // Chỉ tắt loading sau khi API hoàn tất (thành công hoặc thất bại)
      }
    };

    fetchUserData();
  }, [token, user_id]);

  const logout = () => {
    setToken(null);
    setUserData(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('user_id');
  };

  const loginHandler = async (email, password) => {
    setLoading(true); // Bật loading khi đăng nhập
    try {
      const response = await login(email, password);
      setToken(response.token);
      setUser_id(response._id);
      localStorage.setItem('authToken', response.token);
      localStorage.setItem('user_id', response._id);
      return response;
    } catch (err) {
      throw err;
    } finally {
      setLoading(false); // Đảm bảo tắt loading sau khi API hoàn tất
    }
  };

  const signupHandler = async (email, password) => {
    setLoading(true); // Bật loading khi đăng ký
    try {
      const response = await signup(email, password);
      console.log('Signup Response:', response);  // Log để kiểm tra phản hồi
      setToken(response.token);
      setUser_id(response.user_id);
      localStorage.setItem('authToken', response.token);
      localStorage.setItem('user_id', response._id);
      return response;
    } catch (err) {
      console.error('Signup Error:', err);  // Log lỗi để kiểm tra
      throw err;
    } finally {
      setLoading(false); // Đảm bảo tắt loading sau khi API hoàn tất
    }
  };

  return (
    <AuthContext.Provider value={{
      user_id,
      userData,
      token,
      loading,
      loginHandler,
      signupHandler,
      forgotPassword,
      resetPassword,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};
