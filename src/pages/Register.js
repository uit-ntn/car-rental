import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

import "../styles/Register.css";
import UserContext from "../hooks/userProvider";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreedToPolicy, setAgreedToPolicy] = useState(false);
  const navigate = useNavigate();
  const { userId, setUserId } = useContext(UserContext);

  useEffect(() => {
    // Nếu đã đăng nhập, chuyển hướng người dùng đến trang chính
    if (userId) {
      navigate("/");
    }
  }, [userId, navigate]);

  const handleRegister = async () => {
    if (!agreedToPolicy) {
      alert("Bạn phải đồng ý với chính sách của chúng tôi để đăng ký.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Xác nhận mật khẩu không khớp.");
      return;
    }

    await fetch("http://127.0.0.1:8000/api/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        FIRST_NAME: username,
        LAST_NAME: username,
        EMAIL: email,
        PASSWORD: password,
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
      <div className="register-container">
        <form>
          <h2>Register</h2>
          <div>
            <p htmlFor="username">Tên đăng nhập</p>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <p htmlFor="email">Email:</p>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <p htmlFor="password">Mật khẩu:</p>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <p htmlFor="confirmPassword">Xác nhận lại mật khẩu:</p>
            <input
              type="password"
              id="confirmPassword"
              name="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className="agree-privacy">
            <input
              type="checkbox"
              checked={agreedToPolicy}
              onChange={() => setAgreedToPolicy(!agreedToPolicy)}
            />
            <p>I agree to car rental's policy</p>
          </div>
          <div className="register-btn">
            <button type="button" onClick={handleRegister}>
              Đăng ký
            </button>
          </div>
          <div className="line"></div>
          <div className="have-an-account">
            Bạn đã có tài khoản{" "}
            <span>
              <Link className="dangnhap_btn" to="/login">Đăng nhập</Link>
            </span>
          </div>
        </form>
      </div>
    </Layout>
  );
}

export default Register;
