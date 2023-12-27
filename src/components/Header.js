import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Header.css";
import UserContext from "../hooks/userProvider";

function Header() {
  const { userId, setUserId } = useContext(UserContext);
  const [userData, setUserData] = useState(null);

  const handleLogout = () => {
    setUserId(null);
    setUserData(null);
    localStorage.removeItem("isLoggedIn");
  };

  useEffect(() => {
    if (userId) {
      fetch(`http://127.0.0.1:8000/api/user/${userId}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setUserData(data.data);
        })
        .catch((e) => console.log(e));
    }
  }, [userId]);

  return (
    <div className="header">
      <div className="logo-container">
        <img src={require("../assets/img/logo.png")} alt="Car Rental Logo" />
        <Link to="/">CAR RENTAL</Link>
      </div>
      <div className="navigation">
        <Link to="/about">Về Car Rental</Link>
        <div>
          {userData ? (
            <div className="user-dropdown">
              <span className="hello-user">Xin chào {userData.LAST_NAME} </span>
              <div className="dropdown-content">
                <Link to={`/transaction/${userId}`}>
                  Thông tin thuê xe
                </Link>
                <Link to={`/bookmark/${userId}`}>Bookmark</Link>
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
