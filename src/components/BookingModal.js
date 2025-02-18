import React, { useState } from "react";
import { toast } from "react-toastify";

const BookingModal = ({ car, onClose }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [totalDays, setTotalDays] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
    calculateTotal();
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
    calculateTotal();
  };

  const calculateTotal = () => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const diffTime = Math.abs(end - start);
      const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Tính số ngày

      if (days > 0) {
        setTotalDays(days); // Nếu ngày hợp lệ
        setTotalPrice(days * car.price); // Tính thành tiền
      } else {
        setTotalDays(0); // Nếu ngày không hợp lệ, đặt lại
        setTotalPrice(0); // Đặt lại thành tiền
      }
    }
  };

  const handleBookNow = () => {
    toast.success("Đặt xe thành công!");
    onClose(); // Đóng modal sau khi đặt
    setTimeout(() => {
      toast.success("Thông báo đặt xe đã được gửi!");
    }, 1000); // Toast sau 1s
  };

  // Hàm định dạng số với dấu chấm
  const formatNumber = (number) => {
    return new Intl.NumberFormat("vi-VN").format(number);
  };

  return (
    <>
      <div className="modal show" style={{ display: "block" }} tabIndex="-1" aria-labelledby="bookingModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header bg-primary text-white">
              <h5 className="text-center fw-bold" id="bookingModalLabel">HỢP ĐỒNG THUÊ XE</h5>
              <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {/* Thông tin khách hàng */}
              <div className="mb-4 p-3 border border-dark rounded shadow-sm">
                <h5 className="text-center fw-bold mb-4">THÔNG TIN KHÁCH HÀNG</h5>
                <div className="row mb-3">
                  <div className="col">
                    <strong>Họ và tên:</strong>
                    <input type="text" className="form-control border border-secondary" />
                  </div>
                  <div className="col">
                    <strong>Số điện thoại:</strong>
                    <input type="text" className="form-control border border-secondary" />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col">
                    <strong>Email:</strong>
                    <input type="email" className="form-control border border-secondary" />
                  </div>
                </div>
              </div>

              {/* Thông tin xe */}
              <div className="mb-4 p-3 border border-dark rounded shadow-sm">
                <h5 className="text-center fw-bold mb-4">THÔNG TIN XE</h5>
                <div className="row mb-3">
                  <div className="col">
                    <strong>Tên xe:</strong>
                    <span>{car.model} ({car.make})</span>
                  </div>
                  <div className="col">
                    <strong>Giá thuê:</strong>
                    <span>{formatNumber(car.price)} VND/ngày</span>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col">
                    <strong>Biển số:</strong>
                    <span>{car.license_plate}</span>
                  </div>
                  <div className="col">
                    <strong>Vị trí:</strong>
                    <span>{car.location}</span>
                  </div>
                </div>
                {/* Thêm các thông tin chi tiết xe */}
                <div className="row mb-3">
                  <div className="col">
                    <strong>Năm sản xuất:</strong>
                    <span>{car.year}</span>
                  </div>
                  <div className="col">
                    <strong>Trạng thái:</strong>
                    <span>{car.status === "available" ? "Chưa có chuyến" : car.status === "rented" ? "Đã có chuyến" : "Đang bảo dưỡng"}</span>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col">
                    <strong>Hộp số:</strong>
                    <span>{car.transmission === "Automatic" ? "Tự động" : "Số sàn"}</span>
                  </div>
                  <div className="col">
                    <strong>Công ty bảo hiểm:</strong>
                    <span>{car.insurance_info.company}</span>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col">
                    <strong>Mã hợp đồng:</strong>
                    <span>{car.insurance_info.policy_number}</span>
                  </div>
                  <div className="col">
                    <strong>Ngày hết hạn bảo hiểm:</strong>
                    <span>{new Date(car.insurance_info.expiration_date).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              {/* Section Rent */}
              <div className="mb-4 p-3 border border-dark rounded shadow-sm">
                <h5 className="text-center fw-bold mb-4">THÔNG TIN THUÊ</h5>
                <div className="row mb-3">
                  <div className="col">
                    <strong>Ngày bắt đầu:</strong>
                    <input
                      type="date"
                      value={startDate}
                      onChange={handleStartDateChange}
                      className="form-control border border-secondary"
                    />
                  </div>
                  <div className="col">
                    <strong>Ngày kết thúc:</strong>
                    <input
                      type="date"
                      value={endDate}
                      onChange={handleEndDateChange}
                      className="form-control border border-secondary"
                    />
                  </div>
                </div>


                <div className="row mb-3">
                  <div className="col">
                    <strong>Tổng số ngày:</strong>
                  </div>
                  <div className="col">
                    <span>{totalDays}</span>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col">
                    <strong>Thành tiền:</strong>
                  </div>
                  <div className="col">
                    <span>{formatNumber(totalPrice)} VND</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Đóng
              </button>
              <button type="button" className="btn btn-warning">
                Thêm vào giỏ hàng
              </button>
              <button type="button" className="btn btn-primary" onClick={handleBookNow}>
                Đặt ngay
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="modal-backdrop fade show" style={{ zIndex: 1040 }}></div>
    </>
  );
};

export default BookingModal;
