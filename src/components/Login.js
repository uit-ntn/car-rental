import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast } from 'react-toastify';

const Login = () => {
  const { loginHandler } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await loginHandler(email, password);
      toast.success("Đăng nhập thành công!");
      navigate("/");
    } catch (err) {
      setError(err.message || 'Đăng nhập thất bại!');  // Show error message
      toast.error("Đăng nhập thất bại!");  // Show error toast
    }
  };

  const handleForgotPassword = () => {
    navigate("/auth/forgotpw");  // Redirect to forgot password page
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
          <div className="form-floating mb-3 position-relative">
            <input
              type={showPassword ? "text" : "password"}  // Toggle between text and password
              className="form-control"
              name="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label htmlFor="password" className="form-label">Mật khẩu</label>
            <button
              type="button"
              className="btn btn-outline-secondary position-absolute top-50 end-0 translate-middle-y"
              onClick={() => setShowPassword(!showPassword)}
              style={{ right: '10px', border: 'none', background: 'none' }}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}  {/* Toggle icon */}
            </button>
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
        <div className="col-12 text-center">
          <button
            type="button"
            className="btn btn-link"
            onClick={handleForgotPassword}
            style={{ textDecoration: 'none', padding: 0 }}
          >
            Quên mật khẩu?
          </button>
        </div>
      </div>
    </form>
  );
};

export default Login;
