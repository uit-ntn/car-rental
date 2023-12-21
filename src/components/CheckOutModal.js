import React, { useContext, useState } from "react";
import "../styles/CheckOutModal.css";
import UserContext from "../hooks/userProvider";

function CheckOutModal({
  carData,
  startDate,
  endDate,
  totalDays,
  totalPrice,
  onClose,
}) {
  const [paymentMethod, setPaymentMethod] = useState("truc-tiep");
  const [promoCode, setPromoCode] = useState("");
  const [inputPromoCode, setInputPromoCode] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const { userId } = useContext(UserContext);

  const handleRentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleRent = async (e) => {
    e.preventDefault();
    await fetch("http://127.0.0.1:8000/api/contract", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        USER_ID: userId,
        LICENSE_PLATE: carData.LICENSE_PLATE,
        START_DATE: new Date(startDate),
        END_DATE: new Date(endDate),
        DEPOSIT_STATUS: "Y",
        RETURN_STATUS: "N",
        PRICE: totalPrice - (promoCode === "uit" ? (10 / 100) * totalPrice : 0),
        SERVICE_FEE: carData.SERVICE_C,
        INSURANCE_FEE: carData.INSURANCE_C,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if(data.exception) {
          alert(data.exception);
        }
        else alert("Thuê xe thành công!")
      })
      .catch((e) => alert(e.message));
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
                <p>Tên xe</p>
                <span>{carData.NAME}</span>
              </div>
              <div className="checkout-modal-item">
                <p>Số ghế</p>
                <span>{carData.SEAT}</span>
              </div>
              <div className="checkout-modal-item">
                <p>Nhiên liệu sử dụng</p>
                <span>{carData.FUEL}</span>
              </div>

              <div className="checkout-modal-item">
                <p>Địa điểm nhận xe</p>
                <span>{carData.LOCATION}</span>
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
              <span>{startDate}</span>
            </div>
            <div className="checkout-modal-item">
              <p>Ngày trả</p>
              <span>{endDate}</span>
            </div>
            <div className="checkout-modal-item">
              <p>Giá thuê</p>
              <span>{carData.PRICE_C?.toLocaleString()} vnd/ngày</span>
            </div>
            <div className="checkout-modal-item">
              <p>Phí bảo hiểm</p>
              <span>{carData.INSURANCE_C?.toLocaleString()} đ</span>
            </div>
            <div className="checkout-modal-item">
              <p>Số ngày thuê</p>
              <span>{totalDays} ngày</span>
            </div>
            <div className="checkout-modal-item">
              <p>Mã khuyến mãi nếu có</p>
              <span>
                <input
                  type="text"
                  name=""
                  value={inputPromoCode}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setPromoCode(e.target.value);
                      e.preventDefault();
                    }
                  }}
                  onChange={(e) => setInputPromoCode(e.target.value)}
                  placeholder="Nhập mã khuyến mãi"
                ></input>
              </span>
            </div>
            <div className="checkout-modal-item">
              <p>
                Mã khuyến mãi giảm cho bạn {promoCode === "uit" ? promoCode : 0}
              </p>
              <span>
                {" "}
                {(promoCode === "uit"
                  ? (10 / 100) * totalPrice
                  : 0
                ).toLocaleString()}{" "}
                vnd
              </span>
            </div>
            <div className="checkout-modal-item">
              <p>Tổng tiền</p>
              <span>
                {(
                  totalPrice -
                  (promoCode === "uit" ? (10 / 100) * totalPrice : 0)
                )?.toLocaleString()}{" "}
                vnd
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
              <select
                className="payment-method-select"
                onChange={handleRentMethodChange}
                value={paymentMethod}
              >
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
                    </select>
                  </div>
                </div>
                <div className="payment-cardnumber-input">
                  <p>Nhập số thẻ</p>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => {
                      setCardNumber(e.target.value);
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/*checkout actions section*/}
        <div className="checkout-actions">
          <button className="checkout_btn" onClick={handleRent}>
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
