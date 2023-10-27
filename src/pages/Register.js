import React, { useState } from "react";
import "../styles/Register.css";
import Header from "../components/Header";

function Register() {
  const [password, setPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const checkPasswordStrength = (value) => {
    setPassword(value);

    // Kiểm tra tính mạnh của mật khẩu ở đây và cập nhật setPasswordStrength
    if (value.length < 8) {
      setPasswordStrength("Mật khẩu quá ngắn");
    } else if (!/[a-z]/.test(value) || !/[A-Z]/.test(value) || !/[0-9]/.test(value)) {
      setPasswordStrength("Mật khẩu phải chứa ít nhất một chữ hoa, một chữ thường và một số");
    } else {
      setPasswordStrength("Mật khẩu mạnh");
    }
  };

  const handleRegister = () => {
    // Kiểm tra xác nhận mật khẩu ở đây
    if (password !== confirmPassword) {
      alert("Xác nhận mật khẩu không khớp.");
      return;
    }

    // Điều kiện khác (ví dụ: gửi dữ liệu đăng kí)
  };

  return (
    <div>
      <Header></Header>
      {/* ------------------------------------------ */}
      <div className="register-page">
        <form action="" id="formRegister">
          <label htmlFor="">
            <h1>Đăng ký</h1>
          </label>
          <hr />
          <label htmlFor="">Số điện thoại</label> <br />
          <input id="text" type="text" required /> <br />
          <label htmlFor="">Tên hiển thị</label> <br />
          <input id="text" type="text" required /> <br />
          <label htmlFor="">Mật khẩu</label> <br />
          <input
            id="text"
            type="password"
            required
            onChange={(e) => checkPasswordStrength(e.target.value)}
          />
          <p>{passwordStrength}</p> {/* Hiển thị tính mạnh của mật khẩu */}
          <label htmlFor="">Xác nhận mật khẩu</label> <br />
          <input
            id="text"
            type="password"
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <br />

          <label htmlFor="">Mã giới thiệu (nếu có)</label> <br />
          <input id="text" type="text" /> <br />
          <input id="checkboxdongy" type="checkbox" />Tôi đồng ý với chính sách của Mioto.{" "}<a href=""><b>Chi tiết</b></a>
          <br />
          <br />
          <button id="btndk" onClick={handleRegister}>
            Đăng ký
          </button>
        </form>
      </div>
    </div>

  );
}

export default Register;
