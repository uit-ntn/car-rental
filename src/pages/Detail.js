import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import CheckOutModal from "../components/CheckOutModal";
import "../styles/Detail.css";

function Detail() {
  const { id } = useParams();
  const [carData, setCarData] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalDays, setTotalDays] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [showModal, setShowModal] = useState(false);

  // Lấy dữ liệu của xe từ ID
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://6539dce6e3b530c8d9e8c413.mockapi.io/car-rental/car/${id}`);
        const data = await response.json();
        setCarData(data);
        setLoading(false);
      } catch (error) {
        setError("Lỗi khi lấy dữ liệu");
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  // re-render tổng ngày thuê
  useEffect(() => {
    const calculateTotalDays = () => {
      if (startDate && endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        if (end < start) {
          setError("Ngày trả phải lớn hơn ngày nhận");
          return;
        }

        const diffInMilliseconds = end - start;
        const days = diffInMilliseconds / (1000 * 60 * 60 * 24);
        setTotalDays(days);
        setError(null);
      }
    };

    calculateTotalDays();
  }, [startDate, endDate]);

  // re-render tổng tiền khi ngày tháng thay đổi
  useEffect(() => {
    const calculateTotalPrice = () => {
      if (carData) {
        const pricePerDay = carData.price;
        const calculatedTotalPrice = pricePerDay * totalDays * 1000 + carData.insuranceFees * totalDays;
        return calculatedTotalPrice;
      }
      return 0;
    };

    const totalPrice = calculateTotalPrice();
    setTotalPrice(totalPrice);

  }, [carData, totalDays]);


  // hàm thanh toán
  const rentBtnClick = (e) => {
    e.preventDefault();

    setShowModal(true);
  };

  const addToCart = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("https://656d757bbcc5618d3c23335e.mockapi.io/car-rental/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fuelType: carData.fuelType,
          avatar: carData.avatar,
          price: carData.price,
          fuelConsumption: carData.fuelConsumption,
          transmission: carData.transmission,
          seats: carData.seats,
          insuranceFees: carData.insuranceFees,
          address: carData.address,
          name: carData.name
        }),
      });

      if (response.ok) {
        console.log("Added to Cart:", carData);
      } else {
        console.error("Error adding to cart:", response.statusText);
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };


  return (
    <Layout>
      <div className="detail-container">
        {/* car avatar section*/}
        {loading && <p>Đợi xíu nha ^^...</p>}
        {error && <p>{error}</p>}
        {carData && (
          <div className="car-avatar">
            <div className="main-avatar-fix">
              <img className="main-avatar" src={carData.image} alt={carData.name} />
            </div>
            <div className="other-avatar">
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
          </div>
        )}

        {/*rent-box section*/}
        {carData && (
          <form className="rent-box">
            <div className="total-price-header">
              <h2>{carData.price}K/ngày</h2>
            </div>
            <div className="date-time-form">
              <div className="date-time-input">
                <p>Ngày nhận</p>
                <input type="date" name="" onChange={(e) => setStartDate(e.target.value)} />
              </div>
              <div className="date-time-input">
                <p>Ngày trả</p>
                <input type="date" name="" onChange={(e) => setEndDate(e.target.value)} />
              </div>
            </div>
            <div className="location">
              <h3>Địa điểm giao xe</h3>
              <p>{carData.address}</p>
            </div>
            <div className="price-form-container">
              <div className="price-items">
                <p>Đơn giá thuê : </p>
                <span>{carData.price}k/ngày</span>
              </div>
              <div className="price-items">
                <p>Phí bảo hiểm :</p>
                <span>{carData.insuranceFees} vnd/ngày</span>
              </div>
              <div className="price-items">
                <p>Số ngày thuê : </p>
                <span>{totalDays}</span>
              </div>
              <div className="price-items">
                <p>Tổng tiền :</p>
                <span>{totalPrice} VNĐ</span>
              </div>
            </div>
            <div className="rent-actions price-items">
              <button onClick={addToCart}>Thêm vào giỏ hàng</button>
              <button onClick={rentBtnClick}>Chọn thuê</button>
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
          <h3>Mô tả</h3>
          <p>
            Nếu cần tìm một chiếc xe nổi bật nhất của Hyundai thì đó phải là Hyundai Kona. Trong đó phiên bản Kona 1.6 Turbo cao cấp đang khiến các đối thủ phải dè chừng khi mang trên mình phong cách thiết kế hoàn toàn mới cùng những công nghệ hiện đại nhất mà Hyundai trang bị cho chiếc xe. Kona 1.6 Turbo với vẻ ngoài cứng cáp, mạnh mẽ thu hút mọi anh nhìn với kích thước tổng thể lần lượt dài x rộng x cao là 4.165 x 1.800 x 1.565 (mm). Cùng phong cách thiết kế hoàn toàn mới của Hyundai mang đậm phong cách thể thao nhưng vẫn giữ được vẻ thanh lịch vốn có của một chiếc SUV đô thị.
          </p>
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
              <p>{carData && carData.seats ? carData.seats : "chưa rõ"}</p>
            </div>
            <div className="car-feature-item">
              <div className="car-feature-icon-fix">
                <img src={require("../assets/img/transmission-icon.png")} alt="" />
              </div>
              <h5>Truyền động</h5>
              <p>{carData && carData.transmission ? carData.transmission : "chưa rõ"}</p>
            </div>
            <div className="car-feature-item">
              <div className="car-feature-icon-fix">
                <img src={require("../assets/img/fuel-type-icon.png")} alt="" />
              </div>
              <h5>Nhiên liệu sử dụng</h5>
              <p>{carData && carData.fuelType ? carData.fuelType : "chưa rõ"}</p>
            </div>
            <div className="car-feature-item">
              <div className="car-feature-icon-fix">
                <img src={require("../assets/img/fuel-consumption-icon.png")} alt="" />
              </div>
              <h5>Nhiêu liệu tiêu hao</h5>
              <p>{carData && carData.fuelConsumption ? carData.fuelConsumption : "chưa rõ"} lít/100km</p>
            </div>
          </div>
          <hr />

          { }
          <div className="">
            <h3>Các tiện nghi khác</h3>
            <ul className="other-amenities-list">
              <li>
                <i className={`bx bx-bluetooth`}></i> Bluetooth: {carData.BLUETOOTH === "Y" ? "Có" : "Không"}
              </li>
              <li>
                <i className={`bx bx-camera`}></i> Camera 360: {carData.CAMERA_360 === "Y" ? "Có" : "Không"}
              </li>
              <li>
                <i className={`bx bx-camera-reels`}></i> Camera Sides: {carData.CAMERA_SIDES === "Y" ? "Có" : "Không"}
              </li>
              <li>
                <i className={`bx bx-car`}></i> Camera Journey: {carData.CAMERA_JOURNEY === "Y" ? "Có" : "Không"}
              </li>
              <li>
                <i className={`bx bx-receipt`}></i> Camera Back: {carData.CAMERA_BACK === "Y" ? "Có" : "Không"}
              </li>
              <li>
                <i className={`bx bx-tire`}></i> Tire Sensor: {carData.TIRE_SENSOR === "Y" ? "Có" : "Không"}
              </li>
              <li>
                <i className={`bx bx-wind`}></i> Impact Sensor: {carData.IMPACT_SENSOR === "Y" ? "Có" : "Không"}
              </li>
              <li>
                <i className={`bx bx-speed`}></i> Speed Warning: {carData.SPEED_WARNING === "Y" ? "Có" : "Không"}
              </li>
              <li>
                <i className={`bx bx-sun`}></i> Sky Window: {carData.SKY_WINDOW === "Y" ? "Có" : "Không"}
              </li>
              <li>
                <i className={`bx bx-globe`}></i> GPS: {carData.GPS === "Y" ? "Có" : "Không"}
              </li>
              <li>
                <i className={`bx bx-child`}></i> Child Seat: {carData.CHILD_SEAT === "Y" ? "Có" : "Không"}
              </li>
              <li>
                <i className={`bx bx-usb`}></i> USB: {carData.USB === "Y" ? "Có" : "Không"}
              </li>
              <li>
                <i className={`bx bx-tire`}></i> Spare Tire: {carData.SPARE_TIRE === "Y" ? "Có" : "Không"}
              </li>
              <li>
                <i className={`bx bx-dvd`}></i> DVD: {carData.DVD === "Y" ? "Có" : "Không"}
              </li>
              <li>
                <i className={`bx bx-card`}></i> ETC: {carData.ETC === "Y" ? "Có" : "Không"}
              </li>
              <li>
                <i className={`bx bx-shield-x`}></i> Airbag: {carData.AIRBAG === "Y" ? "Có" : "Không"}
              </li>
              <li>
                <i className={`bx bx-package`}></i> Pickup Cover: {carData.PICKUP_COVER === "Y" ? "Có" : "Không"}
              </li>
            </ul>
          </div>
        </div>
        <div className="comment-section">
        </div>
      </div>
    </Layout>
  );
}

export default Detail;
