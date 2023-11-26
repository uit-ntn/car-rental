import React from "react";
import { useState } from "react";
import "../styles/SearchBar.css"

export default function SearchBar() {
    const [isSelfDrivingSelected, setIsSelfDrivingSelected] = useState(true);
    const [isDriverSelected, setIsDriverSelected] = useState(false);
    const [pickupDate, setPickupDate] = useState('');
    const [returnDate, setReturnDate] = useState('');
    const [isSearchAllowed, setIsSearchAllowed] = useState(false);
    const handlePickupDateChange = (event) => {
        const newPickupDate = event.target.value;
        setPickupDate(newPickupDate);
        validateDateRange(newPickupDate, returnDate);
        updateSearchAllowed();
    };

    const handleReturnDateChange = (event) => {
        const newReturnDate = event.target.value;
        setReturnDate(newReturnDate);
        validateDateRange(pickupDate, newReturnDate);
        updateSearchAllowed();
    };

    // ràng buộc ngày trả xe phải lớn hơn ngày nhận xe
    const validateDateRange = (start, end) => {
        if (start && end && new Date(end) > new Date(start)) {
            console.log('Date range is valid');
            return true;
        } else {
            console.log('Invalid date range');
            return false;
        }
    };


    // ràng buộc người dùng phải nhập đầy đủ thông tin
    const updateSearchAllowed = () => {
        setIsSearchAllowed(hasRequiredInput());
    };

    const hasRequiredInput = () => {
        if (isSelfDrivingSelected) {
            return pickupDate && returnDate;
        } else {
            return pickupDate && returnDate;
        }
    };


    const handleToggle = (isSelfDriving) => {
        setIsSelfDrivingSelected(isSelfDriving);
        setIsDriverSelected(!isSelfDriving);
        setIsSearchAllowed(false);
    };

    const handleSearch = () => {
        if (isSearchAllowed) {
            alert('Tìm kiếm xe...');
        } else {
            alert('Vui lòng nhập đủ thông tin và chọn ngày hợp lệ');
        }
    };
    return (
        <div className="search-options">
            <div className="search-options-toggle">
                <button onClick={() => handleToggle(true)}>Xe tự lái</button>
                <button onClick={() => handleToggle(false)}>Xe có tài xế</button>
            </div>

            {isSelfDrivingSelected && (
                <div className="search-input self-driving">
                    <div className="location-input">
                        <p>Địa điểm nhận xe</p>
                        <input
                            type="text"
                            name="location"
                            placeholder="Nhập địa điểm"
                        ></input>
                    </div>
                    <div className="rental-period-input">
                        <h3>Thời gian thuê</h3>
                        <p>Thời gian nhận xe</p>
                        <input
                            type="date"
                            name="pickupDate"
                            value={pickupDate}
                            onChange={handlePickupDateChange}
                        ></input>
                        <p>Thời gian trả xe</p>
                        <input
                            type="date"
                            name="returnDate"
                            value={returnDate}
                            onChange={handleReturnDateChange}
                        ></input>
                    </div>
                    <div className="search-btn">
                        <button onClick={handleSearch}>Tìm xe</button>
                    </div>
                </div>
            )}

            {isDriverSelected && (
                <div className="car-with-driver">
                    <div className="route-input">
                        <div className="pick-up-point">
                            <p>Điểm đón</p>
                            <input
                                type="text"
                                name="pick-up-point"
                                placeholder="Nhập địa điểm cụ thể"
                            ></input>
                        </div>
                        <div className="destination-point">
                            <p>Điểm đến</p>
                            <input
                                type="text"
                                name="destination-point"
                                placeholder="Nhập địa điểm cụ thể"
                            ></input>
                        </div>
                        <div className="is-round-trip">
                            <input type="checkbox" name="round-trip"></input>
                            <span>Có khứ hồi</span>
                        </div>
                        <div className="rental-period-input">
                            <h3>Thời gian thuê</h3>
                            <p>Thời gian nhận xe</p>
                            <input
                                type="date"
                                name="pickupDate"
                                value={pickupDate}
                                onChange={handlePickupDateChange}
                            ></input>
                            <p>Thời gian trả xe</p>
                            <input
                                type="date"
                                name="returnDate"
                                value={returnDate}
                                onChange={handleReturnDateChange}
                            ></input>
                        </div>
                    </div>
                    <div className="search-btn">
                        <button onClick={handleSearch}>Tìm xe</button>
                    </div>
                </div>
            )}

        </div>
    )
}