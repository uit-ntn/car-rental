import React, { useState, useEffect } from "react";
import api from "../configs/api";
import { AiOutlineEye, AiOutlineDelete } from "react-icons/ai";
import { FaUser, FaEnvelope, FaPhoneAlt, FaIdCard } from "react-icons/fa"; // Thêm các icon khác

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

  return (
    <div className="card shadow-sm p-3">
      <h4 className="fw-bold">
        <FaUser /> Danh sách người dùng
      </h4>
      <table className="table table-striped table-bordered table-hover">
        {/* Label */}
        <thead className="table-primary text-center">
          <tr>
            <th><FaEnvelope /> EMAIL</th> {/* Icon email */}
            <th><FaUser /> HỌ TÊN</th>   {/* Icon user */}
            <th><FaIdCard /> VAI TRÒ</th> {/* Icon id card */}
            <th><FaPhoneAlt /> SỐ ĐIỆN THOẠI</th> {/* Icon phone */}
            <th>HÀNH ĐỘNG</th>
          </tr>
        </thead>

        <tbody>
          {userData.map((row, rowIndex) => (
            <tr key={rowIndex} className="text-center">
              <td>{row.email || "N/A"}</td>
              <td>{row.full_name || "N/A"}</td>
              <td>{row.role || "N/A"}</td>
              <td>{row.phone || "N/A"}</td>
              <td>
                <button className="btn btn-warning btn-sm">
                  <AiOutlineEye /> Xem
                </button>
                <button className="btn btn-danger btn-sm ms-2">
                  <AiOutlineDelete /> Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default User;
