import api from '../configs/api';

// Hàm xử lý lỗi chung
const handleError = (err, defaultMessage) => {
  if (err.response) {
    return err.response.data.message || defaultMessage;
  } else {
    return defaultMessage;
  }
};

// Fetch all cars
const fetchCars = async () => {
  try {
    const response = await api.get('/api/cars');
    return response.data;
  } catch (err) {
    throw handleError(err, 'Lỗi khi lấy dữ liệu xe');
  }
};

// Create a new car
const createCar = async (carData) => {
  try {
    const response = await api.post('/api/cars', carData);
    return response.data;
  } catch (err) {
    throw handleError(err, 'Lỗi khi tạo xe');
  }
};

// Get car by ID
const getCarById = async (id) => {
  try {
    const response = await api.get(`/api/cars/${id}`);
    return response.data;
  } catch (err) {
    throw handleError(err, 'Lỗi khi lấy xe theo ID');
  }
};

// Update car by ID
const updateCar = async (id, updatedData) => {
  try {
    const response = await api.put(`/api/cars/${id}`, updatedData);
    return response.data;
  } catch (err) {
    throw handleError(err, 'Lỗi khi cập nhật xe');
  }
};

// Delete car by ID
const deleteCar = async (id) => {
  try {
    await api.delete(`/api/cars/${id}`);
  } catch (err) {
    throw handleError(err, 'Lỗi khi xóa xe');
  }
};

// Get cars by status
const getCarsByStatus = async (status) => {
  try {
    const response = await api.get(`/api/cars/status/${status}`);
    return response.data;
  } catch (err) {
    throw handleError(err, 'Lỗi khi lấy xe theo trạng thái');
  }
};

// Get cars by location
const getCarsByLocation = async (location) => {
  try {
    const response = await api.get(`/api/cars/location/${location}`);
    return response.data;
  } catch (err) {
    throw handleError(err, 'Lỗi khi lấy xe theo vị trí');
  }
};

// Add a document to a car
const addDocumentToCar = async (id, documentData) => {
  try {
    const response = await api.post(`/api/cars/${id}/documents`, documentData);
    return response.data;
  } catch (err) {
    throw handleError(err, 'Lỗi khi thêm tài liệu vào xe');
  }
};

// Update car's insurance info
const updateInsuranceInfo = async (id, insuranceInfo) => {
  try {
    const response = await api.put(`/api/cars/${id}/insurance`, insuranceInfo);
    return response.data;
  } catch (err) {
    throw handleError(err, 'Lỗi khi cập nhật thông tin bảo hiểm xe');
  }
};

export {
  fetchCars,
  createCar,
  getCarById,
  updateCar,
  deleteCar,
  getCarsByStatus,
  getCarsByLocation,
  addDocumentToCar,
  updateInsuranceInfo
};
