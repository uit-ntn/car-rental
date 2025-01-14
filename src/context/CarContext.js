import React, { createContext, useState, useEffect } from 'react';
import api from '../configs/api';
// Tạo context
export const CarContext = createContext();

// Cung cấp CarProvider
export const CarProvider = ({ children }) => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all cars
  const fetchCars = async () => {
    setLoading(true);
    try {
      const response = await api.get('/api/cars');
      setCars(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Lỗi khi lấy dữ liệu xe');
    } finally {
      setLoading(false);
    }
  };

  // Create a new car
  const createCar = async (carData) => {
    try {
      const response = await api.post('/api/cars', carData);
      setCars((prevCars) => [...prevCars, response.data.car]);
      return response.data;
    } catch (err) {
      throw err.response?.data?.message || 'Error creating car';
    }
  };

  // Get car by ID
  const getCarById = async (id) => {
    try {
      const response = await api.get(`/api/cars/${id}`);
      return response.data;
    } catch (err) {
      throw err.response?.data?.message || 'Error fetching car by ID';
    }
  };

  // Update car by ID
  const updateCar = async (id, updatedData) => {
    try {
      const response = await api.put(`/api/cars/${id}`, updatedData);
      setCars((prevCars) =>
        prevCars.map((car) => (car._id === id ? response.data.car : car))
      );
      return response.data;
    } catch (err) {
      throw err.response?.data?.message || 'Error updating car';
    }
  };

  // Delete car by ID
  const deleteCar = async (id) => {
    try {
      await api.delete(`/api/cars/${id}`);
      setCars((prevCars) => prevCars.filter((car) => car._id !== id));
    } catch (err) {
      throw err.response?.data?.message || 'Error deleting car';
    }
  };

  // Get cars by status
  const getCarsByStatus = async (status) => {
    try {
      const response = await api.get(`/api/cars/status/${status}`);
      return response.data;
    } catch (err) {
      throw err.response?.data?.message || 'Error fetching cars by status';
    }
  };

  // Get cars by location
  const getCarsByLocation = async (location) => {
    try {
      const response = await api.get(`/api/cars/location/${location}`);
      return response.data;
    } catch (err) {
      throw err.response?.data?.message || 'Error fetching cars by location';
    }
  };

  // Add a document to a car
  const addDocumentToCar = async (id, documentData) => {
    try {
      const response = await api.post(`/api/cars/${id}/documents`, documentData);
      setCars((prevCars) =>
        prevCars.map((car) => (car._id === id ? response.data.car : car))
      );
      return response.data;
    } catch (err) {
      throw err.response?.data?.message || 'Error adding document to car';
    }
  };

  // Update car's insurance info
  const updateInsuranceInfo = async (id, insuranceInfo) => {
    try {
      const response = await api.put(`/api/cars/${id}/insurance`, insuranceInfo);
      setCars((prevCars) =>
        prevCars.map((car) => (car._id === id ? response.data.car : car))
      );
      return response.data;
    } catch (err) {
      throw err.response?.data?.message || 'Error updating insurance info';
    }
  };

  // Get cars by owner ID
  const getCarsByOwner = async (ownerId) => {
    try {
      const response = await api.get(`/api/cars/owner/${ownerId}`);
      return response.data;
    } catch (err) {
      throw err.response?.data?.message || 'Error fetching cars by owner';
    }
  };

  // UseEffect để fetch dữ liệu ban đầu
  useEffect(() => {
    fetchCars();
  }, []);

  return (
    <CarContext.Provider
      value={{
        cars,
        loading,
        error,
        fetchCars,
        createCar,
        getCarById,
        updateCar,
        deleteCar,
        getCarsByStatus,
        getCarsByLocation,
        addDocumentToCar,
        updateInsuranceInfo,
        getCarsByOwner,
      }}
    >
      {children}
    </CarContext.Provider>
  );
};
