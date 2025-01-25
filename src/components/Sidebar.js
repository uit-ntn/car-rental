// src/components/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar bg-dark text-white" style={{ width: "250px", height: "100vh" }}>
      <div className="sidebar-header py-3">
        <h3 className="text-center">Quản lý Hệ thống</h3>
      </div>
      <ul className="list-unstyled">
        <li><Link to="/admin/dashboard" className="d-block text-white p-3">Dashboard</Link></li>
        <li><Link to="/admin/cars" className="d-block text-white p-3">Quản lý Xe</Link></li>
        <li><Link to="/admin/users" className="d-block text-white p-3">Quản lý Người Dùng</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
