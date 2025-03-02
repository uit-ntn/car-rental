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
        avt: ""
    });

    // Cập nhật dữ liệu khi `userData` thay đổi
    useEffect(() => {
        if (userData) {
            setEditedData({
                full_name: userData.full_name || "",
                email: userData.email || "",
                phone: userData.phone || "",
                address: userData.address || "",
                avt: userData.avt || "https://scontent.fsgn2-4.fna.fbcdn.net/v/t1.6435-9/116264906_340041997020888_6356968955999431305_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=-bk-vg8BuC4Q7kNvgFO_9Vs&_nc_oc=AdhboWzyeCj-pmhrZntyQpuL3tdSQmvmpDACuHGOpVKFaNEglcGb0wTwniKvWeoAz0M&_nc_zt=23&_nc_ht=scontent.fsgn2-4.fna&_nc_gid=A15lNN-JjrqQ2aWCfHw-xws&oh=00_AYCbTGVGdxBkP4STT670BXAtdOYytzo61DvLINEeWA-epA&oe=67EB930F"
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
            console.error("Lỗi cập nhật thông tin:", error);
        } finally {
            setSaving(false);
        }
    };

    // Hủy chỉnh sửa (reset về dữ liệu gốc)
    const handleCancel = () => {
        setEditedData({
            full_name: userData?.full_name || "Vui lòng cập nhật tên",
            email: userData?.email || "",
            phone: userData?.phone || "Vui lòng cập nhật số điện thoại",
            address: userData?.address || "Vui lòng cập nhật địa chỉ",
            avt: userData?.avt || "https://scontent.fsgn2-4.fna.fbcdn.net/v/t1.6435-9/116264906_340041997020888_6356968955999431305_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=-bk-vg8BuC4Q7kNvgFO_9Vs&_nc_oc=AdhboWzyeCj-pmhrZntyQpuL3tdSQmvmpDACuHGOpVKFaNEglcGb0wTwniKvWeoAz0M&_nc_zt=23&_nc_ht=scontent.fsgn2-4.fna&_nc_gid=A15lNN-JjrqQ2aWCfHw-xws&oh=00_AYCbTGVGdxBkP4STT670BXAtdOYytzo61DvLINEeWA-epA&oe=67EB930F"
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
                        className="rounded-circle border border-3 border-success"
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
