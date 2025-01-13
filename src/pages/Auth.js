import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Layout from "../layouts/Layout";
import Login from "../components/Login";
import Register from "../components/Register";
import ForgotPassword from "../components/ForgotPassword";

const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLogin, setIsLogin] = useState(true);
  const [isForgotPassword, setIsForgotPassword] = useState(false);

  useEffect(() => {
    if (location.pathname === "/auth/register") {
      setIsLogin(false);
      setIsForgotPassword(false);
    } else if (location.pathname === "/auth/forgotpw") {
      setIsLogin(false);
      setIsForgotPassword(true);
    } else {
      setIsLogin(true);
      setIsForgotPassword(false);
    }
  }, [location.pathname]);

  const handleSwitch = () => {
    if (isLogin) {
      navigate("/auth/register");
    } else if (isForgotPassword) {
      navigate("/auth/login");
    } else {
      navigate("/auth/login");
    }
  };

  return (
    <Layout>
      <section className="bg-light py-3 py-md-5">
        <div className="container-fuild">
          <div className="row justify-content-center">
            <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5 col-xxl-4">
              <div className="card border border-light-subtle rounded-3 shadow-sm">
                <div className="card-body p-3 p-md-4 p-xl-5">
                  <h2 className="fs-6 fw-normal text-center text-secondary mb-4">
                    {isLogin
                      ? "Đăng nhập"
                      : isForgotPassword
                      ? "Quên mật khẩu"
                      : "Tạo tài khoản"}
                  </h2>
                  {isLogin ? (
                    <Login navigate={navigate} />
                  ) : isForgotPassword ? (
                    <ForgotPassword />
                  ) : (
                    <Register />
                  )}
                  <p className="m-0 text-secondary text-center">
                    {isLogin
                      ? "Don't have an account? "
                      : isForgotPassword
                      ? "Remembered your password? "
                      : "Already have an account? "}
                    <a
                      href=""
                      className="link-primary text-decoration-none"
                      onClick={handleSwitch}
                    >
                      {isLogin
                        ? "Sign up"
                        : isForgotPassword
                        ? "Log in"
                        : "Log in"}
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Auth;
