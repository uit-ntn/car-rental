import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

// Tạo Context
const CarContext = createContext();

// Provider component
export const CarProvider = ({ children }) => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/cars');
        setCars(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  return (
    <CarContext.Provider value={{ cars, loading, error }}>
      {children}
    </CarContext.Provider>
  );
};

// Hook để sử dụng context
export const useCars = () => useContext(CarContext);
