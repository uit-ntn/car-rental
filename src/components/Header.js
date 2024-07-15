import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import logo from "../assets/img/logo.jpeg"

const Header = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  // const [user,setUser] = useState();

  return (
    <header className='container-fuild'>

      {/*Header Logo*/}
      <nav className="navbar navbar-expand-lg navbar-light bg-light d-flex justify-content-between px-5">
        <a className="navbar-brand" href="/">
          <img
            src={logo}
            width="80"
            height="60"
            className="d-inline-block align-top"
            alt="logo"
          />
        </a>

        {/*Header Navigation*/}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item active">
              <Link className="nav-link" href="/">Home <span className="sr-only">(current)</span></Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/about">About</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/contact">Contact</Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' href="/privacy">Privacy</Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' href="/help">Help</Link>
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
                <Link className="dropdown-item" href="/user/profile">Profile</Link>
                <Link className="dropdown-item" href="/user/cart">Cart</Link>
                <div className="dropdown-divider"></div>
                <Link className="dropdown-item" href="/logout" onClick={() => setLoggedIn(false)}>Logout</Link>
              </div>
            </div>
          ) : (
            <>
              <Link href='/login'
                className="btn btn-primary mr-2 mx-3"
                onClick={() => alert('Login')}
              >
                Login
              </Link>
              <Link href='/register'
                className="btn btn-success mx-3"
                onClick={() => alert('Register')}
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
