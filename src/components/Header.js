import React from "react";
function Header() {
    return (
        <>
            <div className="header">
                <div className="logo-container">
                    <p>CAR RENTAL</p>
                </div>
                <div className="navigation">
                    <a href="/about">Về Car Rental</a>
                    <a href="/owner/register">Trở thành chủ xe</a>
                    <div className="line"></div>
                    <a className="login-btn" href="/register">Đăng ký</a>
                    <a className="login-btn" href="/login">Đăng nhập</a>
                </div>
            </div>
        </>
    )
}
export default Header;