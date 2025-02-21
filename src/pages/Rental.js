import React, { useState, useEffect, useContext } from "react";
import { AiOutlineEye, AiOutlineDelete } from "react-icons/ai";
import { FaRegCalendarAlt, FaCar, FaUser, FaMoneyBillWave, FaClipboardList, FaPlus, FaFileContract } from "react-icons/fa";
import { toast } from "react-toastify";
import { fetchRentals, createRental, updateRental, deleteRental, updateRentalStatus } from "../services/rentalService";
import { fetchUsers } from "../services/userService";
import { ToastContainer } from "react-toastify";
import { CarContext } from "../context/CarContext";
import "react-toastify/dist/ReactToastify.css";

const Rentals = () => {
  const [rentals, setRentals] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [rentalToView, setRentalToView] = useState(null);
  const [rentalToDelete, setRentalToDelete] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [filterStatus, setFilterStatus] = useState(""); // Filter by status
  const [filterMonth, setFilterMonth] = useState(""); // Filter by month
  const [filterCarName, setFilterCarName] = useState(""); // Filter by car name
  const [filterCustomerName, setFilterCustomerName] = useState(""); // Filter by customer name
  const { cars } = useContext(CarContext);

  useEffect(() => {
    const getRentals = async () => {
      try {
        const data = await fetchRentals();
        setRentals(data);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu hợp đồng:", error);
        toast.error("Lỗi khi lấy dữ liệu hợp đồng");
      }
    };

    getRentals();
  }, []);

// Get all customer
  useEffect(() => {
    const getCustomers = async () => {
      try {
        const data = await fetchUsers();
        const customers = data.filter(user => user.role === 'customer');
        setCustomers(customers);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu khách hàng:", error);
        toast.error("Lỗi khi lấy dữ liệu khách hàng");
      }
    };
    getCustomers();
  }, []);

  // Hàm format giá trị ngày tháng và số
  const formatValue = (value) => {
    if (value && value instanceof Date && !isNaN(value)) {
      return value.toLocaleDateString('vi-VN'); // Format ngày tháng
    } else if (typeof value === 'number') {
      return value.toLocaleString('vi-VN'); // Format số
    }
    return value || "N/A"; // Trả về "N/A" nếu không có giá trị
  };

  // Handle create rental
  const handleCreate = async () => {
    const carId = document.getElementById('carId').value;
    const customerId = document.getElementById('customerId').value;
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    const newRental = {
      car_id: carId,
      customer_id: customerId,
      start_date: startDate,
      end_date: endDate
    };
    console.log(newRental);
    try {
      await createRental(newRental);
      setRentals([...rentals, newRental]); // Thêm hợp đồng mới vào danh sách
      toast.success("Tạo hợp đồng thành công!");
      setShowCreateModal(false); // Đóng modal sau khi tạo thành công
    } catch (error) {
      console.error("Lỗi khi tạo hợp đồng:", error);
      toast.error("Lỗi khi tạo hợp đồng");
      setShowCreateModal(false); // Đóng modal nếu có lỗi
    }
  };

  // Handle update status rental
  const handleUpdateStatusRental = async (rental_id) => {
    try {
      await updateRentalStatus(rental_id, "Đã duyệt");
      setRentals(rentals.map(rental => rental._id === rental_id ? { ...rental, status: "Đã duyệt" } : rental));
      toast.success("Cập nhật trạng thái thành công!");
      setShowViewModal(false);
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái hợp đồng:", error);
      toast.error("Lỗi khi cập nhật trạng thái hợp đồng");
    }
  };

  // Handle update rental
  const handleUpdate = async () => {
    const carId = document.getElementById('carId').value;
    const customerId = document.getElementById('customerId').value;
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    const updatedRental = {
      car_id: carId,
      customer_id: customerId,
      start_date: startDate,
      end_date: endDate
    };
    try {
      await updateRental(rentalToView._id, updatedRental);
      setRentals(rentals.map(rental => rental._id === rentalToView._id ? updatedRental : rental));
      toast.success("Cập nhật hợp đồng thành công!");
      setShowUpdateModal(false);
    }
    catch (error) {
      console.error("Lỗi khi cập nhật hợp đồng:", error);
      toast.error("Lỗi khi cập nhật hợp đồng");
      setShowUpdateModal(false);
    }
  };
  

  // Handle delete rental
  const handleDelete = async () => {
    try {
      await deleteRental(rentalToDelete._id);
      setRentals(rentals.filter(rental => rental._id !== rentalToDelete._id)); // Cập nhật lại danh sách hợp đồng
      toast.success("Xóa hợp đồng thành công!");
      setShowDeleteModal(false); // Đóng modal sau khi xóa thành công
    } catch (error) {
      console.error("Lỗi khi xóa hợp đồng:", error);
      toast.error("Lỗi khi xóa hợp đồng");
      setShowDeleteModal(false); // Đóng modal nếu có lỗi
    }
  };

  // Open view modal
  const openViewModal = (rental) => {
    setRentalToView(rental);  // Lưu rental cần xem
    setShowViewModal(true); // Mở modal xem
  };

  // Open delete modal
  const openDeleteModal = (rental) => {
    setRentalToDelete(rental);  // Lưu hợp đồng cần xóa
    setShowDeleteModal(true); // Mở modal xóa
  };

  // Filter Rentals based on the filters
  const filteredRentals = rentals.filter((rental) => {
    const matchesStatus = filterStatus ? rental.status.toLowerCase().includes(filterStatus.toLowerCase()) : true;
    const matchesMonth = filterMonth ? new Date(rental.start_date).getMonth() + 1 === parseInt(filterMonth) : true;
    const matchesCarName = filterCarName ? rental.carInfo.toLowerCase().includes(filterCarName.toLowerCase()) : true;
    const matchesCustomerName = filterCustomerName ? rental.customerInfo.toLowerCase().includes(filterCustomerName.toLowerCase()) : true;

    return matchesStatus && matchesMonth && matchesCarName && matchesCustomerName;
  });

  // Function to get the background color based on the rental status
  const getStatusColor = (status) => {
    switch (status) {
      case 'Chờ duyệt':
        return 'bg-warning'; // Yellow for 'Chờ duyệt'
      case 'Đang thuê':
        return 'bg-primary'; // Blue for 'Đang thuê'
      case 'Hoàn thành':
        return 'bg-success'; // Success for 'Hoàn thành'
      case 'Đã huỷ':
        return 'bg-danger'; // Mặc định cho đã huỷ
      default:
        return 'bg-info'; // Default background color
    }
  };

  // Reset all filters
  const resetFilters = () => {
    setFilterStatus("");
    setFilterMonth("");
    setFilterCarName("");
    setFilterCustomerName("");
  };

  return <div className="card shadow-sm p-3">
    <div className="d-flex justify-content-between align-items-center mb-3">
      <h4 className="fw-bold">
        <FaFileContract /> DANH SÁCH HỢP ĐỒNG
      </h4>

      <div className="d-flex">

        {/* Clear Filters Button */}
        <button className="btn btn-warning me-2" onClick={resetFilters}>
          Xoá Bộ Lọc
        </button>

        {/* Add Rental Button */}
        <button className="btn btn-primary" onClick={() => setShowCreateModal(true)}>
          <FaPlus /> Thêm Hợp Đồng
        </button>


      </div>
    </div>

    {/* Filter Section */}
    <div className="row mb-3">
      {/* Filter by Status */}
      <div className="col-md-3 col-sm-6">
        <label htmlFor="statusFilter" className="form-label">Lọc theo trạng thái</label>
        <select
          id="statusFilter"
          className="form-select"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="">Tất cả</option>
          <option value="Chờ duyệt">Chờ duyệt</option>
          <option value="Đang thuê">Đang thuê</option>
          <option value="Hoàn thành">Hoàn thành</option>
        </select>
      </div>

      {/* Filter by Month */}
      <div className="col-md-3 col-sm-6">
        <label htmlFor="monthFilter" className="form-label">Lọc theo tháng</label>
        <select
          id="monthFilter"
          className="form-select"
          value={filterMonth}
          onChange={(e) => setFilterMonth(e.target.value)}
        >
          <option value="">Tất cả</option>
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i} value={i + 1}>{i + 1}</option>
          ))}
        </select>
      </div>

      {/* Filter by Car Name */}
      <div className="col-md-3 col-sm-6">
        <label htmlFor="carNameFilter" className="form-label">Lọc theo tên xe</label>
        <input
          type="text"
          id="carNameFilter"
          className="form-control"
          value={filterCarName}
          onChange={(e) => setFilterCarName(e.target.value)}
          placeholder="Nhập tên xe"
        />
      </div>

      {/* Filter by Customer Name */}
      <div className="col-md-3 col-sm-6">
        <label htmlFor="customerNameFilter" className="form-label">Lọc theo tên khách hàng</label>
        <input
          type="text"
          id="customerNameFilter"
          className="form-control"
          value={filterCustomerName}
          onChange={(e) => setFilterCustomerName(e.target.value)}
          placeholder="Nhập tên khách hàng"
        />
      </div>
    </div>

    <table className="table table-striped table-bordered table-hover">
      <thead className="table-primary text-center">
        <tr>
          <th><FaCar /> Tên Xe</th>
          <th><FaUser /> Tên Khách hàng</th>
          <th><FaRegCalendarAlt /> Ngày bắt đầu</th>
          <th><FaRegCalendarAlt /> Ngày kết thúc</th>
          <th><FaMoneyBillWave /> Tổng chi phí (VNĐ)</th>
          <th><FaClipboardList /> Trạng thái</th>
          <th>HÀNH ĐỘNG</th>
        </tr>
      </thead>
      <tbody>
        {filteredRentals.map((rental, rowIndex) => (
          <tr key={rowIndex}>
            <td>{rental.carInfo || "N/A"}</td>
            <td>{rental.customerInfo || "N/A"}</td>
            <td>{formatValue(new Date(rental.start_date))}</td>
            <td>{formatValue(new Date(rental.end_date))}</td>
            <td>{formatValue(rental.total_cost)}</td>
            <td className={`text-center ${getStatusColor(rental.status)}`}>
              {rental.status || "N/A"}
            </td>
            <td className="text-center">
              <button className="btn btn-outline-primary btn-sm" onClick={() => openViewModal(rental)}>
                <AiOutlineEye /> Xem
              </button>
              <button
                className="btn btn-outline-danger btn-sm ms-2"
                onClick={() => openDeleteModal(rental)}
              >
                <AiOutlineDelete /> Xóa
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>

    {/* Modal for viewing rental details */}
    {showViewModal && (
      <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }} id="viewModal" tabIndex="-1" aria-labelledby="viewModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content" style={{ borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
            <div className="modal-header">
              <h5 className="modal-title" id="viewModalLabel">Chi tiết hợp đồng thuê xe</h5>
              <button type="button" className="btn-close" aria-label="Close" onClick={() => setShowViewModal(false)}></button>
            </div>
            <div className="modal-body">
              {rentalToView ? (
                <div className="table-responsive">
                  <table className="table table-bordered">
                    <tbody>
                      <tr style={{ backgroundColor: '#f9f9f9' }}>
                        <td><strong>Tên Xe</strong></td>
                        <td>{rentalToView.carInfo}</td>
                      </tr>
                      <tr>
                        <td><strong>Tên Khách Hàng</strong></td>
                        <td>{rentalToView.customerInfo}</td>
                      </tr>
                      <tr style={{ backgroundColor: '#f9f9f9' }}>
                        <td><strong>Ngày bắt đầu:</strong></td>
                        <td>{formatValue(new Date(rentalToView.start_date))}</td>
                      </tr>
                      <tr>
                        <td><strong>Ngày kết thúc:</strong></td>
                        <td>{formatValue(new Date(rentalToView.end_date))}</td>
                      </tr>
                      <tr style={{ backgroundColor: '#f9f9f9' }}>
                        <td><strong>Tổng chi phí:</strong></td>
                        <td>{formatValue(rentalToView.total_cost)}</td>
                      </tr>
                      <tr>
                        <td><strong>Trạng thái:</strong></td>
                        <td>{rentalToView.status}</td>
                      </tr>
                    </tbody>
                  </table>
                  <hr style={{ width: '80%', margin: '0 auto' }} />
                </div>
              ) : (
                <p>Không có dữ liệu hợp đồng.</p>
              )}
            </div>
            <div className="modal-footer">
            <button type="button" className="btn btn-primary" onClick={() => setShowUpdateModal(true)}>Sửa</button>
              {rentalToView.status === "Chờ duyệt" && (
                <button type="button" className="btn btn-success" onClick={() => handleUpdateStatusRental(rentalToView._id)}>Duyệt</button>
              )}
              <button type="button" className="btn btn-secondary" onClick={() => setShowViewModal(false)}>Đóng</button>
            </div>
          </div>
        </div>
      </div>
    )}

    {/* Modal for create rental */}
    {showCreateModal && (
      <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }} id="createModal" tabIndex="-1" aria-labelledby="createModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content" style={{ borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
            <div className="modal-header">
              <h5 className="modal-title" id="createModalLabel">Tạo hợp đồng thuê xe</h5>
              <button type="button" className="btn-close" aria-label="Close" onClick={() => setShowCreateModal(false)}></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="carId" className="form-label">Chọn Xe</label>
                  <select className="form-select" id="carId_update">
                    <option value="">Chọn xe</option>
                    {cars.map((car, index) => (
                      <option key={index} value={car._id}>{car.make} {car.model} {car.year}</option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="customerId" className="form-label">Chọn Khách hàng</label>
                  <select className="form-select" id="customerId_update">
                    <option value="">Chọn khách hàng</option>
                    {customers.map((customer, index) => (
                      <option key={index} value={customer._id}>{customer.full_name}</option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="startDate" className="form-label">Ngày bắt đầu</label>
                  <input type="date" className="form-control" id="startDate_update" />
                </div>
                <div className="mb-3">
                  <label htmlFor="endDate" className="form-label">Ngày kết thúc</label>
                  <input type="date" className="form-control" id="endDate_update" />
                </div>
              </form>

            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" onClick={handleCreate}>Tạo hợp đồng</button>
              <button type="button" className="btn btn-secondary" onClick={() => setShowCreateModal(false)}>Đóng</button>
            </div>
          </div>
        </div>
      </div>
    )}

    {/* Modal for update rental */}
    {showUpdateModal && (
      <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }} id="updateModal" tabIndex="-1" aria-labelledby="updateModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content" style={{ borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
            <div className="modal-header">
              <h5 className="modal-title" id="updateModalLabel">Cập nhật hợp đồng</h5>
              <button type="button" className="btn-close" aria-label="Close" onClick={() => setShowUpdateModal(false)}></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="carId" className="form-label">Chọn Xe</label>
                  <select className="form-select" id="carId" defaultValue={rentalToView.car_id}>
                    {cars.map((car, index) => (
                      <option key={index} value={car._id}>{car.make} {car.model} {car.year}</option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="customerId" className="form-label">Chọn Khách hàng</label>
                  <select className="form-select" id="customerId">
                    {customers.map((customer, index) => (
                      <option key={index} value={customer._id}>{customer.full_name}</option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="startDate" className="form-label">Ngày bắt đầu</label>
                  <input type="date" className="form-control" id="startDate" />
                </div>
                <div className="mb-3">
                  <label htmlFor="endDate" className="form-label">Ngày kết thúc</label>
                  <input type="date" className="form-control" id="endDate" />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-info" onClick={handleUpdate}>Cập nhật</button>
              <button type="button" className="btn btn-secondary" onClick={() => setShowUpdateModal(false)}>Đóng</button>
            </div>
          </div>
        </div>
      </div>
    )}


    {/* Modal for delete confirmation */}
    {showDeleteModal && (
      <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }} id="deleteModal" tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content" style={{ borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
            <div className="modal-header">
              <h5 className="modal-title" id="deleteModalLabel">Xác nhận xóa hợp đồng</h5>
              <button type="button" className="btn-close" aria-label="Close" onClick={() => setShowDeleteModal(false)}></button>
            </div>
            <div className="modal-body">
              <p>Bạn có chắc chắn muốn xóa hợp đồng này?</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => setShowDeleteModal(false)}>Hủy</button>
              <button type="button" className="btn btn-danger" onClick={handleDelete}>Xóa</button>
            </div>
          </div>
        </div>
      </div>
    )}

    <ToastContainer position="top-right" autoClose={3000} hideProgressBar />

  </div>
};

export default Rentals;
