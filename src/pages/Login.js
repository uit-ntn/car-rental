import React from "react";
import "../styles/Login.css";

function Login() {
    return (
        <div className="modal-content">
            <p className="modal-header">Đăng ký</p>
            <div className="modal-input-body">
                <div className="custom-input">
                    <p>Số điện thoại</p>
                    <input type="text" name="phone-number" />
                </div>
                <div className="custom-input">
                    <p>Tên hiển thị</p>
                    <input type="text" name="display-name" />
                </div>
                <div className="custom-input">
                    <p>Mật khẩu</p>
                    <input type="password" name="password" />
                </div>
                <div className="custom-input">
                    <p>Nhập lại mật khẩu</p>
                    <input type="password" name="password" />
                </div>
            </div>
            <div className="login-note">bạn chưa là thành viên <a>Đăng ký ngay</a></div>
        </div>
    );
}

export default Login;
