import axios from 'axios';

// Instance axios with default config
const api = axios.create({
  baseURL: '',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// config interceptor for request and response

// Interceptor cho request
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

// Interceptor cho response
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {

    // handle error
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // Handling expired tokens
          console.error('Unauthorized, redirecting to login...');
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
