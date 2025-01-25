import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext"; // Import AuthContext
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify'; // Import toastify
import 'react-toastify/dist/ReactToastify.css'; // Import CSS của react-toastify
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import icon từ react-icons

const Register = () => {
  const { signupHandler } = useContext(AuthContext);  // Use signup function from AuthContext
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(''); // Error message for mismatch or other issues
  const [showPassword, setShowPassword] = useState(false);  // State to toggle password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);  // State to toggle confirm password visibility

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check if the password and confirmation password match
    if (password !== confirmPassword) {
      setError("Mật khẩu không khớp");
      return;
    }

    try {
      // Call signup function from AuthContext
      await signupHandler(email, password); // đăng ký người dùng
      toast.success("Đăng ký thành công!");  // Hiển thị thông báo toast thành công
      navigate("/auth/login");  // Redirect to login page after successful registration
    } catch (err) {
      setError(err.message || "Đăng ký không thành công");
      toast.error("Đăng ký không thành công");  // Hiển thị thông báo lỗi
    }
  };

  return (
    <>
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
                placeholder="Mật khẩu"
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
            <div className="form-floating mb-3 position-relative">
              <input
                type={showConfirmPassword ? "text" : "password"}  // Toggle between text and password for confirm password
                className="form-control"
                name="confirmPassword"
                id="confirmPassword"
                placeholder="Xác nhận mật khẩu"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <label htmlFor="confirmPassword" className="form-label">Xác nhận mật khẩu</label>
              <button
                type="button"
                className="btn btn-outline-secondary position-absolute top-50 end-0 translate-middle-y"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                style={{ right: '10px', border: 'none', background: 'none' }}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}  {/* Toggle icon */}
              </button>
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

      {/* ToastContainer will render the toast notifications */}
      <ToastContainer />
    </>
  );
};

export default Register;
