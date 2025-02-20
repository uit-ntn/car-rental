import React, { useState, useEffect } from "react";
import { fetchCars, deleteCar, createCar, updateCar } from "../services/carService";
import { FaCar, FaPlus, FaRegCalendarAlt, FaCarAlt, FaIdCard, FaLocationArrow, FaMoneyBillWave, FaCog } from "react-icons/fa";
import { AiOutlineEye, AiOutlineDelete } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Cars = () => {
    const [cars, setCars] = useState([]);
    const [carToDelete, setCarToDelete] = useState(null);
    const [carToView, setCarToView] = useState(null);
    const [showViewModal, setShowViewModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    // Filter states
    const [filterMake, setFilterMake] = useState("");
    const [filterModel, setFilterModel] = useState("");
    const [filterYear, setFilterYear] = useState("");
    const [filterStatus, setFilterStatus] = useState("");
    const [filterPriceMin, setFilterPriceMin] = useState(0);
    const [filterPriceMax, setFilterPriceMax] = useState(1000000);

    // Get all cars when the component mounts
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

    // Helper function to format values (dates, numbers)
    const formatValue = (value) => {
        if (value && value instanceof Date && !isNaN(value)) {
            return value.toLocaleDateString('vi-VN');
        } else if (typeof value === 'number') {
            return value.toLocaleString('vi-VN');
        }
        return value || "N/A";
    };

    // Handle create car
    const handleCreateCar = async () => {
        try {
            const CarData = {
                make: document.getElementById("make").value,
                model: document.getElementById("model").value,
                year: parseInt(document.getElementById("year").value),
                license_plate: document.getElementById("license_plate").value,
                status: document.getElementById("status").value,
                location: document.getElementById("location").value,
                price: parseInt(document.getElementById("price").value),
                image: document.getElementById("image").value,
                transmission: document.getElementById("transmission").value,
                insurance_info: {
                    company: document.getElementById("insurance_company").value,
                    expiration_date: document.getElementById("insurance_expiration").value,
                    policy_number: document.getElementById("policy_number").value
                }
            };
            const newCar = await createCar(CarData);
            setCars([...cars, newCar]);
            toast.success("Thêm xe thành công!");
            setShowAddModal(false);

        }
        catch (error) {
            console.error("Lỗi khi thêm xe:", error);
            toast.error("Lỗi khi thêm xe.");
        }
    }

    // handleUpdateCar
    const handleUpdateCar = async () => {
        try {
            const updatedCar = {
                make: document.getElementById("make_update").value,
                model: document.getElementById("model_update").value,
                year: parseInt(document.getElementById("year_update").value),
                license_plate: document.getElementById("license_plate_update").value,
                status: document.getElementById("status_update").value,
                location: document.getElementById("location_update").value,
                price: parseInt(document.getElementById("price_update").value),
                image: document.getElementById("image_update").value,
                transmission: document.getElementById("transmission_update").value,
                insurance_info: {
                    company: document.getElementById("insurance_company_update").value,
                    expiration_date: document.getElementById("insurance_expiration_update").value,
                    policy_number: document.getElementById("policy_number_update").value
                }
            };

            const updatedData = await updateCar(carToView._id, updatedCar);
            setCars(cars.map(car => car._id === carToView._id ? updatedData : car));

            toast.success("Cập nhật xe thành công!");
            setShowUpdateModal(false);
        } catch (error) {
            console.error("Lỗi khi cập nhật xe:", error);
            toast.error("Lỗi khi cập nhật xe.");
            setShowUpdateModal(false);
        }
    };



    // Handle delete car
    const handleDelete = async () => {
        try {
            await deleteCar(carToDelete._id);
            setCars(cars.filter(car => car._id !== carToDelete._id));
            toast.success("Xóa xe thành công!");
            setShowDeleteModal(false);
        } catch (error) {
            console.error("Lỗi khi xóa xe:", error);
            toast.error("Lỗi khi xóa xe.");
            setShowDeleteModal(false);
        }
    };

    // Filter cars based on the selected filters
    const filteredCars = cars.filter((car) => {
        const matchesMake = filterMake ? car.make.toLowerCase().includes(filterMake.toLowerCase()) : true;
        const matchesModel = filterModel ? car.model.toLowerCase().includes(filterModel.toLowerCase()) : true;
        const matchesYear = filterYear ? car.year.toString().includes(filterYear.toString()) : true;
        const matchesStatus = filterStatus ? car.status.toLowerCase() === filterStatus.toLowerCase() : true;
        const matchesPrice = car.price >= filterPriceMin && car.price <= filterPriceMax;

        return matchesMake && matchesModel && matchesYear && matchesStatus && matchesPrice;
    });

    // Filter options
    const availableMakes = [...new Set(cars.map(car => car.make))];
    const availableModels = filterMake ? [...new Set(cars.filter(car => car.make === filterMake).map(car => car.model))] : [];
    const availableYears = [...new Set(cars.map(car => car.year))];
    const availableStatuses = ["Sẵn sàng", "Đang thuê", "Bảo trì"];
    const minPrice = Math.min(...cars.map(car => car.price));
    const maxPrice = Math.max(...cars.map(car => car.price));

    // Reset filters
    const resetFilters = () => {
        setFilterMake("");
        setFilterModel("");
        setFilterYear("");
        setFilterStatus("");
        setFilterPriceMin(minPrice);
        setFilterPriceMax(maxPrice);
    };

    // Function to get the background color for status
    const getStatusColor = (status) => {
        switch (status) {
            case 'Đang thuê':
                return 'bg-primary';
            case 'Sẵn sàng':
                return 'bg-success';
            case 'Bảo trì':
                return 'bg-warning';
            default:
                return 'bg-secondary';
        }
    };

    return (
        <div className="card shadow-sm p-3">
            {/* Header with buttons */}
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="fw-bold">
                    <FaCar /> DANH SÁCH XE
                </h4>
                <div className="d-flex">

                    {/* Clear Filters Button */}
                    <button className="btn btn-warning me-2" onClick={resetFilters}>
                        Xoá Bộ Lọc
                    </button>

                    {/* Add Car Button */}
                    <button className="btn btn-primary" onClick={() =>
                        setShowAddModal(true)

                    }>
                        <FaPlus /> Thêm Xe
                    </button>


                </div>
            </div>

            {/* Filter Section */}
            <div className="row mb-3">
                {/* Filter by Make */}
                <div className="col-md-3">
                    <label htmlFor="makeFilter" className="form-label">Lọc theo hãng xe</label>
                    <select
                        id="makeFilter"
                        className="form-select"
                        value={filterMake}
                        onChange={(e) => setFilterMake(e.target.value)}
                    >
                        <option value="">Tất cả</option>
                        {availableMakes.map((make, index) => (
                            <option key={index} value={make}>{make}</option>
                        ))}
                    </select>
                </div>

                {/* Filter by Model */}
                <div className="col-md-3">
                    <label htmlFor="modelFilter" className="form-label">Lọc theo mẫu xe</label>
                    <select
                        id="modelFilter"
                        className="form-select"
                        value={filterModel}
                        onChange={(e) => setFilterModel(e.target.value)}
                    >
                        <option value="">Tất cả</option>
                        {availableModels.map((model, index) => (
                            <option key={index} value={model}>{model}</option>
                        ))}
                    </select>
                </div>

                {/* Filter by Year */}
                <div className="col-md-3">
                    <label htmlFor="yearFilter" className="form-label">Lọc theo năm sản xuất</label>
                    <select
                        id="yearFilter"
                        className="form-select"
                        value={filterYear}
                        onChange={(e) => setFilterYear(e.target.value)}
                    >
                        <option value="">Tất cả</option>
                        {availableYears.map((year, index) => (
                            <option key={index} value={year}>{year}</option>
                        ))}
                    </select>
                </div>

                {/* Filter by Status */}
                <div className="col-md-3">
                    <label htmlFor="statusFilter" className="form-label">Lọc theo trạng thái</label>
                    <select
                        id="statusFilter"
                        className="form-select"
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                    >
                        <option value="">Tất cả</option>
                        {availableStatuses.map((status, index) => (
                            <option key={index} value={status}>{status}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Price Range Filter */}
            <div className="row mb-3">
                <div className="col-md-6">
                    <label htmlFor="priceRange" className="form-label">Lọc theo giá thuê</label>
                    <input
                        type="range"
                        id="priceRange"
                        min={minPrice}
                        max={maxPrice}
                        value={filterPriceMin}
                        onChange={(e) => setFilterPriceMin(e.target.value)}
                        className="form-range"
                    />
                    <input
                        type="range"
                        min={minPrice}
                        max={maxPrice}
                        value={filterPriceMax}
                        onChange={(e) => setFilterPriceMax(e.target.value)}
                        className="form-range"
                    />
                    <div className="d-flex justify-content-between">
                        <span>{formatValue(filterPriceMin)}</span>
                        <span>{formatValue(filterPriceMax)}</span>
                    </div>
                </div>
            </div>

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
                    {filteredCars.map((car, rowIndex) => (
                        <tr key={rowIndex} className={getStatusColor(car.status)}>
                            <td><img src={car.image} alt="Car" width="80" height="50" className="rounded" /></td>
                            <td>{car.make}</td>
                            <td>{car.model}</td>
                            <td>{car.year}</td>
                            <td>{car.license_plate}</td>
                            <td>{car.status}</td>
                            <td>{car.location}</td>
                            <td>{formatValue(car.price)}</td>
                            <td className="text-center">
                                <button className="btn btn-warning btn-sm" onClick={() => {
                                    setCarToView(car);
                                    setShowViewModal(true);
                                }}>
                                    <AiOutlineEye /> Xem
                                </button>
                                <button className="btn btn-danger btn-sm ms-2" onClick={() => {
                                    setCarToDelete(car)
                                    setShowDeleteModal(true)
                                }}>
                                    <AiOutlineDelete /> Xóa
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal for viewing car details */}
            {
                showViewModal && (
                    <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }} id="viewModal" tabIndex="-1" aria-labelledby="viewModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header bg-primary text-white">
                                    <h5 className="modal-title" id="viewModalLabel">CHI TIẾT XE</h5>
                                    <button type="button" className="btn-close" aria-label="Close" onClick={() => setShowViewModal(false)}></button>
                                </div>
                                <div className="modal-body" style={{ maxHeight: '500px', overflowY: 'auto' }}>
                                    {carToView ? (
                                        <div className="table-responsive">
                                            {/* Table to display car details */}
                                            <table className="table table-bordered">
                                                <thead>
                                                    <tr>
                                                        <th colSpan="2" className="text-center">Thông tin xe</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td><strong>Hãng xe:</strong></td>
                                                        <td>{carToView.make}</td>
                                                    </tr>
                                                    <tr>
                                                        <td><strong>Mẫu xe:</strong></td>
                                                        <td>{carToView.model}</td>
                                                    </tr>
                                                    <tr>
                                                        <td><strong>Năm sản xuất:</strong></td>
                                                        <td>{carToView.year}</td>
                                                    </tr>
                                                    <tr>
                                                        <td><strong>Biển số:</strong></td>
                                                        <td>{carToView.license_plate}</td>
                                                    </tr>
                                                    <tr>
                                                        <td><strong>Trạng thái:</strong></td>
                                                        <td>{carToView.status}</td>
                                                    </tr>
                                                    <tr>
                                                        <td><strong>Vị trí:</strong></td>
                                                        <td>{carToView.location}</td>
                                                    </tr>
                                                    <tr>
                                                        <td><strong>Giá thuê:</strong></td>
                                                        <td>{formatValue(carToView.price)}</td>
                                                    </tr>
                                                    <tr>
                                                        <td><strong>Hình ảnh:</strong></td>
                                                        <td className="text-center"><img src={carToView.image} alt="Car" width="100" height="80" className="rounded" /></td>
                                                    </tr>
                                                </tbody>
                                            </table>

                                            {/* Insurance Infomation Table */}
                                            <table className="table table-bordered mt-3">
                                                <thead>
                                                    <tr>
                                                        <th colSpan="2" className="text-center">Thông tin bảo hiểm</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td><strong>Công ty bảo hiểm:</strong></td>
                                                        <td>{carToView.insurance_info.company}</td>
                                                    </tr>
                                                    <tr>
                                                        <td><strong>Số hợp đồng:</strong></td>
                                                        <td>{carToView.insurance_info.policy_number}</td>
                                                    </tr>
                                                    <tr>
                                                        <td><strong>Ngày hết hạn bảo hiểm:</strong></td>
                                                        <td>{new Date(carToView.insurance_info.expiration_date).toLocaleDateString('vi-VN')}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    ) : <p>Không có dữ liệu xe.</p>}
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-primary" onClick={() => {
                                        setShowViewModal(false)
                                        setShowUpdateModal(true)
                                    }
                                    }>Cập nhật</button>
                                    <button type="button" className="btn btn-secondary" onClick={() => setShowViewModal(false)}>Đóng</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }


            {/* Modal for adding car */}
            {
                showAddModal && (
                    <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }} id="addModal" tabIndex="-1" aria-labelledby="addModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: '70vw' }}>
                            <div className="modal-content" style={{ height: '90vh', display: 'flex', flexDirection: 'column' }}>
                                <div className="modal-header bg-primary text-white">
                                    <h5 className="modal-title fw-bold" id="addModalLabel">BIỂU MẪU THÊM XE MỚI</h5>
                                    <button type="button" className="btn-close" aria-label="Close" onClick={() => setShowAddModal(false)}></button>
                                </div>
                                <div className="modal-body" style={{ maxHeight: 'calc(90vh - 120px)', overflowY: 'auto' }}> {/* Body scrollable, dynamic height */}
                                    <form >
                                        <h2 className="text-center">Nhập thông tin xe</h2>

                                        {/* Two Columns Layout */}
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label htmlFor="make" className="form-label">Hãng xe</label>
                                                    <input type="text" className="form-control" id="make" required />
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="model" className="form-label">Mẫu xe</label>
                                                    <input type="text" className="form-control" id="model" required />
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="year" className="form-label">Năm sản xuất</label>
                                                    <input type="number" className="form-control" id="year" required />
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="license_plate" className="form-label">Biển số</label>
                                                    <input type="text" className="form-control" id="license_plate" required />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label htmlFor="status" className="form-label">Trạng thái</label>
                                                    <select className="form-select" id="status" required>
                                                        <option value="available">Sẵn sàng</option>
                                                        <option value="rented">Đang thuê</option>
                                                        <option value="maintaince">Bảo trì</option>
                                                    </select>
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="location" className="form-label">Vị trí</label>
                                                    <input type="text" className="form-control" id="location" required />
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="price" className="form-label">Giá thuê (VNĐ)</label>
                                                    <input type="number" className="form-control" id="price" required />
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="image" className="form-label">Hình ảnh</label>
                                                    <input type="text" className="form-control" id="image" required />
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="image" className="form-label">Hộp số</label>
                                                    <select className="form-select" id="transmission" required>
                                                        <option value="Automatic">Tự động</option>
                                                        <option value="Manual">Số sàn</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Insurance Information */}
                                        <h3 className="mt-4 text-center">Nhập thông tin bảo hiểm</h3>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label htmlFor="insurance_company" className="form-label">Công ty bảo hiểm</label>
                                                    <input type="text" className="form-control" id="insurance_company" required />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label htmlFor="insurance_expiration" className="form-label">Ngày hết hạn bảo hiểm</label>
                                                    <input type="date" className="form-control" id="insurance_expiration" required />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label htmlFor="policy_number" className="form-label">Số hợp đồng</label>
                                                    <input type="text" className="form-control" id="policy_number" required />
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>

                                {/* Fixed Footer */}
                                <div className="modal-footer" style={{ position: 'sticky', bottom: '0', background: '#f9f9f9', zIndex: '10' }}>
                                    <button type="button" className="btn btn-secondary" onClick={() => setShowAddModal(false)}>Hủy</button>
                                    <button type="button" className="btn btn-primary" onClick={() => {
                                        handleCreateCar()
                                    }}>Thêm</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }

            {/* Modal for updating car details */}
            {
                showUpdateModal && (
                    <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }} id="updateModal" tabIndex="-1" aria-labelledby="updateModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header bg-primary text-white">
                                    <h5 className="modal-title" id="updateModalLabel">CẬP NHẬT XE</h5>
                                    <button type="button" className="btn-close" aria-label="Close" onClick={() => setShowUpdateModal(false)}></button>
                                </div>
                                <div className="modal-body">
                                    {carToView ? (
                                        <div className="table-responsive">
                                            <form>
                                                <table className="table table-bordered">
                                                    <tbody>
                                                        <tr>
                                                            <td><strong>Hãng xe:</strong></td>
                                                            <td>
                                                                <input
                                                                    id="make_update"
                                                                    type="text"
                                                                    className="form-control"
                                                                    defaultValue={carToView.make}
                                                                    placeholder={carToView.make}
                                                                />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td><strong>Mẫu xe:</strong></td>
                                                            <td>
                                                                <input
                                                                    id="model_update"
                                                                    type="text"
                                                                    className="form-control"
                                                                    defaultValue={carToView.model}
                                                                    placeholder={carToView.model}
                                                                />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td><strong>Năm sản xuất:</strong></td>
                                                            <td>
                                                                <input
                                                                    id="year_update"
                                                                    type="number"
                                                                    className="form-control"
                                                                    defaultValue={carToView.year}
                                                                    placeholder={carToView.year}
                                                                />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td><strong>Biển số:</strong></td>
                                                            <td>
                                                                <input
                                                                    id="license_plate_update"
                                                                    type="text"
                                                                    className="form-control"
                                                                    defaultValue={carToView.license_plate}
                                                                    placeholder={carToView.license_plate}
                                                                />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td><strong>Trạng thái:</strong></td>
                                                            <td>
                                                                <input
                                                                    id="status_update"
                                                                    type="text"
                                                                    className="form-control"
                                                                    defaultValue={carToView.status}
                                                                    placeholder={carToView.status}
                                                                />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td><strong>Vị trí:</strong></td>
                                                            <td>
                                                                <input
                                                                    id="location_update"
                                                                    type="text"
                                                                    className="form-control"
                                                                    defaultValue={carToView.location}
                                                                    placeholder={carToView.location}
                                                                />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td><strong>Giá thuê:</strong></td>
                                                            <td>
                                                                <input
                                                                    id="price_update"
                                                                    type="number"
                                                                    className="form-control"
                                                                    defaultValue={carToView.price}
                                                                    placeholder={formatValue(carToView.price)}
                                                                />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td><strong>Hình ảnh:</strong></td>
                                                            <td>
                                                                <input
                                                                    id="image_update"
                                                                    type="text"
                                                                    className="form-control"
                                                                    defaultValue={carToView.image}
                                                                    placeholder={carToView.image}
                                                                />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td><strong>Hộp số:</strong></td>
                                                            <td>
                                                                <select
                                                                    id="transmission_update"
                                                                    className="form-select"
                                                                    defaultValue={carToView.transmission}
                                                                    placeholder={carToView.transmission}
                                                                >
                                                                    <option value="Automatic">Tự động</option>
                                                                    <option value="Manual">Số sàn</option>
                                                                </select>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>

                                                {/* Insurance Information Table */}
                                                <table className="table table-bordered mt-3">
                                                    <tbody>
                                                        <tr>
                                                            <td><strong>Công ty bảo hiểm:</strong></td>
                                                            <td>
                                                                <input
                                                                    id="insurance_company_update"
                                                                    type="text"
                                                                    className="form-control"
                                                                    defaultValue={carToView.insurance_info.company}
                                                                    placeholder={carToView.insurance_info.company}
                                                                />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td><strong>Số hợp đồng:</strong></td>
                                                            <td>
                                                                <input
                                                                    id="policy_number_update"
                                                                    type="text"
                                                                    className="form-control"
                                                                    defaultValue={carToView.insurance_info.policy_number}
                                                                    placeholder={carToView.insurance_info.policy_number}
                                                                />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td><strong>Ngày hết hạn bảo hiểm:</strong></td>
                                                            <td>
                                                                <input
                                                                    id="insurance_expiration_update"
                                                                    type="date"
                                                                    className="form-control"
                                                                    defaultValue={new Date(carToView.insurance_info.expiration_date).toISOString().split('T')[0]}
                                                                    placeholder={new Date(carToView.insurance_info.expiration_date).toLocaleDateString('vi-VN')}
                                                                />
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </form>
                                        </div>
                                    ) : <p>Không có dữ liệu xe.</p>}
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-primary" onClick={handleUpdateCar}>
                                        Lưu thay đổi
                                    </button>
                                    <button type="button" className="btn btn-secondary" onClick={() => setShowUpdateModal(false)}>
                                        Đóng
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }





            {/* Modal for deleting car */}{
                showDeleteModal && (
                    <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }} id="deleteModal" tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="deleteModalLabel">Xác nhận xóa xe</h5>
                                    <button type="button" className="btn-close" aria-label="Close" onClick={() => setShowDeleteModal(false)}></button>
                                </div>
                                <div className="modal-body">
                                    <p>Bạn có chắc chắn muốn xóa xe này?</p>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={() => setShowDeleteModal(false)}>Hủy</button>
                                    <button type="button" className="btn btn-danger" onClick={handleDelete}>Xóa</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
            {/* Toast Container */}
            <ToastContainer />

        </div >


    );

};


export default Cars;
