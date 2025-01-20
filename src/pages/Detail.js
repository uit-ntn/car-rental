import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../configs/api";
import Layout from "../layouts/Layout";
import CarImageSection from "../components/CarImageSection";
import CarInfoSection from "../components/CarInfoSection";
import BookingModal from "../components/BookingModal";

const Detail = () => {
  const { id } = useParams();
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

        <div className="row h-100">
          <CarImageSection image={car.image} alt={`${car.make} ${car.model}`} />
          <CarInfoSection car={car} onOpenBooking={() => {}} />
        </div>

        <BookingModal
          car={car}
          startDate={startDate}
          endDate={endDate}
          totalCost={totalCost}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          onClose={() => {
            setStartDate("");
            setEndDate("");
            setTotalCost(0);
          }}
          onConfirm={() => alert("Đặt xe thành công")}
        />
      </div>
    </Layout>
  );
};

export default Detail;
