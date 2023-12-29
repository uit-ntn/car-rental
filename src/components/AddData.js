import { useState, useEffect } from "react";
import React from "react";
import "../styles/AddData.css"

const AddData = ({ selectedToggle, isOpen, onClose }) => {

    const [userFormData, setUserFormData] = useState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        dob: "",
        gender: "",
        sdt: "",
        gplx: "",
    });


    const handleUserInputChange = (field, value) => {
        setUserFormData(prevData => ({
            ...prevData,
            [field]: value,
        }));
    };
    const handleAddUserData = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userFormData),
            });
            console.log(userFormData);

            if (!response.ok) {
                throw new Error(`Failed to add user. Server responded with ${response.status}`);
            }

            const data = await response.json();
            console.log(data);

            onClose(); // Đóng modal sau khi thêm thành công
        } catch (error) {
            console.error(error);
            alert(`Error adding user: ${error.message}`);
        }
    };
    const handleContractInputChange = (field, value) => {
        setContractFormData(prevData => ({
            ...prevData,
            [field]: value,
        }));
    };

    const handleAddContractData = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/contracts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(contractFormData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Failed to add contract. Server responded with ${response.status}. ${errorData.message}`);
            }

            const data = await response.json();
            console.log(data);

            alert('Contract added successfully!');

            onClose();
        } catch (error) {
            console.error(error);
            alert(`Error adding contract: ${error.message}`);
        }
    };
    const [contractFormData, setContractFormData] = useState({
        USER_ID: "",
        LICENSE_PLATE: "",
        START_DATE: "",
        END_DATE: "",
        DEPOSIT_STATUS: "",
        RETURN_STATUS: "",
    });

    const [carFormData, setCarFormData] = useState({
        CAR_NAME: "",
        LICENSE_PLATE: "",
        CAR_BRAND: "",
        RENTAL_PRICE: "",
        LAST_CHECK: "",
        SEAT: "",
        TRANSMISSION: "",
        FUEL: "",
        CONSUMPTION: "",
        PRICE: "",
        SERVICE_FEE: "",
        INSURANCE_FEE: "",
        DESCRIPTION: "",
        MAP: "",
        BLUETOOTH: "",
        CAMERA_360: "",
        CAMERA_SIDES: "",
        CAMERA_JOURNEY: "",
        CAMERA_BACK: "",
        TIRE_SENSOR: "",
        IMPACT_SENSOR: "",
        SPEED_WARNING: "",
        SKY_WINDOW: "",
        GPS: "",
        CHILD_SEAT: "",
        USB: "",
        SPARE_TIRE: "",
        DVD: "",
        ETC: "",
        AIRBAG: "",
        PICKUP_COVER: "",
        FRONT_IMG: "",
        BACK_IMG: "",
        LEFT_IMG: "",
        RIGHT_IMG: "",
    });

    const handleCarInputChange = (field, value) => {
        setCarFormData(prevData => ({
            ...prevData,
            [field]: value,
        }));
    };

    const handleAddCarData = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/car', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(carFormData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Failed to add car. Server responded with ${response.status}. ${errorData.message}`);
            }

            const data = await response.json();
            console.log(data);

            alert('Car added successfully!');

            onClose();
        } catch (error) {
            console.error(error);
            alert(`Error adding car: ${error.message}`);
        }
    };
    return (<>
        {isOpen && (
            <div className="add-data-form-container">
                <h4 className="data-form-header">
                    Thêm mới {selectedToggle}
                </h4>
                <div>
                    {selectedToggle === "users"
                        && (
                            <form>
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Địa chỉ email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="exampleInputEmail1"
                                        aria-describedby="emailHelp"
                                        placeholder="Enter email"
                                        onChange={(e) => handleUserInputChange('email', e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Mật khẩu</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        placeholder="Password"
                                        onChange={(e) => handleUserInputChange('password', e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="firstName">Họ</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="firstName"
                                        placeholder="Enter first name"
                                        onChange={(e) => handleUserInputChange('firstName', e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="lastName">Tên</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="lastName"
                                        placeholder="Enter last name"
                                        onChange={(e) => handleUserInputChange('lastName', e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="dob">Ngày sinh</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        id="dob"
                                        onChange={(e) => handleUserInputChange('dob', e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="gender">Giới tính</label>
                                    <select
                                        className="form-control"
                                        id="gender"
                                        onChange={(e) => handleUserInputChange('gender', e.target.value)}
                                    >
                                        <option value="F">Nữ</option>
                                        <option value="M">Nam</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="sdt">Số điện thoại</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="sdt"
                                        placeholder="Enter phone number"
                                        onChange={(e) => handleUserInputChange('sdt', e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="gplx">GPLX</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="gplx"
                                        placeholder="Enter GPLX"
                                        onChange={(e) => handleUserInputChange('gplx', e.target.value)}
                                    />
                                </div>
                            </form>

                        )
                    }
                    {selectedToggle === "contracts" && (
                        <form>
                            <div className="form-group">
                                <label htmlFor="licensePlate">Biển số xe</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="licensePlate"
                                    placeholder="Enter license plate"
                                    onChange={(e) => handleContractInputChange('LICENSE_PLATE', e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="userId">User ID</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="userId"
                                    placeholder="Enter user ID"
                                    onChange={(e) => handleContractInputChange('USER_ID', e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="startDate">Ngày bắt đầu</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    id="startDate"
                                    onChange={(e) => handleContractInputChange('START_DATE', e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="endDate">Ngày kết thúc</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    id="endDate"
                                    onChange={(e) => handleContractInputChange('END_DATE', e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="depositStatus">Tình trạng đặt cọc</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="depositStatus"
                                    placeholder="Enter deposit status"
                                    onChange={(e) => handleContractInputChange('DEPOSIT_STATUS', e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="returnStatus">Tình trạng trả xe</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="returnStatus"
                                    placeholder="Enter return status"
                                    onChange={(e) => handleContractInputChange('RETURN_STATUS', e.target.value)}
                                />
                            </div>
                        </form>
                    )}

                    {selectedToggle === "cars" && (
                        <form>
                            <div className="form-group">
                                <label htmlFor="licensePlate">Biển số xe</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="licensePlate"
                                    placeholder="Enter license plate"
                                    onChange={(e) => handleCarInputChange('LICENSE_PLATE', e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="ownerId">ID Người sở hữu</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="ownerId"
                                    placeholder="Enter owner ID"
                                    onChange={(e) => handleCarInputChange('OWNER_ID', e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="carName">Tên xe</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="carName"
                                    placeholder="Enter car name"
                                    onChange={(e) => handleCarInputChange('NAME', e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="location">Vị trí</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="location"
                                    placeholder="Enter location"
                                    onChange={(e) => handleCarInputChange('LOCATION', e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="lastCheck">Ngày kiểm tra cuối cùng</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="lastCheck"
                                    placeholder="Enter last check date"
                                    onChange={(e) => handleCarInputChange('LAST_CHECK', e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="carBrand">Hãng xe</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="carBrand"
                                    placeholder="Enter car brand"
                                    onChange={(e) => handleCarInputChange('BRAND', e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="seat">Số ghế</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="seat"
                                    placeholder="Enter seat number"
                                    onChange={(e) => handleCarInputChange('SEAT', e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="transmission">Loại hộp số</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="transmission"
                                    placeholder="Enter transmission type"
                                    onChange={(e) => handleCarInputChange('TRANSMISSION', e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="fuel">Loại nhiên liệu</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="fuel"
                                    placeholder="Enter fuel type"
                                    onChange={(e) => handleCarInputChange('FUEL', e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="consumption">Mức tiêu thụ nhiên liệu</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="consumption"
                                    placeholder="Enter fuel consumption"
                                    onChange={(e) => handleCarInputChange('CONSUMPTION', e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="rentalPrice">Giá cho thuê</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="rentalPrice"
                                    placeholder="Enter rental price"
                                    onChange={(e) => handleCarInputChange('PRICE', e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="serviceFee">Phí dịch vụ</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="serviceFee"
                                    placeholder="Enter service fee"
                                    onChange={(e) => handleCarInputChange('SERVICE_FEE', e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="insuranceFee">Phí bảo hiểm</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="insuranceFee"
                                    placeholder="Enter insurance fee"
                                    onChange={(e) => handleCarInputChange('INSURANCE_FEE', e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Mô tả</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="description"
                                    placeholder="Enter description"
                                    onChange={(e) => handleCarInputChange('DESCRIPTION', e.target.value)}
                                />
                            </div>


                            <div className="form-group">
                                <label htmlFor="leftImg">Ảnh bên trái</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="leftImg"
                                    placeholder="Enter URL of left image"
                                    onChange={(e) => handleCarInputChange('LEFT_IMG', e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="rightImg">Ảnh bên phải</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="rightImg"
                                    placeholder="Enter URL of right image"
                                    onChange={(e) => handleCarInputChange('RIGHT_IMG', e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="tireSensor">Cảm biến lốp</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="tireSensor"
                                    placeholder="Enter tire sensor status (Y/N)"
                                    onChange={(e) => handleCarInputChange('TIRE_SENSOR', e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="impactSensor">Cảm biến va chạm</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="impactSensor"
                                    placeholder="Enter impact sensor status (Y/N)"
                                    onChange={(e) => handleCarInputChange('IMPACT_SENSOR', e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="speedWarning">Cảnh báo tốc độ</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="speedWarning"
                                    placeholder="Enter speed warning status (Y/N)"
                                    onChange={(e) => handleCarInputChange('SPEED_WARNING', e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="skyWindow">Cửa sổ trời</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="skyWindow"
                                    placeholder="Enter sky window status (Y/N)"
                                    onChange={(e) => handleCarInputChange('SKY_WINDOW', e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="gps">GPS</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="gps"
                                    placeholder="Enter GPS status (Y/N)"
                                    onChange={(e) => handleCarInputChange('GPS', e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="childSeat">Ghế trẻ em</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="childSeat"
                                    placeholder="Enter child seat status (Y/N)"
                                    onChange={(e) => handleCarInputChange('CHILD_SEAT', e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="usb">USB</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="usb"
                                    placeholder="Enter USB status (Y/N)"
                                    onChange={(e) => handleCarInputChange('USB', e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="spareTire">Lốp dự phòng</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="spareTire"
                                    placeholder="Enter spare tire status (Y/N)"
                                    onChange={(e) => handleCarInputChange('SPARE_TIRE', e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="airbag">Túi khí</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="airbag"
                                    placeholder="Enter airbag status (Y/N)"
                                    onChange={(e) => handleCarInputChange('AIRBAG', e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="pickupCover">Nắp thùng xe bán tải</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="pickupCover"
                                    placeholder="Enter pickup cover status (Y/N)"
                                    onChange={(e) => handleCarInputChange('PICKUP_COVER', e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="bluetooth">Bluetooth</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="bluetooth"
                                    placeholder="Enter Bluetooth status (Y/N)"
                                    onChange={(e) => handleCarInputChange('BLUETOOTH', e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="camera360">Camera 360</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="camera360"
                                    placeholder="Enter Camera 360 status (Y/N)"
                                    onChange={(e) => handleCarInputChange('CAMERA_360', e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="cameraSides">Camera Sides</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="cameraSides"
                                    placeholder="Enter Camera Sides status (Y/N)"
                                    onChange={(e) => handleCarInputChange('CAMERA_SIDES', e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="cameraJourney">Camera Journey</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="cameraJourney"
                                    placeholder="Enter Camera Journey status (Y/N)"
                                    onChange={(e) => handleCarInputChange('CAMERA_JOURNEY', e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="cameraBack">Camera Back</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="cameraBack"
                                    placeholder="Enter Camera Back status (Y/N)"
                                    onChange={(e) => handleCarInputChange('CAMERA_BACK', e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="tireSensor">Cảm biến lốp</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="tireSensor"
                                    placeholder="Enter tire sensor status (Y/N)"
                                    onChange={(e) => handleCarInputChange('TIRE_SENSOR', e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="impactSensor">Cảm biến va chạm</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="impactSensor"
                                    placeholder="Enter impact sensor status (Y/N)"
                                    onChange={(e) => handleCarInputChange('IMPACT_SENSOR', e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="speedWarning">Cảnh báo vận tốc</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="speedWarning"
                                    placeholder="Enter speed warning status (Y/N)"
                                    onChange={(e) => handleCarInputChange('SPEED_WARNING', e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="skyWindow">Cửa trời</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="skyWindow"
                                    placeholder="Enter sky window status (Y/N)"
                                    onChange={(e) => handleCarInputChange('SKY_WINDOW', e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="gps">GPS</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="gps"
                                    placeholder="Enter GPS status (Y/N)"
                                    onChange={(e) => handleCarInputChange('GPS', e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="childSeat">Ghế trẻ em</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="childSeat"
                                    placeholder="Enter child seat status (Y/N)"
                                    onChange={(e) => handleCarInputChange('CHILD_SEAT', e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="usb">Cổng USB</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="usb"
                                    placeholder="Enter USB status (Y/N)"
                                    onChange={(e) => handleCarInputChange('USB', e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="spareTire">Bánh xe dự phòng</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="spareTire"
                                    placeholder="Enter spare tire status (Y/N)"
                                    onChange={(e) => handleCarInputChange('SPARE_TIRE', e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="dvd">Đầu đĩa DVD</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="dvd"
                                    placeholder="Enter DVD status (Y/N)"
                                    onChange={(e) => handleCarInputChange('DVD', e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="etc">ETC</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="etc"
                                    placeholder="Enter ETC status (Y/N)"
                                    onChange={(e) => handleCarInputChange('ETC', e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="airbag">Túi khí</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="airbag"
                                    placeholder="Enter airbag status (Y/N)"
                                    onChange={(e) => handleCarInputChange('AIRBAG', e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="pickupCover">Nắp thùng xe</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="pickupCover"
                                    placeholder="Enter pickup cover status (Y/N)"
                                    onChange={(e) => handleCarInputChange('PICKUP_COVER', e.target.value)}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="frontImg">Ảnh mặt trước</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="frontImg"
                                    placeholder="Enter front image URL"
                                    onChange={(e) => handleCarInputChange('FRONT_IMG', e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="backImg">Ảnh mặt sau</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="backImg"
                                    placeholder="Enter back image URL"
                                    onChange={(e) => handleCarInputChange('BACK_IMG', e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="leftImg">Ảnh mặt trái</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="leftImg"
                                    placeholder="Enter left image URL"
                                    onChange={(e) => handleCarInputChange('LEFT_IMG', e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="rightImg">Ảnh mặt phải</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="rightImg"
                                    placeholder="Enter right image URL"
                                    onChange={(e) => handleCarInputChange('RIGHT_IMG', e.target.value)}
                                />
                            </div>

                        </form>

                    )}
                </div>
                <div className="add-data-form-actions">
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => {
                            if (selectedToggle === "users") {
                                handleAddUserData();
                            } else if (selectedToggle === "cars") {
                                handleAddCarData();
                            } else if (selectedToggle === "contracts") {
                                handleAddContractData();
                            }
                        }}
                    >
                        Thêm
                    </button>

                    <button type="button" className="btn btn-primary" onClick={() => onClose()}>
                        Đóng
                    </button>

                </div>
            </div>
        )}
    </>
    );
};

export default AddData;