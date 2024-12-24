import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import logo from "../assets/img/logo.jpeg"

const Header = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  // const [user,setUser] = useState();

  return (
    <header className='container-fuild border'>

      {/*Header Logo*/}
      <nav className="navbar navbar-expand-lg navbar-light bg-light d-flex justify-content-between px-5">
        <Link className="navbar-brand" to="/">
          <img
            src={logo}
            width="80"
            height="60"
            className="d-inline-block align-top"
            alt="logo"
          />
        </Link>

        {/*Header Navigation*/}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item active">
              <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">About</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">Contact</Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' to="/privacy">Privacy</Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' to="/help">Help</Link>
            </li>
          </ul>
        </div>


        {/*Header Action*/}
        <div className='d-flex justify-center px-5'>
          {loggedIn ? (
            <div className="nav-item dropdown btn btn-primary">
              <div
                className="nav-link dropdown-toggle"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Hello User
              </div>
              <div className="dropdown-menu text-center" aria-labelledby="navbarDropdown">
                <Link className="dropdown-item" to="/user/profile">Profile</Link>
                <Link className="dropdown-item" to="/user/cart">Cart</Link>
                <div className="dropdown-divider"></div>
                <Link className="dropdown-item" to="/logout" onClick={() => setLoggedIn(false)}>Logout</Link>
              </div>
            </div>
          ) : (
            <>
              <Link to='/auth/login'
                className="btn btn-primary mr-2 mx-3"
              >
                Login
              </Link>
              <Link to='/auth/register'
                className="btn btn-success mx-3"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
