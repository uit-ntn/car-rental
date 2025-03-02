import React from "react";
import { Routes, Route } from "react-router-dom";
import AccountLayout from "../layouts/UserLayout";
import UserInfo from "../components/UserInfo";
import ChangePassword from "../components/ChangePassword";
import RentalHistory from "../components/RentalHistory";  // Component lịch sử giao dịch
// import Cart from "../components/Cart";  // Component giỏ hàng

const Account = () => {
  return (
    <AccountLayout>
      <Routes>
        <Route path="profile" element={<UserInfo />} />
        <Route path="change-password" element={<ChangePassword />} />
        <Route path="history" element={<RentalHistory />} />
        {/* <Route path="cart" element={<Cart />} /> */}
        <Route path="*" element={<UserInfo />} />
      </Routes>
    </AccountLayout>
  );
};

export default Account;
