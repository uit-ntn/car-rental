import React from "react";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import useAuthentication from "../hooks/useAuthentication";

function Header() {
  const { isLoggedIn, username, login, logout } = useAuthentication();

  return (
    <div className="header">
      <div className="logo-container">
        <img src={require("../assets/img/logo.png")} alt="Car Rental Logo" />
        <Link to="/">CAR RENTAL</Link>
      </div>
      <div className="navigation">
        <Link to="/about">Về Car Rental</Link>
        <Link to="/owner/register">Trở thành chủ xe</Link>
        <div>
          {isLoggedIn ? (
            <div className="user-dropdown">
              <span className="hello-user">Xin chào {username} </span>
              <div className="dropdown-content">
                <Link to={`/account/${Cookies.get("user.id")}`}>Tài khoản</Link>
                <Link to={`/transaction-history/${Cookies.get("user.id")}`}>Lịch sử giao dịch</Link>
                <Link to={`/cart/${Cookies.get("user.id")}`}>Giỏ hàng</Link>
                <button onClick={logout}>Đăng xuất</button>
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
