import React, { useContext, useEffect } from 'react';
import { CarContext } from '../context/CarContext';

const CarManagement = () => {
  const { cars, fetchCars, deleteCar } = useContext(CarContext);

  useEffect(() => {
    fetchCars();
  }, [fetchCars]);

  return (
    <div>
      <h3>Quản lý Xe</h3>
      <button className="btn btn-primary mb-3">Thêm Xe</button>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Biển số</th>
            <th>Hãng</th>
            <th>Model</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cars.map((car, index) => (
            <tr key={car._id}>
              <td>{index + 1}</td>
              <td>{car.licensePlate}</td>
              <td>{car.brand}</td>
              <td>{car.model}</td>
              <td>
                <button className="btn btn-warning btn-sm">Sửa</button>
                <button
                  className="btn btn-danger btn-sm ms-2"
                  onClick={() => deleteCar(car._id)}
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CarManagement;
