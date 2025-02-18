import React, { useEffect, useState } from "react";
import api from "../configs/api";
import { AiOutlineEye, AiOutlineDelete } from "react-icons/ai";
import { FaCar, FaRegCalendarAlt, FaCarAlt, FaIdCard, FaLocationArrow, FaMoneyBillWave, FaCog } from "react-icons/fa"; // Sử dụng FaCog thay vì FaGear

const Cars = () => {
    const [cars, setCars] = useState([]);

    useEffect(() => {
        api.get("/api/cars")
            .then((res) => setCars(res.data))
            .catch(console.error);
    }, []);

    // Hàm format giá trị (ngày tháng, số)
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
            <h4 className="fw-bold">
                <FaCar /> Quản lý Xe
            </h4>
            <table className="table table-striped table-bordered table-hover">
                {/* Label */}
                <thead className="table-primary text-center">
                    <tr>
                        <th><FaRegCalendarAlt /> HÌNH ẢNH</th> {/* Icon cho hình ảnh */}
                        <th><FaCarAlt /> HÃNG XE</th> {/* Icon cho hãng xe */}
                        <th><FaCarAlt /> MẪU XE</th> {/* Icon cho mẫu xe */}
                        <th><FaCarAlt /> NĂM SẢN XUẤT</th> {/* Thêm icon cho loại xe */}
                        <th><FaIdCard /> BIỂN SỐ</th> {/* Icon cho biển số */}
                        <th><FaCog /> TRẠNG THÁI</th> {/* Thay FaGear bằng FaCog */}
                        <th><FaLocationArrow /> VỊ TRÍ</th> {/* Icon cho vị trí */}
                        <th><FaMoneyBillWave /> GIÁ THUÊ (VNĐ)</th> {/* Icon cho giá thuê */}
                        <th>HÀNH ĐỘNG</th>
                    </tr>
                </thead>
                <tbody>
                    {cars.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            <td>
                                <img src={row.image} alt="Xe" width="80" height="50" className="rounded" />
                            </td>
                            <td>{row.make || "N/A"}</td>
                            <td>{row.model || "N/A"}</td>
                            <td>{row.year || "N/A"}</td>
                            <td>{row.license_plate || "N/A"}</td>
                            <td>{row.status == "rented" ? "Đang thuê" : row.status == "available" ? "Sẵn sàng" : "Bảo trì" || "N/A"}</td>
                            <td>{row.location || "N/A"}</td>
                            <td>{formatValue(row.price) || "N/A"}</td>
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

export default Cars;
