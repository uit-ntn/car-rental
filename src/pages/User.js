import React, { useState, useEffect } from "react";
import DataTable from "../components/DataTable";
import api from "../configs/api";

const User = () => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    api.get("/api/users")
      .then((res) => {
        setUserData(res.data);
      })
      .catch((error) => {
        console.error("Lỗi khi lấy dữ liệu:", error);
      });
  }, []);

  // Cột của bảng người dùng
  const userColumns = [
    { label: "EMAIL", key: "email" },
    { label: "HỌ TÊN", key: "full_name" },
    { label: "VAI TRÒ", key: "role" },
    { label: "SỐ ĐIỆN THOẠI", key: "phone" },
  ];

  return (
    <DataTable columns={userColumns} data={userData} title="Danh sách người dùng" />
  );
};

export default User;
