import React, { useContext, useState } from "react";
import { CarContext } from "../context/CarContext";
import CarCard from "./CarCard";

const CarList = () => {
  const { cars, loading, error } = useContext(CarContext);
  const [currentPage, setCurrentPage] = useState(1);
  const carsPerPage = 8;

  const [filters, setFilters] = useState({
    status: "",
    priceRange: { min: 0, max: Infinity },
    location: "",
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;

    if (name === "priceRange") {
      const [min, max] = value.split("-").map((v) => (v === "Infinity" ? Infinity : parseInt(v, 10)));
      setFilters((prev) => ({
        ...prev,
        priceRange: { min, max },
      }));
    } else {
      setFilters((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    setCurrentPage(1); // Reset to the first page
  };

  const uniqueLocations = [...new Set(cars.map((car) => car.location))];

  const filteredCars = cars.filter((car) => {
    const matchesStatus = !filters.status || car.status === filters.status;
    const matchesPrice =
      car.price >= filters.priceRange.min &&
      car.price <= filters.priceRange.max;
    const matchesLocation =
      !filters.location || car.location === filters.location;

    return matchesStatus && matchesPrice && matchesLocation;
  });

  const totalPages = Math.ceil(filteredCars.length / carsPerPage);

  const currentCars = filteredCars.slice(
    (currentPage - 1) * carsPerPage,
    currentPage * carsPerPage
  );

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  if (loading) return <p>Loading cars...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mt-5">
      <h2 className="text-center my-4 fw-bold">DANH SÁCH XE</h2>

      {/* Filters */}
      <div className="row mb-4">
        <div className="col-md-4">
          <select
            name="status"
            className="form-select"
            value={filters.status}
            onChange={handleFilterChange}
          >
            <option value="">Tất cả trạng thái</option>
            <option value="available">Chưa có chuyến</option>
            <option value="rented">Đã có chuyến</option>
            <option value="maintenance">Đang bảo dưỡng</option>
          </select>
        </div>
        <div className="col-md-4">
          <select
            name="priceRange"
            className="form-select"
            onChange={handleFilterChange}
          >
            <option value="0-Infinity">Tất cả khoảng giá</option>
            <option value="0-500000">Dưới 500K</option>
            <option value="500000-1000000">500K - 1M</option>
            <option value="1000000-Infinity">Trên 1M</option>
          </select>
        </div>
        <div className="col-md-4">
          <select
            name="location"
            className="form-select"
            value={filters.location}
            onChange={handleFilterChange}
          >
            <option value="">Tất cả vị trí</option>
            {uniqueLocations.map((location, index) => (
              <option key={index} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Danh sách xe */}
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3">
        {currentCars.map((car) => (
          <CarCard key={car._id} car={car} />
        ))}
      </div>

      {/* Phân trang */}
      <div className="d-flex justify-content-center align-items-center mt-4">
        <button
          className="btn btn-outline-primary me-2"
          disabled={currentPage === 1}
          onClick={() => goToPage(1)}
        >
          Trang đầu
        </button>
        <button
          className="btn btn-outline-primary me-2"
          disabled={currentPage === 1}
          onClick={() => goToPage(currentPage - 1)}
        >
          Trang trước
        </button>
        <span className="mx-2">
          Trang {currentPage} / {totalPages}
        </span>
        <button
          className="btn btn-outline-primary ms-2"
          disabled={currentPage === totalPages}
          onClick={() => goToPage(currentPage + 1)}
        >
          Trang kế
        </button>
        <button
          className="btn btn-outline-primary ms-2"
          disabled={currentPage === totalPages}
          onClick={() => goToPage(totalPages)}
        >
          Trang cuối
        </button>
      </div>

      {/* Input đi đến trang */}
      <div className="d-flex justify-content-center align-items-center mt-3">
        <input
          type="number"
          className="form-control w-auto me-2"
          min="1"
          max={totalPages}
          placeholder="Trang"
          style={{ width: "80px", height: "30px", fontSize: "14px" }}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              goToPage(Number(e.target.value));
            }
          }}
        />
        <button
          className="btn btn-outline-success"
          style={{ height: "30px", fontSize: "14px", padding: "0 10px" }}
          onClick={(e) => goToPage(Number(e.target.previousSibling.value))}
        >
          Đi tới
        </button>
      </div>
    </div>
  );
};

export default CarList;
