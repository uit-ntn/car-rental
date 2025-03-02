import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { updateUser } from "../services/userService"; // Import API updateUser
import { ToastContainer, toast } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css"; // Import CSS mặc định của Toastify

const UserInfo = () => {
    const { userData, loading, user_id, setUserData } = useContext(AuthContext); // Lấy dữ liệu từ context

    const [isEditing, setIsEditing] = useState(false);
    const [saving, setSaving] = useState(false);

    const [editedData, setEditedData] = useState({
        full_name: "",
        email: "",
        phone: "",
        address: "",
        avt: "https://via.placeholder.com/150"
    });

    // Cập nhật dữ liệu khi `userData` thay đổi
    useEffect(() => {
        if (userData) {
            setEditedData({
                full_name: userData.full_name || "",
                email: userData.email || "",
                phone: userData.phone || "",
                address: userData.address || "",
                avt: userData.avt || "https://via.placeholder.com/150"
            });
        }
    }, [userData]);

    // Nếu đang loading hoặc userData chưa có, hiển thị trạng thái loading
    if (loading || !userData) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: "300px" }}>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Đang tải dữ liệu...</span>
                </div>
                <p className="ms-2">Đang tải dữ liệu...</p>
            </div>
        );
    }

    // Hàm xử lý thay đổi input
    const handleChange = (e) => {
        setEditedData({ ...editedData, [e.target.name]: e.target.value });
    };

    // Bật chế độ chỉnh sửa
    const handleEdit = () => {
        setIsEditing(true);
    };

    // Lưu thay đổi vào server
    const handleSave = async () => {
        setSaving(true);

        try {
            const updatedUser = await updateUser(user_id, editedData);
            setUserData(updatedUser); // Cập nhật dữ liệu trong context
            setIsEditing(false);
            toast.success("Cập nhật thông tin thành công! ✅");
        } catch (error) {
            toast.error(`Lỗi: ${error}`);
        } finally {
            setSaving(false);
        }
    };

    // Hủy chỉnh sửa (reset về dữ liệu gốc)
    const handleCancel = () => {
        setEditedData({
            full_name: userData?.full_name || "",
            email: userData?.email || "",
            phone: userData?.phone || "",
            address: userData?.address || "",
            avt: userData?.avt || "https://via.placeholder.com/150"
        });
        setIsEditing(false);
    };

    return (
        <div className="row">
            <ToastContainer position="top-right" autoClose={3000} /> {/* Hiển thị toast */}

            {/* Phần avatar & thông tin cơ bản */}
            <div className="col-md-4">
                <div className="d-flex justify-content-center">
                    <img
                        src={editedData.avt}
                        alt="User Avatar"
                        className="rounded-circle"
                        width="150"
                        height="150"
                    />
                </div>
                <h5 className="text-center mt-3">{editedData.full_name}</h5>
                <p className="text-center">📍 {editedData.address}</p>
            </div>

            {/* Form chỉnh sửa thông tin */}
            <div className="col-md-8">
                <h3>Thông tin cá nhân</h3>
                <form>
                    <div className="mb-3">
                        <label htmlFor="full_name" className="form-label">Họ và Tên</label>
                        <input
                            type="text"
                            className="form-control"
                            id="full_name"
                            name="full_name"
                            value={editedData.full_name}
                            onChange={handleChange}
                            disabled={!isEditing}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            value={editedData.email}
                            onChange={handleChange}
                            disabled={!isEditing}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="phone" className="form-label">Số điện thoại</label>
                        <input
                            type="text"
                            className="form-control"
                            id="phone"
                            name="phone"
                            value={editedData.phone}
                            onChange={handleChange}
                            disabled={!isEditing}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="address" className="form-label">Địa chỉ</label>
                        <input
                            type="text"
                            className="form-control"
                            id="address"
                            name="address"
                            value={editedData.address}
                            onChange={handleChange}
                            disabled={!isEditing}
                        />
                    </div>

                    {/* Nút chức năng */}
                    {!isEditing ? (
                        <button type="button" className="btn btn-warning" onClick={handleEdit}>Chỉnh sửa</button>
                    ) : (
                        <>
                            <button
                                type="button"
                                className="btn btn-success me-2"
                                onClick={handleSave}
                                disabled={saving}
                            >
                                {saving ? "Đang lưu..." : "Lưu"}
                            </button>
                            <button type="button" className="btn btn-secondary" onClick={handleCancel}>Hủy</button>
                        </>
                    )}
                </form>
            </div>
        </div>
    );
};

export default UserInfo;
