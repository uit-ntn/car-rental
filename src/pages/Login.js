import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import "../styles/Login.css";
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

  const handleLoginClick = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      setError("Vui lòng nhập đầy đủ thông tin.");
      return;
    }

    // Kiểm tra xem tên người dùng có tồn tại hay không
    await fetch("http://127.0.0.1:8000/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          localStorage.setItem('isLoggedIn', JSON.stringify(data.data.USER_ID));
          setUserId(data.data.USER_ID);
        }
        console.log(data);
      })
      .catch((e) => console.log(e));
  };

  return (
    <Layout>
      <form className="login-container">
        <h2>{forgotPassword ? "Quên mật khẩu" : "Đăng nhập"}</h2>
        <div className="form-group">
          <label>Email</label>
          <input
            type="text"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
          />
        </div>
        {!forgotPassword && (
          <div className="form-group">
            <label>Mật khẩu</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
            />
          </div>
        )}
        <div className="handle-login-input">
          {!forgotPassword ? (
            <>
              <button className="btn btn-primary" onClick={handleLoginClick}>
                Đăng nhập
              </button>
              <p>{error && <span className="error-message">{error}</span>}</p>
              <div className="line"></div>
              <div className="have-an-account">
                <h5>
                  Bạn chưa có tài khoản?{" "}
                  <span>
                    <Link className="btn btn-link dangky-btn" to="/register">Đăng ký ngay</Link>
                  </span>
                </h5>
              </div>
            </>
          ) : (
            <>
              <button className="btn btn-primary" disabled>
                Lấy lại mật khẩu
              </button>
              <p>{error && <span className="error-message">{error}</span>}</p>
              <div className="line"></div>
              <div className="have-an-account">
                <h5>
                  Quay lại đăng nhập?{" "}
                  <span className="back-login">
                    <Link to="/login" className="btn btn-link">Đăng nhập</Link>
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
