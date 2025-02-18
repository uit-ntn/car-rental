import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSpring, animated } from 'react-spring'; // React Spring for animations
import { FaHome, FaUsers, FaCar, FaFileContract, FaChartBar, FaCog, FaSignOutAlt } from 'react-icons/fa'; // Importing Font Awesome Icons for better appearance

const AdminSidebar = () => {
  const [hovered, setHovered] = useState(null);

  const slideIn = useSpring({
    from: { transform: 'translateX(-100%)' },
    to: { transform: 'translateX(0%)' },
    config: { friction: 25, tension: 250 },
  });

  const getHoverStyles = (index) => {
    return hovered === index
      ? {
          transform: 'translateY(-8px) scale(1.05)', // Hover effect with movement and scale
          backgroundColor: '#007bff',
          color: 'white',
          boxShadow: '0 4px 12px rgba(0, 123, 255, 0.3)', // Add shadow on hover
          borderColor: '#007bff', // Border color on hover
        }
      : {};
  };

  const getActiveStyles = (isActive) => {
    return isActive
      ? {
          backgroundColor: '#0056b3', // Active link background color
          color: 'white',
          borderColor: '#0056b3', // Border color when active
        }
      : {};
  };

  return (
    <animated.div
      style={{
        ...slideIn,
        width: "250px",
        height: "100vh",
        position: "fixed",
        left: 0,
        background: 'linear-gradient(to bottom, #2c3e50,rgb(40, 80, 120))', // Gradient background
        boxShadow: '4px 0 10px rgba(0, 0, 0, 0.2)', // Sidebar shadow
      }}
      className="shadow-sm p-4 border border-dark"
    >
      <h4
        className="text-center mb-4 text-white font-weight-bold"
        style={{ fontSize: '1.8rem', fontFamily: 'Arial, sans-serif', letterSpacing: '1px' }}
      >
        Car Rental
      </h4>
      
      <ul className="nav flex-column">
        {/* Overview Section */}
        <li className="nav-item mb-3">
          <NavLink
            to="/dashboard"
            className="nav-link text-white p-3 rounded d-flex align-items-center"
            activeClassName="bg-primary text-white"
            style={{
              ...getHoverStyles(0),
              ...getActiveStyles(window.location.pathname === '/dashboard'),
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={() => setHovered(0)}
            onMouseLeave={() => setHovered(null)}
          >
            <FaHome className="me-3" style={{ fontSize: '1.5rem', color: '#ecf0f1' }} /> Tổng quan
          </NavLink>
        </li>

        {/* Users Section */}
        <li className="nav-item mb-3">
          <NavLink
            to="/dashboard/users"
            className="nav-link text-white p-3 rounded d-flex align-items-center"
            activeClassName="bg-primary text-white"
            style={{
              ...getHoverStyles(1),
              ...getActiveStyles(window.location.pathname === '/dashboard/users'),
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={() => setHovered(1)}
            onMouseLeave={() => setHovered(null)}
          >
            <FaUsers className="me-3" style={{ fontSize: '1.5rem', color: '#ecf0f1' }} /> Người dùng <span className="badge bg-primary ms-auto"></span>
          </NavLink>
        </li>

        {/* Car Section */}
        <li className="nav-item mb-3">
          <NavLink
            to="/dashboard/cars"
            className="nav-link text-white p-3 rounded d-flex align-items-center"
            activeClassName="bg-primary text-white"
            style={{
              ...getHoverStyles(2),
              ...getActiveStyles(window.location.pathname === '/dashboard/cars'),
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={() => setHovered(2)}
            onMouseLeave={() => setHovered(null)}
          >
            <FaCar className="me-3" style={{ fontSize: '1.5rem', color: '#ecf0f1' }} /> Xe <span className="badge bg-primary ms-auto"></span>
          </NavLink>
        </li>
        
        {/* Contract Section */}
        <li className="nav-item mb-3">
          <NavLink
            to="/dashboard/contracts"
            className="nav-link text-white p-3 rounded d-flex align-items-center"
            activeClassName="bg-primary text-white"
            style={{
              ...getHoverStyles(3),
              ...getActiveStyles(window.location.pathname === '/dashboard/contracts'),
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={() => setHovered(3)}
            onMouseLeave={() => setHovered(null)}
          >
            <FaFileContract className="me-3" style={{ fontSize: '1.5rem', color: '#ecf0f1' }} /> Hợp đồng <span className="badge bg-primary ms-auto"></span>
          </NavLink>
        </li>

        {/* Reports Section */}
        <li className="nav-item mb-3">
          <NavLink
            to="/dashboard/reports"
            className="nav-link text-white p-3 rounded d-flex align-items-center"
            activeClassName="bg-primary text-white"
            style={{
              ...getHoverStyles(4),
              ...getActiveStyles(window.location.pathname === '/dashboard/reports'),
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={() => setHovered(4)}
            onMouseLeave={() => setHovered(null)}
          >
            <FaChartBar className="me-3" style={{ fontSize: '1.5rem', color: '#ecf0f1' }} /> Reports
          </NavLink>
        </li>

        {/* Others Section */}
        <hr />
        <div className="fw-bold mt-3 text-white">Others</div>

        {/* Settings Section */}
        <li className="nav-item mb-3">
          <NavLink
            to="/dashboard/settings"
            className="nav-link text-white p-3 rounded d-flex align-items-center"
            activeClassName="bg-primary text-white"
            style={{
              ...getHoverStyles(5),
              ...getActiveStyles(window.location.pathname === '/dashboard/settings'),
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={() => setHovered(5)}
            onMouseLeave={() => setHovered(null)}
          >
            <FaCog className="me-3" style={{ fontSize: '1.5rem', color: '#ecf0f1' }} /> Cài đặt <span className="badge bg-primary ms-auto"></span>
          </NavLink>
        </li>

        {/* Logout Section */}
        <li className="nav-item">
          <NavLink
            to="/dashboard/logout"
            className="nav-link text-white p-3 rounded d-flex align-items-center"
            activeClassName="bg-primary text-white"
            style={{
              ...getHoverStyles(6),
              ...getActiveStyles(window.location.pathname === '/dashboard/logout'),
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={() => setHovered(6)}
            onMouseLeave={() => setHovered(null)}
          >
            <FaSignOutAlt className="me-3" style={{ fontSize: '1.5rem', color: '#ecf0f1' }} /> Logout
          </NavLink>
        </li>
      </ul>
    </animated.div>
  );
};

export default AdminSidebar;
