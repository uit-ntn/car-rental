import api from '../configs/api';

// Fetch all cars
export const fetchCars = async () => {
  try {
    const response = await api.get('/api/cars');
    return response.data;
  } catch (err) {
    throw err.response?.data?.message || 'Lỗi khi lấy dữ liệu xe';
  }
};

// Create a new car
export const createCar = async (carData) => {
  try {
    const response = await api.post('/api/cars', carData);
    return response.data;
  } catch (err) {
    throw err.response?.data?.message || 'Error creating car';
  }
};

// Get car by ID
export const getCarById = async (id) => {
  try {
    const response = await api.get(`/api/cars/${id}`);
    return response.data;
  } catch (err) {
    throw err.response?.data?.message || 'Error fetching car by ID';
  }
};

// Update car by ID
export const updateCar = async (id, updatedData) => {
  try {
    const response = await api.put(`/api/cars/${id}`, updatedData);
    return response.data;
  } catch (err) {
    throw err.response?.data?.message || 'Error updating car';
  }
};

// Delete car by ID
export const deleteCar = async (id) => {
  try {
    await api.delete(`/api/cars/${id}`);
  } catch (err) {
    throw err.response?.data?.message || 'Error deleting car';
  }
};

// Get cars by status
export const getCarsByStatus = async (status) => {
  try {
    const response = await api.get(`/api/cars/status/${status}`);
    return response.data;
  } catch (err) {
    throw err.response?.data?.message || 'Error fetching cars by status';
  }
};

// Get cars by location
export const getCarsByLocation = async (location) => {
  try {
    const response = await api.get(`/api/cars/location/${location}`);
    return response.data;
  } catch (err) {
    throw err.response?.data?.message || 'Error fetching cars by location';
  }
};

// Add a document to a car
export const addDocumentToCar = async (id, documentData) => {
  try {
    const response = await api.post(`/api/cars/${id}/documents`, documentData);
    return response.data;
  } catch (err) {
    throw err.response?.data?.message || 'Error adding document to car';
  }
};

// Update car's insurance info
export const updateInsuranceInfo = async (id, insuranceInfo) => {
  try {
    const response = await api.put(`/api/cars/${id}/insurance`, insuranceInfo);
    return response.data;
  } catch (err) {
    throw err.response?.data?.message || 'Error updating insurance info';
  }
};

// Get cars by owner ID
export const getCarsByOwner = async (ownerId) => {
  try {
    const response = await api.get(`/api/cars/owner/${ownerId}`);
    return response.data;
  } catch (err) {
    throw err.response?.data?.message || 'Error fetching cars by owner';
  }
};
