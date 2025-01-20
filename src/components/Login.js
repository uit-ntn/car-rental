// Login.js

import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext"; // Import AuthContext
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useContext(AuthContext);  // Use login function from AuthContext
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/");  // Redirect to home or dashboard
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
          {error && <p className="text-danger">{error}</p>}
        </div>
        <div className="col-12">
          <div className="d-grid my-3">
            <button className="btn btn-primary btn-lg" type="submit">Đăng nhập</button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Login;
