import React, { useState, useEffect } from "react";
import { AiOutlineEye, AiOutlineDelete } from "react-icons/ai";
import { FaUser, FaEnvelope, FaPhoneAlt, FaIdCard } from "react-icons/fa";
import { fetchUsers, deleteUser } from "../services/userService";
import { ToastContainer, toast } from "react-toastify";

const User = () => {
  const [userData, setUserData] = useState([]);
  const [userToDelete, setUserToDelete] = useState(null);
  const [userToView, setUserToView] = useState(null);

  // Fetch users
  useEffect(() => {
    const getUsers = async () => {
      try {
        const data = await fetchUsers();
        setUserData(data);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    };

    getUsers();
  }, []);

  // Handle delete action
  const handleDelete = async () => {
    try {
      if (userToDelete) {
        await deleteUser(userToDelete._id);
        setUserData(userData.filter(user => user.id !== userToDelete._id));
        toast.success("Xóa người dùng thành công!");
      }
      // Close modal after deletion using Bootstrap JS
      const modal = new window.bootstrap.Modal(document.getElementById('deleteModal'));
      modal.hide();
    } catch (error) {
      console.error("Lỗi khi xóa người dùng:", error);
      toast.error("Lỗi khi xóa người dùng.");
    }
  };

  // Open confirmation modal for delete
  const openDeleteModal = (user) => {
    setUserToDelete(user);
    const modal = new window.bootstrap.Modal(document.getElementById('deleteModal'));
    modal.show();  // Open modal using Bootstrap JS
  };

  // Open view modal for user details
  const openViewModal = (user) => {
    setUserToView(user);  // Set user to view
    const modal = new window.bootstrap.Modal(document.getElementById('viewModal'));
    modal.show();  // Open modal using Bootstrap JS
  };

  return (
    <div className="card shadow-sm p-3">
      <h4 className="fw-bold">
        <FaUser /> Danh sách người dùng
      </h4>
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
          {userData.map((user) => (
            <tr key={user._id} className="text-center">
              <td>{user.email || "N/A"}</td>
              <td>{user.full_name || "N/A"}</td>
              <td>{user.role || "N/A"}</td>
              <td>{user.phone || "N/A"}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm"
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
      <div className="modal fade" id="viewModal" tabIndex="-1" aria-labelledby="viewModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="viewModalLabel">Chi tiết người dùng</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {userToView ? (
                <>
                  <p><strong>Email:</strong> {userToView.email}</p>
                  <p><strong>Họ Tên:</strong> {userToView.full_name}</p>
                  <p><strong>Ngày sinh:</strong> {userToView.birthday}</p>
                  <p><strong>Vai trò:</strong> {userToView.role}</p>
                  <p><strong>Số điện thoại:</strong> {userToView.phone}</p>
                  <p><strong>Địa chỉ :</strong>{userToView.address}</p>
                </>
              ) : (
                <p>Không có dữ liệu người dùng.</p>
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
              <h5 className="modal-title" id="deleteModalLabel">Xác nhận xóa người dùng</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <p>Bạn có chắc chắn muốn xóa người dùng này?</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
              <button type="button" className="btn btn-danger" onClick={handleDelete}>Xóa</button>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={5000} hideProgressBar />
    </div>
  );
};

export default User;
