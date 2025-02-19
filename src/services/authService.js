import api from '../configs/api';

// singup
const signup = async (email, password) => {
  try {
    const response = await api.post('/api/auth/signup', { email, password });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Login
const login = async (email, password) => {
  try {
    const response = await api.post('/api/auth/login', { email, password });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Forgot password
const forgotPassword = async (email) => {
  try {
    const response = await api.post('/api/auth/forgot-password', { email });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Reset password
const resetPassword = async (token, newPassword) => {
  try {
    const response = await api.post('/api/auth/reset-password', { token, newPassword });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};


export { signup, login, forgotPassword, resetPassword };