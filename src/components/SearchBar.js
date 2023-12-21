import React, { useState } from "react";
import CarList from "../components/CarList";
import "../styles/SearchBar.css";

export default function SearchBar() {
  const [isSelfDrivingSelected, setIsSelfDrivingSelected] = useState(true);
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [searchResults, setSearchResults] = useState();
  const [selectedButton, setSelectedButton] = useState("self-driving");
  const [isFormValid, setIsFormValid] = useState(false);
  const [location, setLocation] = useState("");

  const apiUrl = "http://127.0.0.1:8000/api/cars";

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

  const handleToggle = (isSelfDriving) => {
    setIsSelfDrivingSelected(isSelfDriving);
    setSelectedButton(isSelfDriving ? "self-driving" : "with-driver");
    setPickupDate("");
    setReturnDate("");
    setIsFormValid(false);
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
    <div>
      <div className="search-options">
        <div className="search-options-toggle">
          <button
            onClick={() => handleToggle(true)}
            className={selectedButton === "self-driving" ? "selected" : ""}
          >
            Tìm kiếm xe mong muốn
          </button>
        </div>

        {(isSelfDrivingSelected || !isSelfDrivingSelected) && (
          <div
            className={`search-input ${
              isSelfDrivingSelected ? "self-driving" : "car-with-driver"
            }`}
          >
            <div className="location-input">
              <p>Địa điểm nhận xe</p>
              <input
                type="text"
                name="location"
                placeholder="Nhập địa điểm"
                value={location}
                onChange={handleLocationChange}
              />
            </div>

            <div className="rental-period-input-box">
              <h3>THỜI GIAN THUÊ</h3>
              <div className="rental-period-input">
                <div>
                  <p>Thời gian nhận xe</p>
                  <input
                    type="date"
                    name="pickupDate"
                    value={pickupDate}
                    onChange={handlePickupDateChange}
                  />
                </div>
                <div>
                  <p>Thời gian trả xe</p>
                  <input
                    type="date"
                    name="returnDate"
                    value={returnDate}
                    onChange={handleReturnDateChange}
                  />
                </div>
              </div>
            </div>
            <div className="search-btn">
              <button onClick={handleSearch}>Tìm xe</button>
            </div>
          </div>
        )}
      </div>
      {searchResults && (
        <div className="result-search">
          <h3>Kết quả tìm kiếm</h3>
          <CarList cars={searchResults} />
        </div>
      )}
    </div>
  );
}
