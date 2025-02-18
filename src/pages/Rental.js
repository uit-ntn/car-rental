import React, { useEffect, useState } from "react";
import api from "../configs/api";
import { AiOutlineEye, AiOutlineDelete } from "react-icons/ai";
import { FaRegCalendarAlt, FaCar, FaUser, FaMoneyBillWave, FaClipboardList } from "react-icons/fa"; // Các icon khác

const Rentals = () => {
  const [rentals, setRentals] = useState([]);

  useEffect(() => {
    api.get("/api/rentals")
      .then((res) => setRentals(res.data))
      .catch(console.error);
  }, []);

  const rentalColumns = [
    { label: <><FaCar /> Car ID</>, key: "car_id" },
    { label: <><FaUser /> Customer ID</>, key: "customer_id" },
    { label: <><FaRegCalendarAlt /> Ngày bắt đầu</>, key: "start_date", type: "date" },
    { label: <><FaRegCalendarAlt /> Ngày kết thúc</>, key: "end_date", type: "date" },
    { label: <><FaMoneyBillWave /> Tổng chi phí (VNĐ)</>, key: "total_cost" },
    { label: <><FaClipboardList /> Trạng thái</>, key: "status" }
  ];

  // Hàm format giá trị ngày tháng và số
  const formatValue = (value) => {
    if (value && value instanceof Date && !isNaN(value)) {
      return value.toLocaleDateString('vi-VN'); // Format ngày tháng
    } else if (typeof value === 'number') {
      return value.toLocaleString('vi-VN'); // Format số
    }
    return value || "N/A"; // Trả về "N/A" nếu không có giá trị
  };

  return (
    <div className="card shadow-sm p-3">
      <h4 className="fw-bold">🚗 Quản lý Thuê Xe</h4>
      <table className="table table-striped table-bordered table-hover">
        <thead className="table-primary text-center">
          <tr>
            {rentalColumns.map((col, index) => (
              <th key={index}>{col.label}</th>
            ))}
            <th>HÀNH ĐỘNG</th>
          </tr>
        </thead>
        <tbody>
          {rentals.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {rentalColumns.map((col, colIndex) => (
                <td key={colIndex}>
                  {col.type === "date" ? (
                    formatValue(new Date(row[col.key])) // Format ngày tháng
                  ) : (
                    formatValue(row[col.key])
                  )}
                </td>
              ))}
              <td className="text-center">
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

export default Rentals;
