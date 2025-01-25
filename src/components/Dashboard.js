import React from "react";
import AdminLayout from "../layouts/AdminLayout";

const Dashboard = () => {
  return (
    <AdminLayout>
      <div>
        <h2 className="text-center mb-4">Dashboard</h2>
        <p className="text-center">Chào mừng đến với trang quản lý Admin.</p>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
