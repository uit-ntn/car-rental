import React, { createContext, useState, useEffect } from 'react';
import * as carService from '../services/carService';

// Create context
export const CarContext = createContext();

export const CarProvider = ({ children }) => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all cars
  const fetchCars = async () => {
    setLoading(true);
    try {
      const data = await carService.fetchCars();
      setCars(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // Create a new car
  const createCar = async (carData) => {
    try {
      const data = await carService.createCar(carData);
      setCars((prevCars) => [...prevCars, data.car]);
    } catch (err) {
      setError(err);
    }
  };

  // Update car by ID
  const updateCar = async (id, updatedData) => {
    try {
      const data = await carService.updateCar(id, updatedData);
      setCars((prevCars) =>
        prevCars.map((car) => (car._id === id ? data.car : car))
      );
    } catch (err) {
      setError(err);
    }
  };

  // Delete car by ID
  const deleteCar = async (id) => {
    try {
      await carService.deleteCar(id);
      setCars((prevCars) => prevCars.filter((car) => car._id !== id));
    } catch (err) {
      setError(err);
    }
  };

  // Get cars by status
  const getCarsByStatus = async (status) => {
    try {
      const data = await carService.getCarsByStatus(status);
      return data;
    } catch (err) {
      setError(err);
    }
  };

  // Get cars by location
  const getCarsByLocation = async (location) => {
    try {
      const data = await carService.getCarsByLocation(location);
      return data;
    } catch (err) {
      setError(err); // Cập nhật lỗi nếu có
    }
  };

  // UseEffect để fetch dữ liệu ban đầu
  useEffect(() => {
    fetchCars(); // Gọi hàm fetchCars khi component mount
  }, []);

  return (
    <CarContext.Provider
      value={{
        cars, // Trạng thái danh sách xe
        loading, // Trạng thái tải dữ liệu
        error, // Trạng thái lỗi
        fetchCars, // Hàm gọi để lấy tất cả xe
        createCar, // Hàm gọi để tạo xe mới
        updateCar, // Hàm gọi để cập nhật xe
        deleteCar, // Hàm gọi để xóa xe
        getCarsByStatus, // Hàm gọi để lấy xe theo trạng thái
        getCarsByLocation, // Hàm gọi để lấy xe theo địa điểm
      }}
    >
      {children}
    </CarContext.Provider>
  );
};
