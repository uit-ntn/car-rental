import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import Cookies from "js-cookie";
import "../styles/Login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [forgotPassword, setForgotPassword] = useState(false);
  const setForgotPasswordMode = (value) => {
    clearErrors(); // Clear errors when switching between modes
    setForgotPassword(value);
  };
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
        Cookies.set("isLoggedIn", "true", { expires: 1 });
        Cookies.set("username", username, { expires: 1 });
        history(-1);
      } else {
        setError("Lỗi đăng nhập. Vui lòng kiểm tra tên đăng nhập và mật khẩu.");
        console.log(error);
      }
    } catch (error) {
      setError("Lỗi kết nối: " + error.message);
    }
  };

  const handlePasswordRecovery = async (event) => {
    event.preventDefault();
    if (!email) {
      setError("Vui lòng nhập địa chỉ email.");
      return;
    }
  
    const recoveryData = {
      email: email,
    };
  
    try {
      const response = await fetch("https://6539dce6e3b530c8d9e8c413.mockapi.io/car-rental/recover-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(recoveryData),
      });
  
      if (response.ok) {
        const recoveredPassword = await response.json();
        alert(`Mật khẩu của bạn là: ${recoveredPassword.password}`);
      } else {
        setError("Lỗi yêu cầu lấy lại mật khẩu. Vui lòng thử lại.");
        console.log(error);
      }
    } catch (error) {
      setError("Lỗi kết nối: " + error.message);
    }
  };
  

  return (
    <Layout>
      <form className="login-container">
        <h2>{forgotPassword ? "Quên mật khẩu" : "Đăng nhập"}</h2>
        <div className="user-input">
          <p>Tên đăng nhập</p>
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        {forgotPassword && (
          <div className="user-input">
            <p>Email</p>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        )}
        {!forgotPassword && (
          <div className="password-input">
            <p>Mật khẩu</p>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        )}
        <div className="handle-login-input">
          {!forgotPassword ? (
            <>
              <button onClick={handleLoginClick} onMouseEnter={clearErrors}>
                Đăng nhập
              </button>
              <p>{error && <span className="error-message">{error}</span>}</p>
              <div className="line"></div>
              <div className="have-an-acount">
                <h5>
                  Bạn chưa có tài khoản?{" "}
                  <span>
                    <Link to="/register">Đăng ký ngay</Link>
                  </span>
                </h5>
                  <p className="forgot-password" onClick={() => setForgotPasswordMode(true)}>
                    Quên mật khẩu?
                  </p>
              </div>
            </>
          ) : (
            <>
              <button onClick={handlePasswordRecovery} onMouseEnter={clearErrors}>
                Lấy lại mật khẩu
              </button>
              <p>{error && <span className="error-message">{error}</span>}</p>
              <div className="line"></div>
              <div className="have-an-acount">
                <h5>
                  Quay lại đăng nhập?{" "}
                  <span className="back-login" onClick={() => setForgotPasswordMode(false)}>
                    Đăng nhập
                  </span>
                </h5>
              </div>
            </>
          )}
        </div>
      </form>
    </Layout>
  );
}

export default Login;
