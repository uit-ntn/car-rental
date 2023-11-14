import React from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

function Header() {
  const savedIsLoggedIn = Cookies.get("isLoggedIn");
  const savedUsername = Cookies.get("username");

  return (
    <>
      <div className="header">
        <div className="logo-container">
          <Link to="/">CAR RENTAL</Link>
        </div>
        <div className="navigation">
          <Link to="/about">Về Car Rental</Link>
          <Link to="/owner/register">Trở thành chủ xe</Link>
          <div className="line"></div>
          {savedIsLoggedIn === "true" && savedUsername ? (
            <span>Xin chào {savedUsername}</span>
          ) : (
            <>
              <Link to="/register" className="login-btn">
                Đăng ký
              </Link>
              <Link to="/login" className="login-btn">
                Đăng nhập
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Header;
