import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../configs/api";
import Layout from "../layouts/Layout";

const Detail = () => {
  const { id } = useParams(); // Get car ID from URL
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Modal state
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    const fetchCarDetails = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/api/cars/${id}`);
        setCar(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Lỗi khi tải chi tiết xe");
      } finally {
        setLoading(false);
      }
    };

    fetchCarDetails();
  }, [id]);

  // Tính tổng tiền
  const calculateTotalCost = () => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffInMs = end - start;
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24) + 1;
    const total = diffInDays * car.price;
    setTotalCost(total);
  };

  // Khi bấm tính tổng tiền
  useEffect(() => {
    if (startDate && endDate) {
      calculateTotalCost();
    }
  }, [startDate, endDate]);

  if (loading) return <p>Đang tải chi tiết xe...</p>;
  if (error) return <p>Lỗi: {error}</p>;
  if (!car) return <p>Không tìm thấy thông tin xe.</p>;

  return (
    <Layout>
      <div className="container mt-5">
        {/* Nút quay lại */}
        <button
          className="btn btn-secondary mb-4"
          onClick={() => navigate(-1)} // Quay lại trang trước
        >
          <i className="bi bi-arrow-left"></i> Quay lại
        </button>

        {/* Bố cục */}
        <div className="row h-100">
          {/* Phần hình ảnh */}
          <div className="col-md-8 d-flex align-items-center">
            <img
              src={car.image}
              alt={`${car.make} ${car.model}`}
              className="img-fluid rounded shadow-sm"
            />
          </div>

          {/* Phần chi tiết */}
          <div className="col-md-4 p-3 bg-light rounded shadow-sm">
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
                <span className="text-success fw-bold">
                  {car.price / 1000}K/ngày
                </span>
              </p>
              <p>
                <strong>Mô tả:</strong> {car.description || "Không có mô tả."}
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
              >
                <i className="bi bi-calendar-check"></i> Đặt ngay
              </button>
            </div>
          </div>
        </div>

        {/* Modal Dialog */}
        <div
          className="modal fade"
          id="bookingModal"
          tabIndex="-1"
          aria-labelledby="bookingModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="bookingModalLabel">
                  Đặt xe
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <p>
                  <strong>Tên xe:</strong> {car.model}
                </p>
                <p>
                  <strong>Hãng sản xuất:</strong> {car.make}
                </p>
                <p>
                  <strong>Giá thuê:</strong> {car.price / 1000}K/ngày
                </p>
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
                {totalCost > 0 && (
                  <p>
                    <strong>Tổng tiền:</strong>{" "}
                    <span className="text-success fw-bold">
                      {totalCost / 1000}K
                    </span>
                  </p>
                )}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Hủy
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => alert("Đặt xe thành công")}
                >
                  Xác nhận
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Detail;
