import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Layout from "../components/Layout.js";
import '../styles/Register.css';
function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreedToPolicy, setAgreedToPolicy] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const isLoggedIn = Cookies.get("isLoggedIn");
    if (isLoggedIn === "true") {
      navigate('/');
    }
  }, []);
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

  const handleRegister = async () => {
    if (!agreedToPolicy) {
      alert("Bạn phải đồng ý với chính sách của chúng tôi để đăng ký.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Xác nhận mật khẩu không khớp.");
      return;
    }

    try {
      const response = await fetch('https://6539dce6e3b530c8d9e8c413.mockapi.io/car-rental/user', {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error('Lỗi kiểm tra tên đăng nhập và email.');
      }

      const data = await response.json();

      const isUsernameExists = data.some(user => user.username === username);
      const isEmailExists = data.some(user => user.email === email);

      if (isUsernameExists) {
        alert("Tên đăng nhập đã tồn tại. Vui lòng chọn tên khác.");
        return;
      }

      if (isEmailExists) {
        alert("Email đã tồn tại. Vui lòng sử dụng email khác.");
        return;
      }
      const registrationResponse = await fetch('https://6539dce6e3b530c8d9e8c413.mockapi.io/car-rental/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
          email: email,
        }),
      });

      if (!registrationResponse.ok) {
        throw new Error('Lỗi khi đăng ký tài khoản.');
      }

      const registrationData = await registrationResponse.json();

      if (registrationData.success) {
        alert("Đăng ký thành công!");
        navigate('/login');
      } else {
        alert("Đăng ký thất bại: " + registrationData.message);
      }

    } catch (error) {
      console.error('Lỗi khi kiểm tra tên đăng nhập và email:', error);
    }
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
              onChange={(e) => checkPasswordStrength(e.target.value)}
            />
            <p className="check-password">{passwordStrength}</p>
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
            <p>
              I agree to car rental's policy
            </p>

          </div>
          <div className="register-btn">
            <button type="button" onClick={handleRegister}>
              Đăng ký
            </button>
          </div>
          <div className="line"></div>
          <div className="have-an-account">Bạn đã có tài khoản <span><Link to="/login">Đăng nhập</Link></span></div>
        </form>
      </div>
    </Layout>
  );
}

export default Register;
