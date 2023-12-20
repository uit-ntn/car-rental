import React, {useState} from "react";
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
            id={car.LICENSE_PLATE}
            image={car.LEFT_IMG}
            name={car.NAME}
            address={car.LOCATION}
            star={car.STAR}
            price={car.SERVICE_C}
            trip={car.TRIP}
            available={car.IS_AVAILABLE}
          />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CarList;

// {
//   "LICENSE_PLATE": "37K-12350",
//   "OWNER_ID": "U0048",
//   "NAME": "VINFAST VF8 ECO 2022",
//   "LOCATION": "Hồ Chí Minh",
//   "LAST_CHECK": "2023-09-03",
//   "BRAND": "VINFAST",
//   "SEAT": 5,
//   "TRANSMISSION": "Số tự động",
//   "FUEL": "Điện",
//   "CONSUMPTION": 400,
//   "PRICE_C": 1250000,
//   "SERVICE_C": 148000,
//   "INSURANCE_C": 148000,
//   "DESCRIPTION": "VINFAST VF8 ECO 2023\nXe không đổ xăng ko mùi hôi, phí sạc tính theo odo 1200đ/km tiết kiệm 1/3 so với xe xăng",
//   "MAP": "Y",
//   "BLUETOOTH": "Y",
//   "CAMERA_360": "N",
//   "CAMERA_SIDES": "Y",
//   "CAMERA_JOURNEY": "N",
//   "CAMERA_BACK": "Y",
//   "TIRE_SENSOR": "Y",
//   "IMPACT_SENSOR": "Y",
//   "SPEED_WARNING": "Y",
//   "SKY_WINDOW": "Y",
//   "GPS": "Y",
//   "CHILD_SEAT": "Y",
//   "USB": "Y",
//   "SPARE_TIRE": "N",
//   "DVD": "N",
//   "ETC": "Y",
//   "AIRBAG": "N",
//   "PICKUP_COVER": "Y",
//   "FRONT_IMG": "VinFast-F",
//   "BACK_IMG": "VinFast-B",
//   "LEFT_IMG": "VinFast-L",
//   "RIGHT_IMG": "VinFast-R",
//   "IS_AVAILABLE": true,
//   "user": {
//       "USER_ID": "U0048",
//       "password": "$2y$12$vlqPDYRJyXVNcT7ouoiLDeMvEIVqNnQ8uqLwvPV0sOIxkSq.4WAhu",
//       "FIRST_NAME": "Robert",
//       "LAST_NAME": "Toni",
//       "DOB": "1993-12-18",
//       "GENDER": "M",
//       "SDT": "33311224677",
//       "EMAIL": "ToniMan93@example.com",
//       "GPLX": "GPLX048",
//       "LOCATION": "Hồ Chí Minh"
//   }
// }
