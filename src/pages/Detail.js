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

  if (loading) return <p>Đang tải chi tiết xe...</p>;
  if (error) return <p>Lỗi: {error}</p>;
  if (!car) return <p>Không tìm thấy thông tin xe.</p>;

  return (
    <Layout>
      <div className="container mt-5">
        <button
          className="btn btn-secondary mb-4"
          onClick={() => navigate(-1)} // Go back to the previous page
        >
          <i className="bi bi-arrow-left"></i> Quay lại
        </button>

        <div className="row">
          {/* Image Section */}
          <div className="col-md-6">
            <img
              src={car.image}
              alt={`${car.make} ${car.model}`}
              className="img-fluid rounded shadow-sm"
              style={{ width: "100%", height: "auto" }}
            />
          </div>

          {/* Details Section */}
          <div className="col-md-6">
            <h3 className="fw-bold text-primary mb-3">
              {car.make} {car.model} {car.year}
            </h3>
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
              <strong>Hộp số:</strong>{" "}
              {car.transmission === "Automatic" ? "Tự động" : "Số sàn"}
            </p>
            <p>
              <strong>Mô tả:</strong> {car.description || "Không có mô tả."}
            </p>

            {/* Action Buttons */}
            <div className="d-flex mt-3">
              <button className="btn btn-info me-2">
                <i className="bi bi-cart-plus"></i> Thêm vào giỏ hàng
              </button>
              <button className="btn btn-primary">
                <i className="bi bi-calendar-check"></i> Đặt ngay
              </button>
            </div>
          </div>
        </div>

        {/* Documents or Additional Information */}
        <div className="row mt-5">
          <div className="col-md-12">
            <h4 className="fw-bold">Tài liệu đính kèm</h4>
            <ul>
              {car.documents && car.documents.length > 0 ? (
                car.documents.map((doc, index) => (
                  <li key={index}>
                    {doc.name}: <a href={doc.link}>Tải xuống</a>
                  </li>
                ))
              ) : (
                <p>Không có tài liệu đính kèm.</p>
              )}
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Detail;
