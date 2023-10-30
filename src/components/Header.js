import React from "react";
import { Link } from "react-router-dom";
function Header() {
    return (
        <>
            <div className="header">
                <div className="logo-container">
                    <a href="/">CAR RENTAL</a>
                </div>
                <div className="navigation">
                    <Link to="/about">Về Car Rental</Link>
                    <Link to="/owner/register">Trở thành chủ xe</Link>
                    <div className="line"></div>
                    <Link to="/register" className="login-btn">Đăng ký</Link>
                    <Link to="/login" className="login-btn">Đăng nhập</Link>
                </div>
            </div>
        </>
    )
}
export default Header;
