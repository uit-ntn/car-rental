import React, { useState, useEffect } from "react";
import { AiOutlineEye, AiOutlineDelete } from "react-icons/ai";
import { FaUser, FaEnvelope, FaPhoneAlt, FaIdCard, FaPlus } from "react-icons/fa";
import { fetchUsers, deleteUser } from "../services/userService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const User = () => {
  const [users, setUserss] = useState([]);
  const [userToDelete, setUsersToDelete] = useState(null);
  const [userToView, setUsersToView] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [filterRole, setFilterRole] = useState(""); // Filter by role
  const [filterDob, setFilterDob] = useState(""); // Filter by date of birth
  const [filterAddress, setFilterAddress] = useState(""); // Filter by address
  const [availableDobs, setAvailableDobs] = useState([]); // List of available birth years
  const [availableAddresses, setAvailableAddresses] = useState([]); // List of available addresses

  // Fetch users
  useEffect(() => {
    const getUsers = async () => {
      try {
        const data = await fetchUsers();
        setUserss(data);

        // Get all available years and addresses
        const uniqueYears = [...new Set(data.map(user => new Date(user.birthday).getFullYear()))];
        const uniqueAddresses = [...new Set(data.map(user => user.address))];

        setAvailableDobs(uniqueYears);
        setAvailableAddresses(uniqueAddresses);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    };

    getUsers();
  }, []);

  // Filter users based on criteria
  const filteredUsers = users.filter((user) => {
    const matchesRole = filterRole ? user.role.toLowerCase().includes(filterRole.toLowerCase()) : true;
    const matchesDob = filterDob ? new Date(user.birthday).getFullYear() === parseInt(filterDob) : true;
    const matchesAddress = filterAddress ? user.address.toLowerCase().includes(filterAddress.toLowerCase()) : true;

    return matchesRole && matchesDob && matchesAddress;
  });

  // Handle delete action
  const handleDelete = async () => {
    try {
      if (userToDelete) {
        await deleteUser(userToDelete._id);
        setUserss(users.filter(user => user._id !== userToDelete._id));
        toast.success("Xóa người dùng thành công!");
      }
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Lỗi khi xóa người dùng:", error);
      toast.error("Lỗi khi xóa người dùng.");
      setShowDeleteModal(false);
    }
  };

  // Open confirmation modal for delete
  const openDeleteModal = (user) => {
    setUsersToDelete(user);
    setShowDeleteModal(true);
  };

  // Open view modal for user details
  const openViewModal = (user) => {
    setUsersToView(user);
    setShowViewModal(true);
  };

  // Clear all filters
  const clearFilters = () => {
    setFilterRole("");
    setFilterDob("");
    setFilterAddress("");
  };

  return (
    <div className="card shadow-sm p-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="fw-bold">
          <FaUser /> DANH SÁCH NGƯỜI DÙNG
        </h4>

        <div className="d-flex">

          {/* Clear Filters Button */}
          <button className="btn btn-warning me-2" onClick={clearFilters}>
            Xoá Bộ Lọc
          </button>

          {/* Add User Button */}
          <button className="btn btn-primary" onClick={() => console.log("Add User functionality")}>
            <FaPlus /> Thêm Người Dùng
          </button>


        </div>
      </div>

      {/* Filter Section */}
      <div className="row mb-3">
        {/* Filter by Role */}
        <div className="col-md-4">
          <label htmlFor="roleFilter" className="form-label">Lọc theo vai trò</label>
          <select
            id="roleFilter"
            className="form-select"
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
          >
            <option value="">Tất cả</option>
            <option value="admin">Quản trị viên</option>
            <option value="sales">Nhân viên bán hàng</option>
            <option value="warehouse">Nhân viên kho</option>
            <option value="customer">Khách hàng</option>
          </select>
        </div>

        {/* Filter by Date of Birth */}
        <div className="col-md-4">
          <label htmlFor="dobFilter" className="form-label">Lọc theo năm sinh</label>
          <select
            id="dobFilter"
            className="form-select"
            value={filterDob}
            onChange={(e) => setFilterDob(e.target.value)}
          >
            <option value="">Tất cả</option>
            {availableDobs.map((dob, index) => (
              <option key={index} value={dob}>{dob}</option>
            ))}
          </select>
        </div>

        {/* Filter by Address */}
        <div className="col-md-4">
          <label htmlFor="addressFilter" className="form-label">Lọc theo địa chỉ</label>
          <select
            id="addressFilter"
            className="form-select"
            value={filterAddress}
            onChange={(e) => setFilterAddress(e.target.value)}
          >
            <option value="">Tất cả</option>
            {availableAddresses.map((address, index) => (
              <option key={index} value={address}>{address}</option>
            ))}
          </select>
        </div>
      </div>

      <table className="table table-striped table-bordered table-hover">
        <thead className="table-primary text-center">
          <tr>
            <th><FaEnvelope /> EMAIL</th>
            <th><FaUser /> HỌ TÊN</th>
            <th><FaIdCard /> VAI TRÒ</th>
            <th><FaPhoneAlt /> SỐ ĐIỆN THOẠI</th>
            <th>HÀNH ĐỘNG</th>
          </tr>
        </thead>

        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user._id} className="text-center">
              <td>{user.email || "N/A"}</td>
              <td>{user.full_name || "N/A"}</td>
              <td>{user.role || "N/A"}</td>
              <td>{user.phone || "N/A"}</td>
              <td>
                <button
                  className="btn btn-success btn-sm"
                  onClick={() => openViewModal(user)} // Open modal on view button click
                >
                  <AiOutlineEye /> Xem
                </button>
                <button
                  className="btn btn-danger btn-sm ms-2"
                  onClick={() => openDeleteModal(user)}
                >
                  <AiOutlineDelete /> Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for viewing user details */}
      {showViewModal && (
        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }} id="viewModal" tabIndex="-1" aria-labelledby="viewModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content" style={{ borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
              <div className="modal-header">
                <h4 className="modal-title text-center fw-bold" id="viewModalLabel">CHI TIẾT NGƯỜI DÙNG</h4>
                <button type="button" className="btn-close" aria-label="Close" onClick={() => setShowViewModal(false)}></button>
              </div>
              <div className="modal-body">
                {userToView ? (
                  <div className="table-responsive">
                    <table className="table table-bordered">
                      <tbody>
                        <tr style={{ backgroundColor: '#f9f9f9' }}>
                          <td><strong>Email:</strong></td>
                          <td>{userToView.email}</td>
                        </tr>
                        <tr>
                          <td><strong>Họ Tên:</strong></td>
                          <td>{userToView.full_name}</td>
                        </tr>
                        <tr style={{ backgroundColor: '#f9f9f9' }}>
                          <td><strong>Ngày sinh:</strong></td>
                          <td>{new Date(userToView.birthday).toLocaleDateString()}</td>
                        </tr>
                        <tr>
                          <td><strong>Vai trò:</strong></td>
                          <td>{userToView.role}</td>
                        </tr>
                        <tr style={{ backgroundColor: '#f9f9f9' }}>
                          <td><strong>Số điện thoại:</strong></td>
                          <td>{userToView.phone}</td>
                        </tr>
                        <tr>
                          <td><strong>Địa chỉ:</strong></td>
                          <td>{userToView.address}</td>
                        </tr>
                      </tbody>
                    </table>
                    <hr style={{ width: '80%', margin: '0 auto' }} />
                  </div>
                ) : (
                  <p>Không có dữ liệu người dùng.</p>
                )}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowViewModal(false)}>Đóng</button>
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
                <h5 className="modal-title" id="deleteModalLabel">Xác nhận xóa người dùng</h5>
                <button type="button" className="btn-close" aria-label="Close" onClick={() => setShowDeleteModal(false)}></button>
              </div>
              <div className="modal-body">
                <p>Bạn có chắc chắn muốn xóa người dùng này?</p>
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
  );
};

export default User;