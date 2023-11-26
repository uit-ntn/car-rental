import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import "../styles/Detail.css";

const Detail = () => {
  const { id } = useParams();
  const [carData, setCarData] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalDays, setTotalDays] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://6539dce6e3b530c8d9e8c413.mockapi.io/car-rental/car/${id}`);
        const data = await response.json();
        setCarData(data);
        setLoading(false);
      } catch (error) {
        setError("Error fetching data");
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // hàm tính tổng ngày :))
  const calculateTotalDays = () => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffInMilliseconds = end - start;
    const days = diffInMilliseconds / (1000 * 60 * 60 * 24);
    setTotalDays(days);
  };

  const calculateTotalPrice = () => {
    const pricePerDay = carData.price;
    return pricePerDay * totalDays;
  };

  const RentBtnClick = () => {
    calculateTotalDays();
    const totalPrice = calculateTotalPrice();
    console.log("Total Days:", totalDays);
    console.log("Total Price:", totalPrice);
  };

  return (
    <Layout>
      <div className="detail-container">
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {carData && (
          <div className="car-avatar">
            <div className="main-avatar-fix">
              <img className="main-avatar" src={carData.image} alt={carData.name} />
            </div>
            <div className="car-avatar-1-fix">
              <img className="car-avatar-1" src={carData.image} alt={carData.name} />
            </div>
            <div className="car-avatar-2-fix">
              <img className="car-avatar-2" src={carData.image} alt={carData.name} />
            </div>
            <div className="car-avatar-3-fix">
              <img className="car-avatar-3" src={carData.image} alt={carData.name} />
            </div>
          </div>
        )}
        {carData && (
          <div className="rent-box">
            <div className="total-price-header">
              <h2>{carData.price}K/ngày</h2>
            </div>
            <div className="date-time-form">
              <div>
                <p>Ngày nhận</p>
                <input type="date" name="" onChange={(e) => setStartDate(e.target.value)} />
              </div>
              <div>
                <p>Ngày trả</p>
                <input type="date" name="" onChange={(e) => setEndDate(e.target.value)} />
              </div>
            </div>
            <div className="location">
              <h3>Địa điểm giao xe</h3>
              <p>{carData.address}</p>
            </div>
            <div className="price-form-container">
              <div>
                <p>Đơn giá thuê</p>
                <span>{carData.price}</span>
              </div>
              <div>
                <p>Số ngày thuê</p>
                <span>{totalDays}</span>
              </div>
              <div>
                Tổng tiền: {calculateTotalPrice()}K
              </div>
            </div>
            <button onClick={RentBtnClick}>
              Chọn thuê
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Detail;
