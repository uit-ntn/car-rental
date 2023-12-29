import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import CheckOutModal from "../components/CheckOutModal";
import "../styles/Detail.css";
import UserContext, { UserProvider } from "../hooks/userProvider";

function Detail() {
  const { id } = useParams();
  const [carData, setCarData] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [totalDays, setTotalDays] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const { userId } = useContext(UserContext);

  // Lấy dữ liệu của xe từ ID
  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchData = async () => {
      try {
        const apiUrl = `http://127.0.0.1:8000/api/car/${id}`;

        await fetch(apiUrl, {
          method: "GET",
        })
          .then((res) => {
            if (!res.ok) {
              console.log("Error!");
              throw new Error(res.message);
            }
            return res.json();
          })
          .then((data) => {
            console.log(data.data);
            setCarData(data.data);
            setLoading(false);
          });
      } catch (error) {
        alert("Lỗi khi lấy dữ liệu");
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  // re-render tổng ngày thuê
  useEffect(() => {
    const calculateTotalDays = () => {
      if (startDate) {
        if (new Date(startDate) < new Date()) {
          alert("Vui lòng chọn ngày hợp lệ");
          return;
        }
      }

      if (startDate && endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);

        if (end < start) {
          alert("Ngày trả phải lớn hơn ngày nhận");
          return;
        }

        const diffInMilliseconds = end - start;
        const days = diffInMilliseconds / (1000 * 60 * 60 * 24);
        setTotalDays(days);
      }
    };

    calculateTotalDays();
  }, [startDate, endDate]);

  // re-render tổng tiền khi ngày tháng thay đổi
  useEffect(() => {
    const calculateTotalPrice = () => {
      if (carData) {
        const pricePerDay = carData.PRICE_C;
        const calculatedTotalPrice =
          pricePerDay * totalDays + carData.SERVICE_C + carData.INSURANCE_C;
        return totalDays === 0 ? "NaN" : calculatedTotalPrice;
      }
      return NaN;
    };

    const totalPrice = calculateTotalPrice(); // Calculate total price
    setTotalPrice(totalPrice); // Update the state once
  }, [carData, totalDays]);

  // hàm thanh toán
  const rentBtnClick = (e) => {
    e.preventDefault();
    if (!userId) {
      alert("Vui lòng đăng nhập để thực hiện tiếp quy trình thuê xe!");
      return;
    }

    setShowModal(true);
  };

  const addToCart = async (event) => {
    event.preventDefault();
    if (!userId) {
      alert("Vui lòng đăng nhập để thực hiện tiếp quy trình thuê xe!");
      return;
    }
    await fetch("http://127.0.0.1:8000/api/bookmark", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        USER_ID: userId,
        LICENSE_PLATE: carData.LICENSE_PLATE,
      }),
    })
      .then((res) => {
        if (res.ok) {
          alert("Xe được thêm vào bookmark!");
        }
        res.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((e) => console.log(e));
  };

  return (
    <Layout>
      {!carData && <p>Loading...</p>}
      {carData && (
        <div className="detail-container">
          {/* car avatar section*/}
          {loading && <p>Đợi xíu nha ^^...</p>}
          {carData && (
            <div className="car-avatar">
              <div className="main-avatar-fix">
                <img
                  className="main-avatar"
                  src={require(`../assets/imageCars/${carData.LEFT_IMG}.jpg`)}
                  alt={carData.LEFT_IMG}
                />
              </div>
              <div className="other-avatar">
                <div className="car-avatar-1-fix">
                  <img
                    className="car-avatar-1"
                    src={require(`../assets/imageCars/${carData.FRONT_IMG}.jpg`)}
                    alt={carData.FRONT_IMG}
                  />
                </div>
                <div className="car-avatar-2-fix">
                  <img
                    className="car-avatar-2"
                    src={require(`../assets/imageCars/${carData.BACK_IMG}.jpg`)}
                    alt={carData.BACK_IMG}
                  />
                </div>
                <div className="car-avatar-3-fix">
                  <img
                    className="car-avatar-3"
                    src={require(`../assets/imageCars/${carData.RIGHT_IMG}.jpg`)}
                    alt={carData.RIGHT_IMG}
                  />
                </div>
              </div>
            </div>
          )}

          {/*rent-box section*/}
          {carData && (
            <form className="rent-box form-group bg-info">
              <div className="total-price-header">
                <h2 className="form-control">{carData.PRICE_C?.toLocaleString()} vnd/ngày</h2>
              </div>
              <div className="date-time-form form-control">
                <div className="date-time-input">
                  <p>Ngày nhận</p>
                  <input
                    type="date"
                    name=""
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>
                <div className="date-time-input">
                  <p>Ngày trả</p>
                  <input
                    type="date"
                    name=""
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
              </div>
              <div className="location form-control">
                <h3>Địa điểm giao xe</h3>
                <p>{carData.LOCATION}</p>
              </div>
              <div className="price-form-container">
                <div className="price-items form-control">
                  <p>Phí dịch vụ : </p>
                  <span>{carData.SERVICE_C?.toLocaleString()} vnd</span>
                </div>
                <div className="price-items form-control">
                  <p>Phí bảo hiểm :</p>
                  <span>{carData.INSURANCE_C?.toLocaleString()} vnd</span>
                </div>
                <div className="price-items form-control">
                  <p>Số ngày thuê : </p>
                  <span>{totalDays}</span>
                </div>
                <div className="price-items form-control">
                  <p>Tổng tiền :</p>
                  <span>{totalPrice?.toLocaleString()} VNĐ</span>
                </div>
              </div>
              <div className="rent-actions price-items">
                <button className="btn btn-primary" onClick={addToCart}>
                  Thêm vào bookmark
                </button>
                <button className="btn btn-success" onClick={rentBtnClick}>
                  Chọn thuê
                </button>
              </div>
            </form>
          )}
          {showModal && (
            <CheckOutModal
              carData={carData}
              startDate={startDate}
              endDate={endDate}
              totalDays={totalDays}
              totalPrice={totalPrice}
              onClose={() => setShowModal(false)}
            />
          )}

          {/* car description section */}
          <div className="car-description">
            <h1>{carData.NAME}</h1>
            <h3>Mô tả</h3>
            <p>{carData.DESCRIPTION}</p>
          </div>

          {/* car feature section */}
          <div className="car-feature-container">
            <hr />
            <h3>Đặc điểm</h3>
            <div className="car-feature-box">
              <div className="car-feature-item">
                <div className="car-feature-icon-fix">
                  <img src={require("../assets/img/seats-icon.png")} alt="" />
                </div>
                <h5>Số ghế</h5>
                <p>{carData && carData.SEAT ? carData.SEAT : "chưa rõ"}</p>
              </div>
              <div className="car-feature-item">
                <div className="car-feature-icon-fix">
                  <img
                    src={require("../assets/img/transmission-icon.png")}
                    alt=""
                  />
                </div>
                <h5>Truyền động</h5>
                <p>
                  {carData && carData.TRANSMISSION
                    ? carData.TRANSMISSION
                    : "chưa rõ"}
                </p>
              </div>
              <div className="car-feature-item">
                <div className="car-feature-icon-fix">
                  <img
                    src={require("../assets/img/fuel-type-icon.png")}
                    alt=""
                  />
                </div>
                <h5>Nhiên liệu sử dụng</h5>
                <p>{carData && carData.FUEL ? carData.FUEL : "chưa rõ"}</p>
              </div>
              <div className="car-feature-item">
                <div className="car-feature-icon-fix">
                  <img
                    src={require("../assets/img/fuel-consumption-icon.png")}
                    alt=""
                  />
                </div>
                <h5>Nhiêu liệu tiêu hao</h5>
                <p>
                  {carData && carData.CONSUMPTION
                    ? carData.CONSUMPTION
                    : "chưa rõ"}{" "}
                  lít/100km
                </p>
              </div>
            </div>
            <hr />

            {}
            <div className="other-amenities">
              <h3>Các tiện nghi khác</h3>
              <ul className="other-amenities-list">
                <li>
                  <i className={`bx bx-bluetooth`}></i> Bluetooth:{" "}
                  {carData.BLUETOOTH === "Y" ? "Có" : "Không"}
                </li>
                <li>
                  <i className={`bx bx-camera`}></i> Camera 360:{" "}
                  {carData.CAMERA_360 === "Y" ? "Có" : "Không"}
                </li>
                <li>
                  <i className={`bx bx-camera-reels`}></i> Camera Sides:{" "}
                  {carData.CAMERA_SIDES === "Y" ? "Có" : "Không"}
                </li>
                <li>
                  <i className={`bx bx-car`}></i> Camera Journey:{" "}
                  {carData.CAMERA_JOURNEY === "Y" ? "Có" : "Không"}
                </li>
                <li>
                  <i className={`bx bx-receipt`}></i> Camera Back:{" "}
                  {carData.CAMERA_BACK === "Y" ? "Có" : "Không"}
                </li>
                <li>
                  <i className={`bx bx-tire`}></i> Tire Sensor:{" "}
                  {carData.TIRE_SENSOR === "Y" ? "Có" : "Không"}
                </li>
                <li>
                  <i className={`bx bx-wind`}></i> Impact Sensor:{" "}
                  {carData.IMPACT_SENSOR === "Y" ? "Có" : "Không"}
                </li>
                <li>
                  <i className={`bx bx-speed`}></i> Speed Warning:{" "}
                  {carData.SPEED_WARNING === "Y" ? "Có" : "Không"}
                </li>
                <li>
                  <i className={`bx bx-sun`}></i> Sky Window:{" "}
                  {carData.SKY_WINDOW === "Y" ? "Có" : "Không"}
                </li>
                <li>
                  <i className={`bx bx-globe`}></i> GPS:{" "}
                  {carData.GPS === "Y" ? "Có" : "Không"}
                </li>
                <li>
                  <i className={`bx bx-child`}></i> Child Seat:{" "}
                  {carData.CHILD_SEAT === "Y" ? "Có" : "Không"}
                </li>
                <li>
                  <i className={`bx bx-usb`}></i> USB:{" "}
                  {carData.USB === "Y" ? "Có" : "Không"}
                </li>
                <li>
                  <i className={`bx bx-tire`}></i> Spare Tire:{" "}
                  {carData.SPARE_TIRE === "Y" ? "Có" : "Không"}
                </li>
                <li>
                  <i className={`bx bx-dvd`}></i> DVD:{" "}
                  {carData.DVD === "Y" ? "Có" : "Không"}
                </li>
                <li>
                  <i className={`bx bx-card`}></i> ETC:{" "}
                  {carData.ETC === "Y" ? "Có" : "Không"}
                </li>
                <li>
                  <i className={`bx bx-shield-x`}></i> Airbag:{" "}
                  {carData.AIRBAG === "Y" ? "Có" : "Không"}
                </li>
                <li>
                  <i className={`bx bx-package`}></i> Pickup Cover:{" "}
                  {carData.PICKUP_COVER === "Y" ? "Có" : "Không"}
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}

export default Detail;
