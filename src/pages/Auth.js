import React, {
  useState,
  useEffect
} from "react";
import {
  useNavigate,
  useLocation
} from "react-router-dom";
import Layout from "../layouts/Layout";
// import UserContext from "../hooks/userProvider";

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
      <>
        {/* Auth Component */}
        <section className="bg-light py-3 py-md-5">
          <div className="container-fuild">
            <div className="row justify-content-center">
              <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5 col-xxl-4">
                <div className="card border border-light-subtle rounded-3 shadow-sm">
                  <div className="card-body p-3 p-md-4 p-xl-5">
                    <h2 className="fs-6 fw-normal text-center text-secondary mb-4">
                      {isLogin
                        ? "Sign in to your account"
                        : isForgotPassword
                          ? "Forgot Password"
                          : "Create an account"}
                    </h2>
                    <form action="#!">
                      <div className="row gy-2 overflow-hidden">
                        {isForgotPassword ? (
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
                              <label htmlFor="email" className="form-label">
                                Email
                              </label>
                            </div>
                          </div>
                        ) : (
                          <>
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
                                <label htmlFor="email" className="form-label">
                                  Email
                                </label>
                              </div>
                            </div>
                            <div className="col-12">
                              <div className="form-floating mb-3">
                                <input
                                  type="password"
                                  className="form-control"
                                  name="password"
                                  id="password"
                                  defaultValue=""
                                  placeholder="Password"
                                  required=""
                                />
                                <label htmlFor="password" className="form-label">
                                  Password
                                </label>
                              </div>
                            </div>
                            {!isLogin && (
                              <div className="col-12">
                                <div className="form-floating mb-3">
                                  <input
                                    type="password"
                                    className="form-control"
                                    name="confirmPassword"
                                    id="confirmPassword"
                                    defaultValue=""
                                    placeholder="Confirm Password"
                                    required=""
                                  />
                                  <label htmlFor="confirmPassword" className="form-label">
                                    Confirm Password
                                  </label>
                                </div>
                              </div>
                            )}
                            {isLogin && (
                              <div className="col-12">
                                <div className="d-flex gap-2 justify-content-between">
                                  <div className="form-check">
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      defaultValue=""
                                      name="rememberMe"
                                      id="rememberMe"
                                    />
                                    <label
                                      className="form-check-label text-secondary"
                                      htmlFor="rememberMe"
                                    >
                                      Keep me logged in
                                    </label>
                                  </div>
                                  <a
                                    href="#!"
                                    className="link-primary text-decoration-none"
                                    onClick={() => navigate("/auth/forgotpw")}
                                  >
                                    Forgot password?
                                  </a>
                                </div>
                              </div>
                            )}
                          </>
                        )}
                        <div className="col-12">
                          <div className="d-grid my-3">
                            <button className="btn btn-primary btn-lg" type="submit">
                              {isLogin
                                ? "Log in"
                                : isForgotPassword
                                  ? "Reset Password"
                                  : "Sign up"}
                            </button>
                          </div>
                        </div>
                        <div className="col-12">
                          <p className="m-0 text-secondary text-center">
                            {isLogin
                              ? "Don't have an account? "
                              : isForgotPassword
                                ? "Remembered your password? "
                                : "Already have an account? "}
                            <a
                              href="#!"
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
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    </Layout>
  );
};

export default Auth;
