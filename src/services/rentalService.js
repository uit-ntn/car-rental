import api from '../configs/api';

// Fetch all rentals
const fetchRentals = async () => {
  try {
    const response = await api.get("/api/rentals");
    return response.data;
  } catch (err) {
    throw err.response?.data?.message || "Lỗi khi lấy dữ liệu rentals";
  }
};

// Create a new rental
const createRental = async (rentalData) => {
  try {
    const response = await api.post("/api/rentals", rentalData);
    return response.data;
  } catch (err) {
    throw err.response?.data?.message || "Lỗi khi tạo rental";
  }
};

// Get rental by ID
const getRentalById = async (id) => {
  try {
    const response = await api.get(`/api/rentals/${id}`);
    return response.data;
  } catch (err) {
    throw err.response?.data?.message || "Lỗi khi lấy rental theo ID";
  }
};

// Update rental by ID
const updateRental = async (id, updatedData) => {
  try {
    const response = await api.put(`/api/rentals/${id}`, updatedData);
    return response.data;
  } catch (err) {
    throw err.response?.data?.message || "Lỗi khi cập nhật rental";
  }
};

// Delete rental by ID
const deleteRental = async (id) => {
  try {
    await api.delete(`/api/rentals/${id}`);
  } catch (err) {
    throw err.response?.data?.message || "Lỗi khi xóa rental";
  }
};

// Update status rental
const updateRentalStatus = async (id, status) => {
  try {
    const response = await api.put(`/api/rentals/${id}/status`, { status });
    return response.data;
  } catch (err) {
    throw err.response?.data?.message || "Lỗi khi cập nhật trạng thái rental";
  }
};


export {
  fetchRentals,
  createRental,
  getRentalById,
  updateRental,
  deleteRental,
  updateRentalStatus
};
