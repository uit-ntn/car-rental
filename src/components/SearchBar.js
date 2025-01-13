import React, { useState } from "react";
import CarList from "../components/CarList";
import "../styles/SearchBar.css";

export default function SearchBar() {
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [searchResults, setSearchResults] = useState();
  const [isFormValid, setIsFormValid] = useState(false);
  const [location, setLocation] = useState("");

  const apiUrl = process.env.API_URL


  const handlePickupDateChange = (event) => {
    const newPickupDate = event.target.value;
    setPickupDate(newPickupDate);
    validateDateRange(newPickupDate, returnDate);
  };

  const handleReturnDateChange = (event) => {
    const newReturnDate = event.target.value;
    setReturnDate(newReturnDate);
    validateDateRange(pickupDate, newReturnDate);
  };

  const handleLocationChange = (event) => {
    const newLocation = event.target.value;
    setLocation(newLocation);
  };

  const validateDateRange = (start, end) => {
    setIsFormValid(
      start &&
      end &&
      new Date(end) > new Date(start) &&
      new Date(start) >= new Date()
    );
  };

  const handleSearch = () => {
    if (isFormValid) {
      let queryParams = `?start_date=${pickupDate}&end_date=${returnDate}&location=${location}`;

      fetch(apiUrl + queryParams)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setSearchResults(data.data);
        })
        .catch((error) => console.error("Lỗi khi lấy dữ liệu:", error));
    } else {
      alert("Vui lòng nhập đủ thông tin và chọn ngày hợp lệ");
    }
  };

  return (
    <form className="container mt-5">
      <div className="card p-4">
        <div className="search-options">
          <h2 className="text-center fs-3 fw-bold">TÌM KIẾM XE</h2>
          <div className="search-input">
            <div className="form-group mt-3">
              <label htmlFor="location">Địa điểm nhận xe</label>
              <input
                type="text"
                id="location"
                className="form-control"
                placeholder="Nhập địa điểm"
                value={location}
                onChange={handleLocationChange}
              />
            </div>
            <div className="form-group mt-3">
              <label htmlFor="pickupDate">Thời gian nhận xe</label>
              <input
                type="date"
                id="pickupDate"
                className="form-control"
                value={pickupDate}
                onChange={handlePickupDateChange}
              />
            </div>
            <div className="form-group mt-3">
              <label htmlFor="returnDate">Thời gian trả xe</label>
              <input
                type="date"
                id="returnDate"
                className="form-control"
                value={returnDate}
                onChange={handleReturnDateChange}
              />
            </div>
            <div className="text-center mt-4">
              <button className="btn btn-success" onClick={handleSearch} disabled={!isFormValid}>
                Tìm xe
              </button>

            </div>
          </div>
        </div>
      </div>
      {searchResults && (
        <div className="result-search mt-5">
          <h3>Kết quả tìm kiếm</h3>
          <CarList cars={searchResults} />
        </div>
      )}
    </form>
  );
}
