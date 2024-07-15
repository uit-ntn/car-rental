import React, { useState } from 'react';

const Header = () => {
  const [loggedIn, setLoggedIn] = useState(true);

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">
          <img
            src=""
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt=""
          />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item active">
              <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Features</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Pricing</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Contact</a>
            </li>
            {loggedIn ? (
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  User
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <a className="dropdown-item" href="#">Profile</a>
                  <a className="dropdown-item" href="#">Settings</a>
                  <div className="dropdown-divider"></div>
                  <a className="dropdown-item" href="#" onClick={() => setLoggedIn(false)}>Logout</a>
                </div>
              </li>
            ) : (
              <>
                <button
                  className="btn btn-outline-primary mr-2"
                  onClick={() => alert('Login')}
                >
                  Login
                </button>
                <button
                  className="btn btn-outline-success"
                  onClick={() => alert('Register')}
                >
                  Register
                </button>
              </>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
