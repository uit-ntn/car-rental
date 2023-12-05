import React, { useState } from "react";
import CarList from "../components/CarList";
import "../styles/SearchBar.css";

export default function SearchBar() {
    const [isSelfDrivingSelected, setIsSelfDrivingSelected] = useState(true);
    const [pickupDate, setPickupDate] = useState('');
    const [returnDate, setReturnDate] = useState('');
    const [searchResults, setSearchResults] = useState();
    const [selectedButton, setSelectedButton] = useState("self-driving");

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

    const validateDateRange = (start, end) => {
        return start && end && new Date(end) > new Date(start);
    };

    const handleToggle = (isSelfDriving) => {
        setIsSelfDrivingSelected(isSelfDriving);
        setSelectedButton(isSelfDriving ? "self-driving" : "with-driver");
    };

    const handleSearch = () => {
        if (hasRequiredInput()) {
            const apiUrl = "https://6539dce6e3b530c8d9e8c413.mockapi.io/car-rental/car";
            const queryParams = `?isSelfDriving=${isSelfDrivingSelected ? 1 : 0}`;

            if (isSelfDrivingSelected) {
                queryParams += `&pickupDate=${pickupDate}&returnDate=${returnDate}`;
            } else {
                const pickupPoint = document.getElementsByName("pick-up-point")[0].value;
                const destinationPoint = document.getElementsByName("destination-point")[0].value;
                queryParams += `&pickupPoint=${pickupPoint}&destinationPoint=${destinationPoint}`;
                const isRoundTrip = document.getElementsByName("round-trip")[0].checked;
                queryParams += `&isRoundTrip=${isRoundTrip ? 1 : 0}`;
            }

            fetch(apiUrl + queryParams)
                .then((response) => response.json())
                .then((data) => {
                    setSearchResults(data);
                })
                .catch((error) => console.error("Lỗi khi lấy dữ liệu:", error));
        } else {
            alert("Vui lòng nhập đủ thông tin và chọn ngày hợp lệ");
        }
    };

    const hasRequiredInput = () => {
        if (isSelfDrivingSelected) {
            return pickupDate && returnDate;
        } else {
            const pickupPoint = document.getElementsByName("pick-up-point")[0].value;
            const destinationPoint = document.getElementsByName("destination-point")[0].value;
            return pickupDate && returnDate && pickupPoint && destinationPoint;
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
                        Xe tự lái
                    </button>
                    <button
                        onClick={() => handleToggle(false)}
                        className={selectedButton === "with-driver" ? "selected" : ""}
                    >
                        Xe có tài xế
                    </button>
                </div>

                {(isSelfDrivingSelected || !isSelfDrivingSelected) && (
                    <div className={`search-input ${isSelfDrivingSelected ? 'self-driving' : 'car-with-driver'}`}>
                        {isSelfDrivingSelected && (
                            <div className="location-input">
                                <p>Địa điểm nhận xe</p>
                                <input
                                    type="text"
                                    name="location"
                                    placeholder="Nhập địa điểm"
                                />
                            </div>
                        )}

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
                        {!isSelfDrivingSelected && (
                            <div className="route-input">
                                <div className="pick-up-box">
                                    <div className="pick-up-point">
                                        <p>Điểm đón</p>
                                        <input
                                            type="text"
                                            name="pick-up-point"
                                            placeholder="Nhập địa điểm cụ thể"
                                        />
                                    </div>
                                    <div className="destination-point">
                                        <p>Điểm đến</p>
                                        <input
                                            type="text"
                                            name="destination-point"
                                            placeholder="Nhập địa điểm cụ thể"
                                        />
                                    </div>
                                </div>
                                <div className="is-round-trip">
                                    <p>Có khứ hồi</p>
                                    <input type="checkbox" name="round-trip" />
                                </div>
                            </div>
                        )}
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
