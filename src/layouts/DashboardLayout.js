import React from "react";
import AdminHeader from "../components/AdminHeader";
import Sidebar from "../components/AdminSidebar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="d-flex">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main content area */}
      <div className="main-content" style={{ marginLeft: "250px", flexGrow: 1 }}>
        <AdminHeader />
        <div className="container mt-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
