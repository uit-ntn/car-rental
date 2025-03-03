import React, { useState } from "react";
import { forgotPassword } from "../services/authService"; // Gọi API forgotPassword
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    // Xử lý thay đổi input email
    const handleChange = (e) => {
        setEmail(e.target.value);
    };

    // Xử lý gửi yêu cầu đặt lại mật khẩu
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email) {
            toast.error("Vui lòng nhập email của bạn.");
            return;
        }

        setLoading(true);

        try {
            console.log("🔄 Đang gửi yêu cầu reset password...");
            await forgotPassword(email);
            toast.success("Vui lòng kiểm tra email của bạn để đặt lại mật khẩu! ✅");
            setEmail(""); // Reset input
        } catch (error) {
            console.error("❌ Lỗi khi gửi yêu cầu:", error);
            toast.error(`Lỗi: ${error}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <h3 className="mb-3">Quên mật khẩu</h3>
            <ToastContainer position="top-right" autoClose={3000} /> {/* Hiển thị toast */}
            <form onSubmit={handleSubmit}>
                <div className="row gy-2 overflow-hidden">
                    <div className="col-12">
                        <div className="form-floating mb-3">
                            <input
                                type="email"
                                className="form-control"
                                name="email"
                                id="email"
                                placeholder="name@example.com"
                                value={email}
                                onChange={handleChange}
                                required
                            />
                            <label htmlFor="email" className="form-label">Email</label>
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="d-grid my-3">
                            <button className="btn btn-primary btn-lg" type="submit" disabled={loading}>
                                {loading ? "Đang gửi yêu cầu..." : "Đặt lại mật khẩu"}
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default ForgotPassword;
