import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../configs/api";
import Layout from "../layouts/Layout";
import CarImageSection from "../components/CarImageSection";
import CarInfoSection from "../components/CarInfoSection";
import BookingModal from "../components/BookingModal";
import CommentList from "../components/CommentList";
import { toast } from "react-toastify";

const Detail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

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

  if (loading) return (
    <div className="loading-overlay">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
  if (error) return <p>Lỗi: {error}</p>;
  if (!car) return <p>Không tìm thấy thông tin xe.</p>;

  // Handle opening and closing the modal
  const handleCloseModal = () => setShowModal(false);
  const handleOpenBooking = () => setShowModal(true);

  return (
    <Layout>
      <div className="container mt-4">
        {/* Nút quay lại */}
        <button
          className="btn btn-secondary mb-2"
          onClick={() => navigate(-1)} // Quay lại trang trước
        >
          <i className="bi bi-arrow-left"></i> Quay lại
        </button>

        <div className="row h-100">
          <CarImageSection image={car.image} alt={`${car.make} ${car.model}`} />
          <CarInfoSection car={car} onOpenBooking={handleOpenBooking} />
        </div>

        {/* Hiển thị modal khi showModal là true */}
        {showModal && (
          <BookingModal
            car={car}
            onClose={handleCloseModal}  // Truyền hàm đóng modal
          />
        )}
        
        <CommentList car_id={id} />
      </div>

    </Layout>
  );
};

export default Detail;
