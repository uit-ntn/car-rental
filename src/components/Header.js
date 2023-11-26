import React from "react";
import { Link } from "react-router-dom";
import useAuthentication from "../hooks/useAuthentication";

function Header() {
  const { isLoggedIn, username, login, logout } = useAuthentication();

  return (
    <div className="header">
      <div className="logo-container">
        <Link to="/">CAR RENTAL</Link>
      </div>
      <div className="navigation">
        <Link to="/about">Về Car Rental</Link>
        <Link to="/owner/register">Trở thành chủ xe</Link>
        <div className="line"></div>
        <div>
          {isLoggedIn ? (
            <div className="user-dropdown">
              <span className="hello-user">Xin chào {username} </span>
              <div className="dropdown-content">
                <Link to="/account">Tài khoản</Link>
                <Link to="/transaction-history">Lịch sử giao dịch</Link>
                <button onClick={logout}>Đăng xuất</button>
              </div>
            </div>
          ) : (
            <div className="user-login">       
                <Link to="/register" className="login-btn">
                  Đăng ký
                </Link>                  
                <Link to="/login" className="login-btn">
                  Đăng nhập
                </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
