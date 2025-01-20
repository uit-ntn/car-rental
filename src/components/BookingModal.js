import React from "react";

const BookingModal = ({
  car,
  startDate,
  endDate,
  totalCost,
  setStartDate,
  setEndDate,
  onClose,
  onConfirm,
}) => {
  const calculateDays = () => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffInMs = end - start;
    return diffInMs / (1000 * 60 * 60 * 24) + 1;
  };

  const totalDays = startDate && endDate ? calculateDays() : 0;

  return (
    <div
      className="modal fade"
      id="bookingModal"
      tabIndex="-1"
      aria-labelledby="bookingModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header border-bottom-0">
            <h5 className="modal-title" id="bookingModalLabel">
              Đặt xe
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <div className="d-flex justify-content-between">
                <strong>Tên xe:</strong> <span>{car.model}</span>
              </div>
              <div className="d-flex justify-content-between">
                <strong>Hãng sản xuất:</strong> <span>{car.make}</span>
              </div>
              <div className="d-flex justify-content-between">
                <strong>Năm sản xuất:</strong> <span>{car.year}</span>
              </div>
              <div className="d-flex justify-content-between">
                <strong>Biển số:</strong> <span>{car.license_plate}</span>
              </div>
              <div className="d-flex justify-content-between">
                <strong>Vị trí:</strong> <span>{car.location}</span>
              </div>
              <div className="d-flex justify-content-between">
                <strong>Giá thuê:</strong>{" "}
                <span className="text-success">{car.price / 1000}K/ngày</span>
              </div>
              <div className="d-flex justify-content-between">
                <strong>Hộp số:</strong>{" "}
                <span>{car.transmission === "Automatic" ? "Tự động" : "Số sàn"}</span>
              </div>
              <div className="d-flex justify-content-between">
                <strong>Công ty bảo hiểm:</strong>{" "}
                <span>{car.insurance_info.company}</span>
              </div>
              <div className="d-flex justify-content-between">
                <strong>Mã hợp đồng:</strong>{" "}
                <span>{car.insurance_info.policy_number}</span>
              </div>
              <div className="d-flex justify-content-between">
                <strong>Ngày hết hạn:</strong>{" "}
                <span>
                  {new Date(car.insurance_info.expiration_date).toLocaleDateString()}
                </span>
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="startDate" className="form-label">
                Ngày bắt đầu:
              </label>
              <input
                type="date"
                id="startDate"
                className="form-control"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="endDate" className="form-label">
                Ngày kết thúc:
              </label>
              <input
                type="date"
                id="endDate"
                className="form-control"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>

            {totalDays > 0 && (
              <div className="mb-3">
                <div className="d-flex justify-content-between">
                  <strong>Tổng số ngày:</strong> <span>{totalDays} ngày</span>
                </div>
                <div className="d-flex justify-content-between">
                  <strong>Tổng cộng:</strong>{" "}
                  <span>{totalCost / 1000}K</span>
                </div>
                <div className="d-flex justify-content-between">
                  <strong>Chương trình giảm giá:</strong>
                  <span className="text-danger">-120.000đ</span>
                </div>
                <div className="d-flex justify-content-between">
                  <strong>Thành tiền:</strong>{" "}
                  <span className="text-success fw-bold">{(totalCost - 120000) / 1000}K</span>
                </div>
              </div>
            )}
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={onClose}
            >
              Hủy
            </button>
            <button type="button" className="btn btn-warning" onClick={onConfirm}>
              Chọn thuê
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
