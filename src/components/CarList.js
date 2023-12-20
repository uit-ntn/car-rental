import React, { useState } from "react";
import ProductCard from "./ProductCard";
import "../styles/CarList.css";

const CarList = ({ cars }) => {
  const [filterPrice, setFilterPrice] = useState(null);
  const [filterStar, setFilterStar] = useState(null);

  const handleFilterPrice = (price) => {
    setFilterPrice(price);
  };

  const handleFilterStar = (star) => {
    setFilterStar(star);
  };

  const filteredCars = cars.filter((car) => {
    if (filterPrice !== null) {
      if (filterPrice === 2000 && car.price <= 2000) {
        return false;
      } else if (car.price > filterPrice) {
        return false;
      }
    }

    if (filterStar !== null && car.star < filterStar) {
      return false;
    }

    return true;
  });

  return (
    <div>
      <div className="filter-container">

        <label>
          Lọc theo giá:
          <select onChange={(e) => handleFilterPrice(parseInt(e.target.value))}>
            <option value="">Tất cả</option>
            <option value="500">500k và thấp hơn</option>
            <option value="1000">1000k và thấp hơn</option>
            <option value="1500">1500k và thấp hơn</option>
            <option value="2000">Trên 2000k</option>
            {/* Thêm các mức giá khác nếu cần */}
          </select>
        </label>

        <label>
          Lọc theo đánh giá:
          <select onChange={(e) => handleFilterStar(parseInt(e.target.value))}>
            <option value="">Tất cả</option>
            <option value="3">3 sao và thấp hơn</option>
            <option value="4">4 sao và thấp hơn</option>
            <option value="5">5 sao</option>
          </select>
        </label>

      </div>
      
      {filteredCars.length === 0 ? (
        <p className="filter-no-found">Không có xe phù hợp.</p>
      ) : (
        <ul className="Car-list-container">
          {filteredCars.map((car, index) => (
            <li key={index}>
              <ProductCard
                id={car.id}
                image={car.image}
                name={car.name}
                address={car.address}
                star={car.star}
                price={car.price}
                trip={car.trip}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CarList;
