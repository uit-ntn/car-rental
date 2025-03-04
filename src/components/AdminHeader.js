import React, { useContext } from "react";
import { FaBell, FaUserCircle, FaCog } from "react-icons/fa"; // Importing Font Awesome Icons
import { AuthContext } from "../context/AuthContext";

const AdminHeader = () => {
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    // Redirect to login page
    window.location.href = "/auth/login";
  };

  return (
    <header
      className="border-bottom text-white p-3"
      style={{
        background: 'linear-gradient(90deg, #4e73df, #2e59d9)', // Gradient background
        fontFamily: "'Poppins', sans-serif", // Apply custom font
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Add subtle shadow
      }}
    >
      <div className="container d-flex justify-content-between align-items-center">
        <h3 style={{ fontWeight: '600', color:'white' }}>Admin Dashboard</h3>

        {/* Search Bar */}
        <div className="d-flex align-items-center">
          <input
            type="text"
            className="form-control me-3"
            placeholder="Search..."
            style={{
              width: '250px',
              borderRadius: '20px', // Rounded corners for the search bar
              paddingLeft: '15px',
            }}
          />

          {/* Notifications Icon */}
          <button className="btn btn-light me-3" style={{ borderColor: '#4e73df', color: '#4e73df' }}>
            <FaBell size={20} />
          </button>

          {/* Profile Dropdown */}
          <div className="dropdown">
            <button
              className="btn btn-light dropdown-toggle"
              type="button"
              id="profile-dropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              style={{ borderColor: '#4e73df', color: '#4e73df' }}
            >
              <FaUserCircle size={24} />
            </button>
            <ul className="dropdown-menu" aria-labelledby="profile-dropdown">
              <li>
                <a className="dropdown-item" href="#!">
                  <FaCog className="me-2" /> Settings
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#!">
                  <FaUserCircle className="me-2" /> Profile
                </a>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <a className="dropdown-item" href="#!" onClick={handleLogout}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
