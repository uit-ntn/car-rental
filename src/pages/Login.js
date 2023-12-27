import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import "../styles/Login.css"
import UserContext from "../hooks/userProvider";

function Login() {
  const history = useNavigate();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [forgotPassword, setForgotPassword] = useState(false);
  const { userId, setUserId } = useContext(UserContext);

  useEffect(() => {
    // Nếu đã đăng nhập, chuyển hướng người dùng đến trang chính
    if (userId) {
      history("/");
    }
  }, [userId, history]);

  // const setForgotPasswordMode = (value) => {
  //   clearErrors();
  //   setForgotPassword(value);
  // };

  // const clearErrors = () => {
  //   setError("");
  // };

  const handleLoginClick = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      setError("Vui lòng nhập đầy đủ thông tin.");
      return;
    }

    // Kiểm tra xem tên người dùng có tồn tại hay không
    await fetch("http://127.0.0.1:8000/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if(data) {
          localStorage.setItem('isLoggedIn', JSON.stringify(data.data.USER_ID));
          setUserId(data.data.USER_ID);
        }
        console.log(data);})
      .catch((e) => console.log(e));
  };

  return (
    <Layout>
      <form className="login-container">
        <h2>{forgotPassword ? "Quên mật khẩu" : "Đăng nhập"}</h2>
        <div className="user-input">
          <p>Email</p>
          <input
            type="text"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
              <button onClick={handleLoginClick}>
                Đăng nhập
              </button>
              <p>{error && <span className="error-message">{error}</span>}</p>
              <div className="line"></div>
              <div className="have-an-acount">
                <h5>
                  Bạn chưa có tài khoản?{" "}
                  <span>
                    <Link className="dangky_btn" to="/register">Đăng ký ngay</Link>
                  </span>
                </h5>
              </div>
            </>
          ) : (
            <>
              <button >
                Lấy lại mật khẩu
              </button>
              <p>{error && <span className="error-message">{error}</span>}</p>
              <div className="line"></div>
              <div className="have-an-acount">
                <h5>
                  Quay lại đăng nhập?{" "}
                  <span className="back-login">
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
