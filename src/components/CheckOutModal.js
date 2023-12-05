import React, { useState } from "react";
import "../styles/CheckOutModal.css";

function CheckOutModal({ carData, startDate, endDate, totalDays, totalPrice, onClose }) {
  const [paymentMethod, setPaymentMethod] = useState("truc-tiep");
  const [cardNumber, setCardNumber] = useState("");
  const [promoCode, setPromoCode] = useState("");


  const handleRentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleCardNumberChange = (e) => {
    setCardNumber(e.target.value);
  };

  const handleRent = () => {
    console.log("Payment details:", { paymentMethod, cardNumber });
    onClose();
  };

  return (
    <div className="checkout-modal-overlay">
      <form className="checkout-modal-content">
        <h2 className="checkout-modal-title">Hóa đơn</h2>

        {/*Car-info*/}
        <div className="checkout-modal-section">
          <h3>Thông tin xe</h3>
          {carData && (
            <div className="checkout-car-info">
              <div className="checkout-modal-item">
                <p>Tên xe
                </p>
                <span>
                  {carData.name}
                </span>
              </div>
              <div className="checkout-modal-item">
                <p>Số ghế</p>
                <span>
                  {carData.seats}
                </span>
              </div>
              <div className="checkout-modal-item">
                <p>Nhiên liệu sử dụng</p>
                <span>
                  {carData.fuelType}
                </span>
              </div>

              <div className="checkout-modal-item">
                <p>Địa điểm nhận xe</p>
                <span>
                  {carData.address}
                </span>
              </div>
            </div>
          )}
        </div>

        {/*transaction info*/}
        <div className="checkout-modal-section">
          <h3>Thông tin giao dịch</h3>
          <div className="checkout-transaction-details">
            <div className="checkout-modal-item">
              <p>Ngày thuê</p>
              <span>
                {startDate}
              </span>
            </div>
            <div className="checkout-modal-item">
              <p>Ngày trả</p>
              <span>
                {endDate}
              </span>
            </div>
            <div className="checkout-modal-item">
              <p>Giá thuê</p>
              <span>
                {carData.price}k vnd/ngày
              </span>
            </div>
            <div className="checkout-modal-item">
              <p>Phí bảo hiểm</p>
              <span>
                {carData.insuranceFees} đ
              </span>
            </div>
            <div className="checkout-modal-item">
              <p>Số ngày thuê</p>
              <span>
                {totalDays} ngày
              </span>
            </div>
            <div className="checkout-modal-item">
              <p>Mã khuyến mãi nếu có</p>
              <span>
                <input
                  type="text"
                  name=""
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)} placeholder="Nhập mã khuyến mãi">
                </input>
              </span>
            </div>
            <div className="checkout-modal-item">
              <p>Mã khuyến mãi giảm cho bạn {promoCode > 0 && promoCode <100 ? promoCode : 0} %</p>
              <span> {promoCode > 0 && promoCode < 100 ? `${totalPrice * promoCode / 100}  đ` : `0 đ`} </span>
            </div>
            <div className="checkout-modal-item">
              <p>Tổng tiền</p>
              <span>
                {totalPrice - (promoCode > 0 && promoCode <100 ? promoCode / 100 * totalPrice : 0)} vnd
              </span>
            </div>
          </div>
        </div>

        {/*payment method section*/}
        <div className="checkout-payment-method">
          <h3>Phương thức thanh toán</h3>
          <div>
            <div className="checkout-modal-item">
              <p>Chọn phương thức thanh toán</p>
              <select className="payment-method-select" onChange={handleRentMethodChange} value={paymentMethod}>
                <option value="truc-tiep">Trực tiếp</option>
                <option value="chuyen-khoan">Chuyển khoản</option>
              </select>
            </div>
            {paymentMethod === "truc-tiep" && (
              <div className="payment-option">
                <div className="payment-notify">
                  <p>Sẽ thanh toán khi nhận xe</p>
                </div>
              </div>
            )}
            {paymentMethod === "chuyen-khoan" && (
              <div className="payment-option-box">
                <div className="payment-option">
                  <p>Chọn ngân hàng</p>
                  <div>
                    <select>
                      <option>BIDV</option>
                      <option>SCB</option>
                      <option>HD Bank</option>
                      <option>Sacombank</option>
                      <option>Vietcombank</option>
                      <option>Agribank</option>
                      {/* Thêm nữa nếu muốn ^^ */}
                    </select>
                  </div>
                </div>
                <div className="payment-cardnumber-input">
                  <p>Nhập số thẻ</p>
                  <input type="text" value={cardNumber} onChange={handleCardNumberChange} />
                </div>
              </div>
            )}
          </div>
        </div>

        {/*checkout actions section*/}
        <div className="checkout-actions">
          <button className="pay-button" onClick={handleRent}>
            Thuê
          </button>
          <button className="close-button" onClick={onClose}>
            Đóng
          </button>
        </div>
      </form>
    </div>
  );
}

export default CheckOutModal;
