import api from "../configs/api";

// Fetch all users
const fetchUsers = async () => {
    try {
        const response = await api.get("/api/users");
        return response.data;
    } catch (err) {
        throw err.response?.data?.message || "Lỗi khi lấy dữ liệu người dùng";
    }
}

// Create a new user
const createUser = async (userData) => {
    try {
        const response = await api.post("/api/users", userData);
        return response.data;
    } catch (err) {
        throw err.response?.data?.message || "Lỗi khi tạo người dùng";
    }
}

// Get user by ID
const getUserById = async (id) => {
    try {
        const response = await api.get(`/api/users/${id}`);
        return response.data;
    } catch (err) {
        throw err.response?.data?.message || "Lỗi khi lấy người dùng theo ID";
    }
}

// Update user by ID
const updateUser = async (id, updatedData) => {
    try {
        const response = await api.put(`/api/users/${id}`, updatedData);
        return response.data;
    } catch (err) {
        throw err.response?.data?.message || "Lỗi khi cập nhật người dùng";
    }
}

// Delete user by ID
const deleteUser = async (id) => {
    try {
        await api.delete(`/api/users/${id}`);
    } catch (err) {
        throw err.response?.data?.message || "Lỗi khi xóa người dùng";
    }
}

// Get rental By User ID
const getRentalsByCustomerId = async (id) => {
    try {
        const response = await api.get(`/api/users/${id}/rentals`);
        return response.data;
    } catch (err) {
        throw err.response?.data?.message || "Lỗi khi lấy rentals theo ID người dùng";
    }
}


export {
    fetchUsers,
    createUser,
    getUserById,
    updateUser,
    deleteUser,
    getRentalsByCustomerId
};

