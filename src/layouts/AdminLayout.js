import React from "react";
import { Link } from "react-router-dom";

const AdminLayout = ({ children }) => {
  return (
    <div className="d-flex">
      {/* Sidebar */}
      <div className="sidebar bg-dark text-white" style={{ width: "250px", height: "100vh" }}>
        <div className="sidebar-header py-3">
          <h3 className="text-center">Admin Dashboard</h3>
        </div>
        <ul className="list-unstyled">
          <li>
            <Link to="/admin/dashboard" className="d-block text-white p-3">Dashboard</Link>
          </li>
          <li>
            <Link to="/admin/cars" className="d-block text-white p-3">Quản lý xe</Link>
          </li>
          <li>
            <Link to="/admin/users" className="d-block text-white p-3">Quản lý người dùng</Link>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content p-3" style={{ width: "100%" }}>
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
