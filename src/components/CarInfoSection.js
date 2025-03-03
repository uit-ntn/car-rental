import React from "react";

const CarInfoSection = ({ car, onOpenBooking }) => {
  return (
    <div
      className="col-md-4 p-4 mt-4"
      style={{
        backgroundColor: "#f8f9fa", // Màu nền
        borderRadius: "8px", // Bo góc
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)", // Hiệu ứng bóng mờ
        border: "1px solid #ddd",
      }}
    >
      <h4 className="fw-bold text-primary mb-4 text-center">THÔNG TIN XE</h4>
      <div>
        {[ 
          { label: "Tên xe", value: car.model },
          { label: "Hãng sản xuất", value: car.make },
          { label: "Năm sản xuất", value: car.year },
          { label: "Biển số", value: car.license_plate },
          { label: "Trạng thái", value: car.status === "available" ? "Chưa có chuyến" : car.status === "rented" ? "Đã có chuyến" : "Đang bảo dưỡng" },
          { label: "Hộp số", value: car.transmission === "Automatic" ? "Tự động" : "Số sàn" },
          { label: "Vị trí", value: car.location },
          { label: "Giá thuê", value: `${car.price / 1000}K/ngày` },
        ].map((item, index) => (
          <div key={index} className="d-flex justify-content-between mb-3">
            <strong>{item.label}:</strong>
            <span>{item.value}</span>
          </div>
        ))}
      </div>

      {/* Nút hành động */}
      <div className="d-flex mt-3">
        <button className="btn btn-info w-100 me-2">
          <i className="bi bi-cart-plus"></i> Thêm vào giỏ hàng
        </button>
        <button
          className="btn btn-primary w-100"
          onClick={onOpenBooking}
        >
          <i className="bi bi-calendar-check"></i> Đặt ngay
        </button>
      </div>
    </div>
  );
};

export default CarInfoSection;
