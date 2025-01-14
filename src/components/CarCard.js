import React from "react";

const CarCard = ({ car }) => {
  return (
    <div className="col-md-3 col-sm-6 mb-3">
      <div
        className="card h-100 shadow-sm border-0 rounded"
        style={{ fontSize: "14px" }}
      >
        {/* Image Section */}
        <div
          className="position-relative"
          style={{
            height: "180px",
            width: "100%",
            backgroundColor: "#f8f9fa",
            overflow: "hidden",
            borderRadius: "10px 10px 0 0",
            border: "1px solid #e1e4e8",
          }}
        >
          <img
            src={car.image}
            className="card-img-top"
            alt={`${car.make} ${car.model}`}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>

        {/* Card Body */}
        <div className="card-body p-2"> {/* Giảm padding */}
          {/* Transmission Badge */}
          <span
            className={`badge ${
              car.transmission === "Automatic" ? "bg-success" : "bg-secondary"
            } text-light mb-2`}
          >
            <i
              className={`bi ${
                car.transmission === "Automatic"
                  ? "bi-gear-wide-connected"
                  : "bi-gear"
              } me-1`}
            ></i>
            {car.transmission === "Automatic" ? "Tự động" : "Số sàn"}
          </span>

          {/* Title: Make + Model + Year */}
          <p
            className="card-title fw-bold text-uppercase text-primary mb-2"
            style={{ fontSize: "14px" }}
          >
            <i className="bi bi-car-front-fill me-1"></i>
            {car.make} {car.model} {car.year}
          </p>

          {/* Car Details */}
          <ul className="list-group list-group-flush">
            <li
              className="list-group-item d-flex justify-content-between align-items-center py-1"
              style={{ fontSize: "13px" }}
            >
              <span className="fw-bold">Vị trí:</span>
              <span>{car.location}</span>
            </li>
            <li
              className="list-group-item d-flex justify-content-between align-items-center py-1"
              style={{ fontSize: "13px" }}
            >
              <span className="fw-bold">Trạng thái:</span>
              <span>
                {car.status === "available"
                  ? "Chưa có chuyến"
                  : car.status === "rented"
                  ? "Đã có chuyến"
                  : "Đang bảo dưỡng"}
              </span>
            </li>
            <li
              className="list-group-item d-flex justify-content-between align-items-center py-1"
              style={{ fontSize: "13px" }}
            >
              <span className="fw-bold">Giá thuê:</span>
              <span className="text-success fw-bold">
                {car.price / 1000 || "N/A"}K/ngày
              </span>
            </li>
          </ul>

          {/* Action Buttons */}
          <div className="text-center mt-2">
            <button
              className="btn btn-info btn-sm"
              style={{ fontSize: "13px", padding: "3px 10px" }}
            >
              <i className="bi bi-info-circle"></i> Xem chi tiết
            </button>
            <button
              className="btn btn-warning btn-sm ms-2"
              style={{ fontSize: "13px", padding: "3px 10px" }}
            >
              <i className="bi bi-chat-left-text"></i> Thêm vào giỏ hàng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
