// Register.js

import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext"; // Import AuthContext
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { signup } = useContext(AuthContext);  // Use signup function from AuthContext
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      await signup(email, password);
      navigate("/auth/login");  // Redirect to login after successful registration
    } catch (err) {
      setError(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="row gy-2 overflow-hidden">
        <div className="col-12">
          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              name="email"
              id="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label htmlFor="email" className="form-label">Email</label>
          </div>
        </div>
        <div className="col-12">
          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control"
              name="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label htmlFor="password" className="form-label">Mật khẩu</label>
          </div>
        </div>
        <div className="col-12">
          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control"
              name="confirmPassword"
              id="confirmPassword"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <label htmlFor="confirmPassword" className="form-label">Xác nhận mật khẩu</label>
          </div>
        </div>
        <div className="col-12">
          {error && <p className="text-danger">{error}</p>}
        </div>
        <div className="col-12">
          <div className="d-grid my-3">
            <button className="btn btn-primary btn-lg" type="submit">Đăng ký</button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Register;
