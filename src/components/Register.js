import React from "react";

const Register = () => (
  <form>
    <div className="row gy-2 overflow-hidden">
      <div className="col-12">
        <div className="form-floating mb-3">
          <input
            type="email"
            className="form-control"
            name="email"
            id="email"
            placeholder="name@example.com"
            required=""
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
            required=""
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
            required=""
          />
          <label htmlFor="confirmPassword" className="form-label">Xác nhận lại mật khẩu</label>
        </div>
      </div>
      <div className="col-12">
        <div className="d-grid my-3">
          <button className="btn btn-primary btn-lg" type="submit">Đăng ký</button>
        </div>
      </div>
    </div>
  </form>
);

export default Register;
