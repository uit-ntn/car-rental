import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { resetPassword } from "../services/authService"; // Import API đổi mật khẩu
import { ToastContainer, toast } from "react-toastify"; // Import Toast
import "react-toastify/dist/ReactToastify.css"; // Import CSS mặc định của Toastify

const ChangePassword = () => {
    const { token } = useContext(AuthContext); // Lấy token từ context
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);

    // Xử lý thay đổi input
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "oldPassword") setOldPassword(value);
        if (name === "newPassword") setNewPassword(value);
        if (name === "confirmPassword") setConfirmPassword(value);
    };

    // Xử lý đổi mật khẩu
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!oldPassword || !newPassword || !confirmPassword) {
            toast.error("Vui lòng nhập đầy đủ thông tin.");
            return;
        }
        
        if (newPassword.length < 6) {
            toast.error("Mật khẩu mới phải có ít nhất 6 ký tự.");
            return;
        }
        
        if (newPassword !== confirmPassword) {
            toast.error("Mật khẩu mới không khớp.");
            return;
        }

        setLoading(true);
        
        try {
            await resetPassword(token, newPassword);
            toast.success("Đổi mật khẩu thành công! ✅");
            setOldPassword("");
            setNewPassword("");
            setConfirmPassword("");
        } catch (error) {
            toast.error(`Lỗi: ${error}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <h3 className="mb-3">Đổi mật khẩu</h3>
            <ToastContainer position="top-right" autoClose={3000} /> {/* Hiển thị toast */}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="oldPassword" className="form-label">Mật khẩu cũ</label>
                    <input
                        type="password"
                        className="form-control"
                        id="oldPassword"
                        name="oldPassword"
                        value={oldPassword}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="newPassword" className="form-label">Mật khẩu mới</label>
                    <input
                        type="password"
                        className="form-control"
                        id="newPassword"
                        name="newPassword"
                        value={newPassword}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">Nhập lại mật khẩu mới</label>
                    <input
                        type="password"
                        className="form-control"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? "Đang đổi mật khẩu..." : "Đổi mật khẩu"}
                </button>
            </form>
        </div>
    );
};

export default ChangePassword;
