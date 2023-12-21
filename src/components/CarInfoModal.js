import React, { useState, useEffect } from "react";
import "../styles/CarInfoModal.css";

function CarInfoModal({ LICENSE_PLATE, onclose }) {
  const carAPI = `https://6539dce6e3b530c8d9e8c413.mockapi.io/car-rental/car/${LICENSE_PLATE}`;
  const [carData, setCarData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  

  useEffect(() => {
    const fetchCarData = async () => {
      try {
        const response = await fetch(carAPI);

        if (!response.ok) {
          throw new Error("Failed to fetch car data");
        }

        const data = await response.json();
        setCarData(data);
      } catch (error) {
        console.error("Error fetching car data:", error);
      }
    };

    fetchCarData();
  }, [carAPI]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    try {
      const response = await fetch(carAPI, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(carData),
      });

      if (!response.ok) {
        throw new Error("Failed to save car data");
      }

      setIsEditing(false);
    } catch (error) {
      console.error("Error saving car data:", error);
    }
  };

  const renderField = (label, value) => (
    <div>
      <p>{label} :</p>
      {isEditing ? (
        <input
          type="text"
          value={carData[label]}
          onChange={(e) =>
            setCarData((prevData) => ({ ...prevData, [label]: e.target.value }))
          }
        />
      ) : (
        <p>{value}</p>
      )}
    </div>
  );

  if (!carData) {
    return <p>Loading...</p>;
  }
  console.log(carData);
  
    return (
      <div className="car-info-modal-container">
        {renderField("License Plate", carData.LICENSE_PLATE)}
        {renderField("Owner ID", carData.OWNER_ID)}
        {renderField("Name", carData.NAME)}
        {renderField("Location", carData.LOCATION)}
        {renderField("Last Check", carData.LAST_CHECK)}
        {renderField("Brand", carData.BRAND)}
        {renderField("Seat", carData.SEAT)}
        {renderField("Transmission", carData.TRANSMISSION)}
        {renderField("Fuel", carData.FUEL)}
        {renderField("Consumption", carData.CONSUMPTION)}
        {renderField("Price", carData.PRICE_C)}
        {renderField("Service Cost", carData.SERVICE_C)}
        {renderField("Insurance Cost", carData.INSURANCE_C)}
        {renderField("Description", carData.DESCRIPTION)}
        {renderField("Map", carData.MAP)}
        {renderField("Bluetooth", carData.BLUETOOTH)}
        {renderField("360 Camera", carData.CAMERA_360)}
        {renderField("Side Cameras", carData.CAMERA_SIDES)}
        {renderField("Journey Camera", carData.CAMERA_JOURNEY)}
        {renderField("Back Camera", carData.CAMERA_BACK)}
        {renderField("Tire Sensor", carData.TIRE_SENSOR)}
        {renderField("Impact Sensor", carData.IMPACT_SENSOR)}
        {renderField("Speed Warning", carData.SPEED_WARNING)}
        {renderField("Sky Window", carData.SKY_WINDOW)}
        {renderField("GPS", carData.GPS)}
        {renderField("Child Seat", carData.CHILD_SEAT)}
        {renderField("USB", carData.USB)}
        {renderField("Spare Tire", carData.SPARE_TIRE)}
        {renderField("DVD", carData.DVD)}
        {renderField("ETC", carData.ETC)}
        {renderField("Airbag", carData.AIRBAG)}
        {renderField("Pickup Cover", carData.PICKUP_COVER)}
  
        <div className="car-info-modal-images">
          <div>
            <p>Front Image :</p>
            <img src={carData.FRONT_IMG} alt="Front" />
          </div>
          <div>
            <p>Back Image :</p>
            <img src={carData.BACK_IMG} alt="Back" />
          </div>
          <div>
            <p>Left Image :</p>
            <img src={carData.LEFT_IMG} alt="Left" />
          </div>
          <div>
            <p>Right Image :</p>
            <img src={carData.RIGHT_IMG} alt="Right" />
          </div>
        </div>
  
        <div className="car-info-modal-actions">
          <div>
            <button onClick={handleEditClick}>Chỉnh Sửa</button>
            <button>Xóa</button>
            <button onClick={onclose}>Đóng</button>
          </div>
          {isEditing && (
            <div>
              <button onClick={handleSaveClick}>Lưu</button>
            </div>
          )}
        </div>
      </div>
    );
  }
  
  export default CarInfoModal;
  