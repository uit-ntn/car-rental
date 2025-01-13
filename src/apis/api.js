import axios from 'axios';

// Instance axios with default config
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor for request: add token to request header
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor for response: handle error and token expired
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // Token expired or unauthorized
          console.error('Unauthorized, redirecting to login...');
          localStorage.removeItem('authToken');
          break;
        case 500:
          console.error('Internal server error');
          break;
        default:
          console.error('An error occurred');
      }
    }
    return Promise.reject(error);
  }
);

export default api;
