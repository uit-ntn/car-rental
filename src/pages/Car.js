import React, { useEffect, useState } from "react";
import { AiOutlineEye, AiOutlineDelete } from "react-icons/ai";
import { FaCar, FaRegCalendarAlt, FaCarAlt, FaIdCard, FaLocationArrow, FaMoneyBillWave, FaCog } from "react-icons/fa"; 
import { toast } from "react-toastify";
import { fetchCars, deleteCar } from "../services/carService";

const Cars = () => {
    const [cars, setCars] = useState([]);
    const [carToDelete, setCarToDelete] = useState(null);
    const [carToView, setCarToView] = useState(null); 

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
            const modal = new window.bootstrap.Modal(document.getElementById('deleteModal'));
            modal.hide();
        } catch (error) {
            console.error("Lỗi khi xóa xe:", error);
            toast.error("Lỗi khi xóa xe.");
        }
    };

    // Open modal delete car
    const openDeleteModal = (car) => {
        setCarToDelete(car);
        const modal = new window.bootstrap.Modal(document.getElementById('deleteModal'));
        modal.show();
    };

    // Open modal view car details
    const openViewModal = (car) => {
        setCarToView(car);  
        const modal = new window.bootstrap.Modal(document.getElementById('viewModal'));
        modal.show();
    };

    return (
        <div className="card shadow-sm p-3">
            <h4 className="fw-bold">
                <FaCar /> Quản lý Xe
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
            <div className="modal fade" id="viewModal" tabIndex="-1" aria-labelledby="viewModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="viewModalLabel">Chi tiết xe</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {carToView ? (
                                <>
                                    <p><strong>Hãng xe:</strong> {carToView.make}</p>
                                    <p><strong>Mẫu xe:</strong> {carToView.model}</p>
                                    <p><strong>Năm sản xuất:</strong> {carToView.year}</p>
                                    <p><strong>Biển số:</strong> {carToView.license_plate}</p>
                                    <p><strong>Trạng thái:</strong> {carToView.status === "rented" ? "Đang thuê" : carToView.status === "available" ? "Sẵn sàng" : "Bảo trì"}</p>
                                    <p><strong>Vị trí:</strong> {carToView.location}</p>
                                    <p><strong>Giá thuê:</strong> {formatValue(carToView.price)}</p>
                                </>
                            ) : (
                                <p>Không có dữ liệu xe.</p>
                            )}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal for delete confirmation */}
            <div className="modal fade" id="deleteModal" tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="deleteModalLabel">Xác nhận xóa xe</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <p>Bạn có chắc chắn muốn xóa xe này?</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
                            <button type="button" className="btn btn-danger" onClick={handleDelete}>Xóa</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Cars;
