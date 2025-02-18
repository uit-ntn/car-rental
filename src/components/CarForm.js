// components/CarForm.js

import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CarContext } from '../contexts/CarContext';

const CarForm = () => {
  const { createCar, getCarById, updateCar } = useContext(CarContext);
  const [car, setCar] = useState({ name: '', type: '', status: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getCarById(id).then((carData) => setCar(carData));
    }
  }, [id, getCarById]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCar((prevCar) => ({
      ...prevCar,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await updateCar(id, car);
      } else {
        await createCar(car);
      }
      navigate('/cars');
    } catch (err) {
      setError(err);
    }
  };

  return (
    <div className="container mt-4">
      <h2>{id ? 'Sửa Xe' : 'Thêm Xe'}</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Tên Xe</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={car.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Loại Xe</label>
          <input
            type="text"
            className="form-control"
            name="type"
            value={car.type}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Trạng thái</label>
          <select
            className="form-select"
            name="status"
            value={car.status}
            onChange={handleChange}
            required
          >
            <option value="available">Có sẵn</option>
            <option value="rented">Đã cho thuê</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          {id ? 'Cập nhật Xe' : 'Thêm Xe'}
        </button>
      </form>
    </div>
  );
};

export default CarForm;
