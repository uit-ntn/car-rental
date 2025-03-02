import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom"; // Import useLocation để lấy URL hiện tại
import { FaUser, FaShoppingCart, FaHistory, FaKey, FaSignOutAlt } from 'react-icons/fa'; // Import icons từ react-icons

const UserSidebar = () => {
  const location = useLocation(); // Lấy đường dẫn hiện tại
  const [hovered, setHovered] = useState(null);

  // Mảng chứa các mục sidebar với URL tương ứng
  const menuItems = [
    { icon: <FaUser />, label: "Thông tin cá nhân", url: "/user/profile" },
    { icon: <FaHistory />, label: "Lịch sử giao dịch", url: "/user/history" },
    { icon: <FaShoppingCart />, label: "Giỏ hàng", url: "/user/cart" },
    { icon: <FaKey />, label: "Đổi mật khẩu", url: "/user/change-password" },
    { icon: <FaSignOutAlt />, label: "Đăng xuất", url: "/logout" },
  ];

  return (
    <div className="text-white p-4 rounded">
      <h4 className="text-center mb-4 text-primary">Tài khoản</h4>
      <ul className="nav flex-column">
        {menuItems.map((item, index) => {
          // Kiểm tra nếu URL hiện tại khớp với mục menu, đổi màu nền
          const isActive = location.pathname === item.url;

          return (
            <li className="nav-item mb-3" key={index}>
              <Link
                to={item.url}
                className="nav-link d-flex align-items-center p-2"
                style={{
                  backgroundColor: isActive
                    ? '#0056b3' // Màu xanh đậm nếu được chọn
                    : hovered === index
                    ? '#007bff' // Màu xanh nhạt khi hover
                    : 'transparent',
                  color: isActive ? '#fff' : '#fff',
                  borderRadius: '5px',
                  transition: 'all 0.3s ease',
                  fontSize: '18px',
                }}
                onMouseEnter={() => setHovered(index)}
                onMouseLeave={() => setHovered(null)}
              >
                <span
                  style={{
                    fontSize: '24px',
                    color: isActive ? '#fff' : hovered === index ? '#fff' : '#007bff',
                    transition: '0.3s',
                  }}
                >
                  {item.icon}
                </span>
                <span className="ms-2 fw-bold fs-20">{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default UserSidebar;
