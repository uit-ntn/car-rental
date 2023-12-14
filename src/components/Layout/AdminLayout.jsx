import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import { adminRoutes } from "../../routes/routes";
import TopNav from "../TopNav/TopNav";

const AdminLayout = () => {
  return (
    <div className="layout">
      <Sidebar />
      <div className="main__layout">
        <TopNav />
        <div className="content">
          <adminRoutes></adminRoutes>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
