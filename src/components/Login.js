import React from "react";

const Login = ({ navigate }) => (
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
        <div className="d-flex gap-2 justify-content-between">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              name="rememberMe"
              id="rememberMe"
            />
            <label className="form-check-label text-secondary" htmlFor="rememberMe">
             Ghi nhớ tôi
            </label>
          </div>
          <a
            href="/auth/forgotpw"
            className="link-primary text-decoration-none"
          >
            Quên mật khẩu?
          </a>
        </div>
      </div>
      <div className="col-12">
        <div className="d-grid my-3">
          <button className="btn btn-primary btn-lg" type="submit">Đăng nhập</button>
        </div>
      </div>
    </div>
  </form>
);

export default Login;
