import React from "react";

const CarInfoSection = ({ car, onOpenBooking }) => {
  return (
    <div
      className="col-md-4 p-4"
      style={{
        backgroundColor: "#f8f9fa", // Màu nền
        borderRadius: "8px", // Bo góc
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)", // Hiệu ứng bóng mờ
      }}
    >
      <h4 className="fw-bold text-primary mb-4">Thông tin xe</h4>
      <div>
        <p>
          <strong>Tên xe:</strong> {car.model}
        </p>
        <p>
          <strong>Hãng sản xuất:</strong> {car.make}
        </p>
        <p>
          <strong>Năm sản xuất:</strong> {car.year}
        </p>
        <p>
          <strong>Biển số:</strong> {car.license_plate}
        </p>
        <p>
          <strong>Trạng thái:</strong>{" "}
          {car.status === "available"
            ? "Chưa có chuyến"
            : car.status === "rented"
            ? "Đã có chuyến"
            : "Đang bảo dưỡng"}
        </p>
        <p>
          <strong>Vị trí:</strong> {car.location}
        </p>
        <p>
          <strong>Giá thuê:</strong>{" "}
          <span className="text-success fw-bold">{car.price / 1000}K/ngày</span>
        </p>
        <p>
          <strong>Hộp số:</strong>{" "}
          {car.transmission === "Automatic" ? "Tự động" : "Số sàn"}
        </p>
        <p>
          <strong>Công ty bảo hiểm:</strong> {car.insurance_info.company}
        </p>
        <p>
          <strong>Mã hợp đồng:</strong> {car.insurance_info.policy_number}
        </p>
        <p>
          <strong>Ngày hết hạn bảo hiểm:</strong>{" "}
          {new Date(car.insurance_info.expiration_date).toLocaleDateString()}
        </p>
      </div>

      {/* Nút hành động */}
      <div className="d-flex mt-3">
        <button className="btn btn-info me-2">
          <i className="bi bi-cart-plus"></i> Thêm vào giỏ hàng
        </button>
        <button
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#bookingModal"
          onClick={onOpenBooking}
        >
          <i className="bi bi-calendar-check"></i> Đặt ngay
        </button>
      </div>
    </div>
  );
};

export default CarInfoSection;
