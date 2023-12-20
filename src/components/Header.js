import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuthentication";
import "../styles/Header.css"

function Header() {
  const { isLoggedIn, username, userId, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="header">
      <div className="logo-container">
        <img src={require("../assets/img/logo.png")} alt="Car Rental Logo" />
        <Link to="/">CAR RENTAL</Link>
      </div>
      <div className="navigation">
        <Link to="/about">Về Car Rental</Link>
        <Link to={`/owner/register/${userId}`}>Trở thành chủ xe</Link>
        <div>
          {isLoggedIn ? (
            <div className="user-dropdown">
              <span className="hello-user">Xin chào {username} </span>
              <div className="dropdown-content">
                <Link to={`/account/${userId}`}>Tài khoản</Link>
                <Link to={`/transaction-history/${userId}`}>Lịch sử giao dịch</Link>
                <Link to={`/cart/${userId}`}>Giỏ hàng</Link>
                <button onClick={handleLogout}>Đăng xuất</button>
              </div>
            </div>
          ) : (
            <div className="user-login">
              <Link to="/register" className="login-btn">
                <button>Đăng ký</button>
              </Link>
              <Link to="/login" className="login-btn">
                <button>Đăng nhập</button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
