import React, { useState, useEffect } from "react";
import { AiOutlineEye, AiOutlineDelete } from "react-icons/ai";
import { FaUser, FaEnvelope, FaPhoneAlt, FaIdCard, FaPlus } from "react-icons/fa";
import { fetchUsers, createUser, updateUser, deleteUser } from "../services/userService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const User = () => {
  const [users, setUserss] = useState([]);
  const [userToDelete, setUsersToDelete] = useState(null);
  const [userToView, setUsersToView] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
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

  // Handle create action
  const handleCreateUser = async () => {
    try {
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const role = document.getElementById("role").value;
      const full_name = document.getElementById("full_name").value;
      const phone = document.getElementById("phone").value;
      const address = document.getElementById("address").value;
      const newUser = { email, password, role, full_name, phone, address };
      await createUser(newUser);
      setUserss([...users, newUser]);
      toast.success("Tạo người dùng mới thành công!");
      setShowCreateModal(false);
    } catch (error) {
      console.error("Lỗi khi tạo người dùng:", error);
      toast.error("Lỗi khi tạo người dùng.");
      setShowCreateModal(false);
    }
  };

  // Handle update action
  const handleUpdateUser = async () => {
    try {
      const email = document.getElementById("email_update").value;
      const role = document.getElementById("role_update").value;
      const full_name = document.getElementById("full_name_update").value;
      const phone = document.getElementById("phone_update").value;
      const address = document.getElementById("address_update").value;
      const birthday = document.getElementById("birthday_update").value;
      const updatedUser = { email, role, full_name, phone, address, birthday };
      await updateUser(userToView._id, updatedUser);
      const updatedUsers = users.map(user => (user._id === userToView._id ? updatedUser : user));
      setUserss(updatedUsers);
      toast.success("Cập nhật thông tin người dùng thành công!");
      setShowUpdateModal(false);
    } catch (error) {
      console.error("Lỗi khi cập nhật người dùng:", error);
      toast.error("Lỗi khi cập nhật người dùng.");
      setShowUpdateModal(false);
    }
  };


  // Handle delete action
  const handleDeleteUser = async () => {
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
          <button className="btn btn-primary" onClick={() => setShowCreateModal(true)}>
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
                  onClick={() => openViewModal(user)}
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
                <button type="button" className="btn btn-primary" onClick={() => setShowUpdateModal(true)}>Sửa</button>
                <button type="button" className="btn btn-secondary" onClick={() => setShowViewModal(false)}>Đóng</button>
              </div>
            </div>
          </div>
        </div>
      )}


      {/* Modal for update user details */}
      {showUpdateModal && (
        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }} id="updateModal" tabIndex="-1" aria-labelledby="updateModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content" style={{ borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
              <div className="modal-header">
                <h5 className="modal-title" id="updateModalLabel">Cập nhật thông tin người dùng</h5>
                <button type="button" className="btn-close" aria-label="Close" onClick={() => setShowUpdateModal(false)}></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control"
                      placeholder={userToView.email}
                      defaultValue={userToView.email}
                     id="email_update" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="role" className="form-label">Vai trò</label>
                    <select id="role_update" className="form-select" defaultValue={userToView.role}>
                      <option value="admin">Quản trị viên</option>
                      <option value="sales">Nhân viên bán hàng</option>
                      <option value="warehouse">Nhân viên kho</option>
                      <option value="customer">Khách hàng</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="full_name" className="form-label">Họ Tên</label>
                    <input type="text" className="form-control" 
                    placeholder={userToView.full_name} 
                    defaultValue={userToView.full_name} id="full_name_update" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Số điện thoại</label>
                    <input type="text" className="form-control" 
                      placeholder={userToView.phone} 
                      defaultValue={userToView.phone}
                     id="phone_update" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="address" className="form-label">Địa chỉ</label>
                    <input type="text" className="form-control"
                      placeholder={userToView.address}
                      defaultValue={userToView.address}
                     id="address_update" />
                  </div>
                  <div className="mb-">
                    <label htmlFor="birthday" className="form-label">Ngày sinh</label>
                    <input type="date" className="form-control"
                      placeholder={new Date(userToView.birthday).toLocaleDateString()}
                      defaultValue={new Date(userToView.birthday).toLocaleDateString()}
                     id="birthday_update" />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary" onClick={() => {
                  setShowUpdateModal(false);
                  handleUpdateUser();
                }}>Cập nhật</button>
                <button type="button" className="btn btn-secondary" onClick={() => setShowUpdateModal(false)}>Đóng</button>
              </div>
            </div>
          </div>
        </div>
      )}



      {/* Modal for create user details */}
      {showCreateModal && (
        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }} id="createModal" tabIndex="-1" aria-labelledby="createModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content" style={{ borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
              <div className="modal-header">
                <h5 className="modal-title" id="createModalLabel">Tạo người dùng mới</h5>
                <button type="button" className="btn-close" aria-label="Close" onClick={() => setShowCreateModal(false)}></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">Mật khẩu</label>
                    <input type="password" className="form-control" id="password" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="role" className="form-label">Vai trò</label>
                    <select id="role" className="form-select">
                      <option value="admin">Quản trị viên</option>
                      <option value="sales">Nhân viên bán hàng</option>
                      <option value="warehouse">Nhân viên kho</option>
                      <option value="customer">Khách hàng</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="full_name" className="form-label">Họ Tên</label>
                    <input type="text" className="form-control" id="full_name" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Số điện thoại</label>
                    <input type="text" className="form-control" id="phone" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="address" className="form-label">Địa chỉ</label>
                    <input type="text" className="form-control" id="address" />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary" onClick={() => {
                  setShowCreateModal(false)
                  handleCreateUser();
                }}>Tạo</button>
                <button type="button" className="btn btn-secondary" onClick={() => setShowCreateModal(false)}>Đóng</button>
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
                <button type="button" className="btn btn-danger" onClick={handleDeleteUser}>Xóa</button>
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