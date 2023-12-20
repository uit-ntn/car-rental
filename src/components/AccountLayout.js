import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuthentication";

import Header from "./Header";
import SideBar from "./SideBar";
import "../styles/AccountLayout.css";

function AccountLayout({ children }) {
  const { isLoggedIn } = useAuth();

  // Kiểm tra xem người dùng đã đăng nhập chưa
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="account-layout-container">
      <Header />
      <div className="main-content">
        <div className="account-sidebar">
          <SideBar />
        </div>
        <div className="content">
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
}

export default AccountLayout;
