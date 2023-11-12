import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import Cookies from "js-cookie";
import "../styles/Login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const apiLogin = "https://6539dce6e3b530c8d9e8c413.mockapi.io/car-rental/user";
  const history = useNavigate();

  const handleLoginClick = async (event) => {
    event.preventDefault();
    if (!username || !password) {
      setError("Vui lòng nhập đầy đủ thông tin.");
      return;
    }

    const requestData = {
      username: username,
      password: password,
    };

    try {
      const response = await fetch(apiLogin, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        // Đăng nhập thành công, lưu thông tin đăng nhập vào cookie
        Cookies.set("isLoggedIn", "true", { expires: 1 });
        Cookies.set("username", username, { expires: 1 });
        history.goBack(); // quay về trang trước đó
      } else {
        setError("Lỗi đăng nhập. Vui lòng kiểm tra tên đăng nhập và mật khẩu.");
        console.log(error);
      }
    } catch (error) {
      setError("Lỗi kết nối: " + error.message);
    }
  };

  return (
    <Layout>
      <form className="login-container">
        <h2>Đăng nhập</h2>
        <div className="user-input">
          <p>Tên đăng nhập</p>
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="password-input">
          <p>Mật khẩu</p>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="line"></div>
        <div className="handle-login-input">
          <button onClick={handleLoginClick}>Đăng nhập</button>
          <p>
            {error && <span className="error-message">{error}</span>}
          </p>
          <div className="">
            <h5>
              Bạn chưa có tài khoản?{" "}
              <span>
                <Link to="/register">Đăng ký ngay</Link>
              </span>
            </h5>
          </div>
        </div>
      </form>
    </Layout>
  );
}

export default Login;
