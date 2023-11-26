import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import AccountLayout from "../components/AccountLayout";

const Account = () => {
  // State để lưu trữ dữ liệu từ API
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Hàm fetch API
    const fetchData = async () => {
      try {
        const userId = Cookies.get("userId");

        if (userId) {
          // Gọi API để lấy thông tin tài khoản theo ID
          const response = await fetch(`https://6539dce6e3b530c8d9e8c413.mockapi.io/car-rental/user/${userId}`);
          const data = await response.json();

          // Lưu dữ liệu từ API vào state
          setUserData(data);
        }
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu từ API:", error);
      }
    };

    // Gọi hàm fetch API khi component được tạo
    fetchData();
  }, []); // [] đảm bảo useEffect chỉ chạy một lần khi component được tạo

  return (
    <AccountLayout>
      <div className="account-container">
        <div>
          <h2>Thông tin tài khoản</h2>
          <div className="account-avt-fix">
            <img alt="User Avatar" src={userData ? userData.avatar : ""} />
          </div>
          <div className="user-name">{userData ? userData.username : "User name"}</div>
        </div>
      </div>
    </AccountLayout>
  );
};

export default Account;
