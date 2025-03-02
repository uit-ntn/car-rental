import React from "react";
import { FaUser, FaShoppingCart, FaHistory, FaKey, FaSignOutAlt } from 'react-icons/fa'; // Import icons from react-icons

const UserSidebar = () => {
  return (
    <div className="bg-light p-4 rounded" style={{ height: '100vh', position: 'sticky', top: 0 }}>
      <h4 className="text-center mb-4 text-primary">Tài khoản</h4>
      <ul className="nav flex-column">
        <li className="nav-item mb-3">
          <a className="nav-link text-dark d-flex align-items-center" href="#">
            <FaUser className="me-2" /> Thông tin cá nhân
          </a>
        </li>
        <li className="nav-item mb-3">
          <a className="nav-link text-dark d-flex align-items-center" href="#">
            <FaHistory className="me-2" /> Lịch sử giao dịch
          </a>
        </li>
        <li className="nav-item mb-3">
          <a className="nav-link text-dark d-flex align-items-center" href="#">
            <FaShoppingCart className="me-2" /> Giỏ hàng
          </a>
        </li>
        <li className="nav-item mb-3">
          <a className="nav-link text-dark d-flex align-items-center" href="#">
            <FaKey className="me-2" /> Đổi mật khẩu
          </a>
        </li>
        <li className="nav-item mb-3">
          <a className="nav-link text-dark d-flex align-items-center" href="#">
            <FaSignOutAlt className="me-2" /> Sign Out
          </a>
        </li>
      </ul>
    </div>
  );
};

export default UserSidebar;
