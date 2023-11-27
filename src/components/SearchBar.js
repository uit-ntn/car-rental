import React, { useState } from "react";
import CarList from "../components/CarList";
import "../styles/SearchBar.css";

export default function SearchBar() {
    const [isSelfDrivingSelected, setIsSelfDrivingSelected] = useState(true);
    const [pickupDate, setPickupDate] = useState('');
    const [returnDate, setReturnDate] = useState('');
    const [isSearchAllowed, setIsSearchAllowed] = useState(false);
    const [searchResults, setSearchResults] = useState();
    const [isDriverSelected, setIsDriverSelected] = useState(false);

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

    // Kiểm tra khoảng thời gian hợp lệ
    const validateDateRange = (start, end) => {
        if (start && end && new Date(end) > new Date(start)) {
            console.log('Khoảng thời gian hợp lệ');
            return true;
        } else {
            console.log('Khoảng thời gian không hợp lệ');
            return false;
        }
    };

    // Cập nhật khả năng tìm kiếm
    const updateSearchAllowed = () => {
        setIsSearchAllowed(hasRequiredInput());
    };

    // Yêu cầu nhập đầy đủ thông tin
    const hasRequiredInput = () => {
        return pickupDate && returnDate;
    };

    // Chuyển đổi giữa lựa chọn tự lái và có tài xế
    const handleToggle = (isSelfDriving) => {
        setIsSelfDrivingSelected(isSelfDriving);
        setIsDriverSelected(!isSelfDriving);
        setIsSearchAllowed(false);
    };

    // Xử lý tìm kiếm dựa trên lựa chọn đã chọn
    const handleSearch = () => {
        if (isSearchAllowed) {
            // Địa chỉ API
            const apiUrl = "https://6539dce6e3b530c8d9e8c413.mockapi.io/car-rental/car";

            // Xây dựng tham số truy vấn dựa trên thông tin người dùng nhập
            const queryParams = `?pickupDate=${pickupDate}&returnDate=${returnDate}&isSelfDriving=${isSelfDrivingSelected ? 1 : 0}`;

            // Thực hiện cuộc gọi API
            fetch(apiUrl + queryParams)
                .then((response) => response.json())
                .then((data) => {
                    // Cập nhật trạng thái với kết quả lấy được
                    setSearchResults(data);
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
                                    ></input>
                                </div>
                                <div>
                                    <p>Thời gian trả xe</p>
                                    <input
                                        type="date"
                                        name="returnDate"
                                        value={returnDate}
                                        onChange={handleReturnDateChange}
                                    ></input>
                                </div>
                            </div>
                        </div>
                        <div className="search-btn">
                            <button onClick={handleSearch}>Tìm xe</button>
                        </div>
                    </div>
                )}

                {isDriverSelected && (
                    <div className="car-with-driver">
                        <div className="route-input">
                            <div className="pick-up-box">
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
                            </div>
                            <div className="is-round-trip">
                                <p>Có khứ hồi</p>
                                <input type="checkbox" name="round-trip"></input>
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
                                        ></input>
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
                        </div>
                        <div className="search-btn">
                            <button onClick={handleSearch}>Tìm xe</button>
                        </div>
                    </div>
                )}
            </div>
            {
                searchResults && (

                    <div className="result-search">
                        <h3>Kết quả tìm kiếm</h3>
                        <CarList cars={searchResults} />
                    </div>
                )
            }
        </div>
    );
}

