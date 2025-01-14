import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from "../assets/img/logo.jpeg";

const Header = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-light px-4">
        <Link className="navbar-brand" to="/">
          <img
            src={logo}
            alt="Car Rental Logo"
            width="80"
            height="60"
            className="d-inline-block align-top"
          />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                <i className="fas fa-home me-2 text-primary"></i>Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                <i className="fas fa-info-circle me-2 text-success"></i>About
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">
                <i className="fas fa-envelope me-2 text-danger"></i>Contact
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/privacy">
                <i className="fas fa-lock me-2 text-warning"></i>Privacy
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/help">
                <i className="fas fa-question-circle me-2 text-info"></i>Help
              </Link>
            </li>
          </ul>

          <div className="d-flex">
            {loggedIn ? (
              <div className="dropdown">
                <button
                  className="btn btn-outline-primary dropdown-toggle"
                  type="button"
                  id="userMenu"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Hello
                </button>
                <ul className="dropdown-menu" aria-labelledby="userMenu">
                  <li>
                    <Link className="dropdown-item" to="/user/profile">
                      <i className="fas fa-user me-2 text-dark"></i>Profile
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/user/cart">
                      <i className="fas fa-shopping-cart me-2 text-secondary"></i>Cart
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      to="/logout"
                      onClick={() => setLoggedIn(false)}
                    >
                      <i className="fas fa-sign-out-alt me-2 text-danger"></i>Logout
                    </Link>
                  </li>
                </ul>
              </div>
            ) : (
              <>
                <Link to="/auth/login" className="btn btn-primary me-2">
                  <i className="fas fa-sign-in-alt me-2 text-light"></i>Login
                </Link>
                <Link to="/auth/register" className="btn btn-success">
                  <i className="fas fa-user-plus me-2 text-light"></i>Register
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
