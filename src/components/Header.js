import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  useEffect(() => {
    const savedIsLoggedIn = Cookies.get("isLoggedIn");
    const savedUsername = Cookies.get("username");

    if (savedIsLoggedIn === "true" && savedUsername) {
      setIsLoggedIn(true);
      setUsername(savedUsername);
    } else {
      setIsLoggedIn(false);
      setUsername("");
    }
  }, []);

  const handleLogout = () => {
    Cookies.remove("isLoggedIn");
    Cookies.remove("username");
    setIsLoggedIn(false);
    setUsername("");
  };

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
          {isLoggedIn ? (
            <div>
              <div className="user-dropdown">
                <span className="hello-user">Xin chào {username} </span>
                <div className="dropdown-content">
                  <Link to="/account">Tài khoản</Link>
                  <Link to="/transaction-history">Lịch sử giao dịch</Link>
                  <button onClick={handleLogout}>Đăng xuất</button>
                </div>
              </div>
            </div>
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
