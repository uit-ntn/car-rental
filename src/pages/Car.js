import React, { useState, useEffect } from "react";
import { AiOutlineEye, AiOutlineDelete } from "react-icons/ai";
import { FaCar, FaRegCalendarAlt, FaCarAlt, FaIdCard, FaLocationArrow, FaMoneyBillWave, FaCog } from "react-icons/fa";
import { toast } from "react-toastify";
import { fetchCars, deleteCar } from "../services/carService";

const Cars = () => {
    const [cars, setCars] = useState([]);
    const [carToDelete, setCarToDelete] = useState(null);
    const [carToView, setCarToView] = useState(null);
    const [showViewModal, setShowViewModal] = useState(false); // State để điều khiển modal xem
    const [showDeleteModal, setShowDeleteModal] = useState(false); // State để điều khiển modal xóa

    useEffect(() => {
        const getCars = async () => {
            try {
                const data = await fetchCars();
                setCars(data);
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu xe:", error);
                toast.error("Lỗi khi lấy dữ liệu xe");
            }
        };

        getCars();
    }, []);

    // Hàm format giá trị (ngày tháng, số)
    const formatValue = (value) => {
        if (value && value instanceof Date && !isNaN(value)) {
            return value.toLocaleDateString('vi-VN');
        } else if (typeof value === 'number') {
            return value.toLocaleString('vi-VN');
        }
        return value || "N/A";
    };

    // Handle delete car
    const handleDelete = async () => {
        try {
            if (carToDelete) {
                await deleteCar(carToDelete._id);
                setCars(cars.filter(car => car._id !== carToDelete._id));
                toast.success("Xóa xe thành công!");
            }
            setShowDeleteModal(false); // Đóng modal sau khi xóa thành công
        } catch (error) {
            console.error("Lỗi khi xóa xe:", error);
            toast.error("Lỗi khi xóa xe.");
            setShowDeleteModal(false); // Đóng modal nếu có lỗi
        }
    };

    // Open modal view car details
    const openViewModal = (car) => {
        setCarToView(car);
        setShowViewModal(true); // Mở modal xem
    };

    // Open modal delete car
    const openDeleteModal = (car) => {
        setCarToDelete(car);
        setShowDeleteModal(true); // Mở modal xóa
    };

    return (
        <div className="card shadow-sm p-3">
            <h4 className="fw-bold">
                <FaCar /> DANH SÁCH XE
            </h4>
            <table className="table table-striped table-bordered table-hover">
                <thead className="table-primary text-center">
                    <tr>
                        <th><FaRegCalendarAlt /> HÌNH ẢNH</th>
                        <th><FaCarAlt /> HÃNG XE</th>
                        <th><FaCarAlt /> MẪU XE</th>
                        <th><FaCarAlt /> NĂM SẢN XUẤT</th>
                        <th><FaIdCard /> BIỂN SỐ</th>
                        <th><FaCog /> TRẠNG THÁI</th>
                        <th><FaLocationArrow /> VỊ TRÍ</th>
                        <th><FaMoneyBillWave /> GIÁ THUÊ (VNĐ)</th>
                        <th>HÀNH ĐỘNG</th>
                    </tr>
                </thead>
                <tbody>
                    {cars.map((car, rowIndex) => (
                        <tr key={rowIndex}>
                            <td>
                                <img src={car.image} alt="Xe" width="80" height="50" className="rounded" />
                            </td>
                            <td>{car.make || "N/A"}</td>
                            <td>{car.model || "N/A"}</td>
                            <td>{car.year || "N/A"}</td>
                            <td>{car.license_plate || "N/A"}</td>
                            <td>{car.status === "rented" ? "Đang thuê" : car.status === "available" ? "Sẵn sàng" : "Bảo trì" || "N/A"}</td>
                            <td>{car.location || "N/A"}</td>
                            <td>{formatValue(car.price) || "N/A"}</td>
                            <td className="text-center">
                                <button className="btn btn-warning btn-sm" onClick={() => openViewModal(car)}>
                                    <AiOutlineEye /> Xem
                                </button>
                                <button className="btn btn-danger btn-sm ms-2" onClick={() => openDeleteModal(car)}>
                                    <AiOutlineDelete /> Xóa
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal for viewing car details */}
            {showViewModal && (
                <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }} id="viewModal" tabIndex="-1" aria-labelledby="viewModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content" style={{ borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
                            <div className="modal-header">
                                <h5 className="modal-title" id="viewModalLabel">Chi tiết xe</h5>
                                <button type="button" className="btn-close" aria-label="Close" onClick={() => setShowViewModal(false)}></button>
                            </div>
                            <div className="modal-body" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
                                {carToView ? (
                                    <div className="table-responsive">
                                        <table className="table table-bordered">
                                            <tbody>
                                                <tr>
                                                    <th className="text-center fw-bold" colSpan={2}>THÔNG TIN CHUNG</th>
                                                </tr>
                                                <tr style={{ backgroundColor: '#f9f9f9' }}>
                                                    <td><strong>Hãng xe:</strong></td>
                                                    <td>{carToView.make}</td>
                                                </tr>
                                                <tr>
                                                    <td><strong>Mẫu xe:</strong></td>
                                                    <td>{carToView.model}</td>
                                                </tr>
                                                <tr style={{ backgroundColor: '#f9f9f9' }}>
                                                    <td><strong>Năm sản xuất:</strong></td>
                                                    <td>{carToView.year}</td>
                                                </tr>
                                                <tr>
                                                    <td><strong>Biển số:</strong></td>
                                                    <td>{carToView.license_plate}</td>
                                                </tr>
                                                <tr style={{ backgroundColor: '#f9f9f9' }}>
                                                    <td><strong>Trạng thái:</strong></td>
                                                    <td>{carToView.status === "rented" ? "Đang thuê" : carToView.status === "available" ? "Sẵn sàng" : "Bảo trì"}</td>
                                                </tr>
                                                <tr>
                                                    <td><strong>Vị trí:</strong></td>
                                                    <td>{carToView.location}</td>
                                                </tr>
                                                <tr style={{ backgroundColor: '#f9f9f9' }}>
                                                    <td><strong>Giá thuê:</strong></td>
                                                    <td>{formatValue(carToView.price)}</td>
                                                </tr>
                                                <tr>
                                                    <td><strong>Loại hộp số:</strong></td>
                                                    <td>{carToView.transmission === "Manual" ? "Số Sàn" : "Tự động"}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <hr style={{ width: '80%', margin: '0 auto' }} />
                                        <table className="table table-bordered mt-3">
                                            <tr>
                                                <th className="text-center fw-bold" colSpan={2}>Thông tin bảo hiểm</th>
                                            </tr>
                                            <tbody>
                                                <tr style={{ backgroundColor: '#f9f9f9' }}>
                                                    <td><strong>Công ty bảo hiểm :</strong></td>
                                                    <td>{carToView.insurance_info.company}</td>
                                                </tr>
                                                <tr>
                                                    <td><strong>Ngày hết hạn:</strong></td>
                                                    <td>{formatValue(new Date(carToView.insurance_info.expiration_date))}</td>
                                                </tr>
                                                <tr style={{ backgroundColor: '#f9f9f9' }}>
                                                    <td><strong>Số hợp đồng:</strong></td>
                                                    <td>{formatValue(carToView.insurance_info.policy_number)}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                ) : (
                                    <p>Không có dữ liệu xe.</p>
                                )}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowViewModal(false)}>Đóng</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default Cars;
