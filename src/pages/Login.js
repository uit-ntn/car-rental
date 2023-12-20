import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import Cookies from "js-cookie";
import { loginUser, recoverPassword, checkUsernameExists } from "../apis/authApi";
import { useAuth } from '../hooks/useAuthentication';
import "../styles/Login.css"

async function doesUserExist(username) {
  try {
    return await checkUsernameExists(username);
  } catch (error) {
    console.error("Lỗi khi kiểm tra tên người dùng:", error);
    return false;
  }
}

function Login() {
  const { isLoggedIn, login } = useAuth();
  const history = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [forgotPassword, setForgotPassword] = useState(false);

  useEffect(() => {
    // Nếu đã đăng nhập, chuyển hướng người dùng đến trang chính
    if (isLoggedIn) {
      history("/");
    }
  }, [isLoggedIn, history]);

  const setForgotPasswordMode = (value) => {
    clearErrors();
    setForgotPassword(value);
  };

  const clearErrors = () => {
    setError("");
  };

  const handleLoginClick = async (event) => {
    event.preventDefault();

    if (!username || !password) {
      setError("Vui lòng nhập đầy đủ thông tin.");
      return;
    }

    // Kiểm tra xem tên người dùng có tồn tại hay không
    const userExists = await doesUserExist(username);

    if (!userExists) {
      setError("Tên đăng nhập không tồn tại.");
      return;
    }

    const requestData = {
      username: username,
      password: password,
    };

    try {
      const isSuccess = await loginUser(requestData);

      if (isSuccess) {
        login(requestData);
        Cookies.set("isLoggedIn", "true", { expires: 1 });
        Cookies.set("username", username, { expires: 1 });
        history("/");
      } else {
        setError("Đăng nhập không thành công. Vui lòng kiểm tra lại thông tin đăng nhập.");
      }
    } catch (error) {
      setError(error.message);
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
      const recoveredPassword = await recoverPassword(recoveryData);
      alert(`Mật khẩu của bạn là: ${recoveredPassword}`);
    } catch (error) {
      setError(error.message);
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
