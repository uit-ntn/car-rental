import React, { useState } from "react";
import Layout from "../components/Layout.js";
import '../styles/Register.css';
function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreedToPolicy, setAgreedToPolicy] = useState(false);


  // hàm kiểm tra độ mạnh của mật khẩu
  const checkPasswordStrength = (value) => {
    setPassword(value);

    if (value.length < 8) {
      setPasswordStrength("Password is too short");
    } else if (!/[a-z]/.test(value) || !/[A-Z]/.test(value) || !/[0-9]/.test(value)) {
      setPasswordStrength("Password must contain at least one uppercase letter, one lowercase letter, and one number");
    } else {
      setPasswordStrength("Strong password");
    }
  };

  const handleRegister = () => {
    if (!agreedToPolicy) {
      alert("You must agree to our policy to register.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Password confirmation does not match.");
      return;
    }


    fetch('api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          // Đăng ký thành công : chuyển hướng trang.
        } else {
          alert("Đăng ký thất bại: " + data.message);
        }
      })
      .catch((error) => {
        console.error('Lỗi khi gửi dữ liệu đăng ký:', error);
      });
  };

  return (
    <Layout>
      <div className="register-container">
        <h2>Register</h2>
        <form>
          <div>
            <p htmlFor="username">Username or Email:</p>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <p htmlFor="password">Password:</p>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => checkPasswordStrength(e.target.value)}
            />
            <p className="check-password">{passwordStrength}</p>
          </div>
          <div>
            <p htmlFor="confirmPassword">Confirm Password:</p>
            <input
              type="password"
              id="confirmPassword"
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
            <p>
              I agree to car rental's policy
            </p>

          </div>
          <div className="line"></div>
          <div className="register-btn">
            <button type="button" onClick={handleRegister}>
              Register
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}

export default Register;
