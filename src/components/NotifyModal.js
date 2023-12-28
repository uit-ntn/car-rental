import React, { useState, useEffect } from "react";
import "../styles/NotifyModal.css";
import { useAuth } from "../hooks/useAuthentication";

function NotifyModal() {
  const { userId } = useAuth();
  const [userContracts, setUserContracts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const contractAPI = "";

  useEffect(() => {
    if (userId) {
      // Chỉ gọi API khi người dùng đã đăng nhập
      fetch(`${contractAPI}?user_id=${userId}`)
        .then((response) => response.json())
        .then((data) => {
          setUserContracts(data);
        })
        .catch((error) => console.error("Error fetching data:", error));
    }
  }, [contractAPI, userId]);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  // Người dùng chưa đăng nhập, không hiển thị NotifyModal
  if (!userId) {
    return null;
  }

  return (
    <div className="notify-container">
      <button className="btn btn-primary notify-button" onClick={handleShow}>
        <p className="notification">
          <i className="bx bxs-bell" />
          <p className="num">{userContracts.length}</p>
        </p>
      </button>

      <div className={`modal ${showModal ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: showModal ? 'block' : 'none' }}>
          <div className="modal-content">
            <div className="modal-header">
              <h5>DANH SÁCH GIAO DỊCH ĐANG CHỜ DUYỆT</h5>
            </div>
            <div class="container">
              <div class="row">
                <div class="col-12 mb-3 mb-lg-5">
                  <div class="position-relative card table-nowrap table-card">
                    <div class="card-header align-items-center">
                      <h5 class="mb-0">Số giao dịch đang chờ duyệt</h5>
                      <p class="mb-0 small text-muted">1 đang chờ</p>
                    </div>
                    <div class="table-responsive">
                      <table class="table mb-0">
                        <thead class="small text-uppercase bg-body text-muted">
                          <tr>
                            <th>ID Giao dịch</th>
                            <th>Tên xe</th>
                            <th>Ngày Thuê</th>
                            <th>Ngày trả</th>
                            <th>Giá thuê</th>
                            <th>Trạng thái</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr class="align-middle">
                            <td>
                              #57473829
                            </td>
                            <td>Renee Sims</td>
                            <td>13 Sep, 2021</td>
                            <td>19 Aug, 2021</td>
                            <td>
                              <div class="d-flex align-items-center">
                                <span>$145</span>
                              </div>
                            </td>
                            <td>
                              <span class="badge fs-6 fw-normal bg-tint-success text-success">Completed</span>
                            </td>
                          </tr>
                          <tr class="align-middle">
                            <td>
                              #012458780
                            </td>
                            <td>Edith Koenig</td>
                            <td>19 Aug, 2021</td>
                            <td>19 Aug, 2021</td>
                            <td>
                              <div class="d-flex align-items-center">
                                <span>$641.64</span>
                              </div>
                            </td>
                            <td>
                              <span class="badge fs-6 fw-normal bg-tint-warning text-warning">Pending</span>
                            </td>
                          </tr>
                          <tr class="align-middle">
                            <td>
                              #76444326
                            </td>
                            <td>Carrie Blount</td>
                            <td>03 April, 2021</td>
                            <td>19 Aug, 2021</td>
                            <td>
                              <div class="d-flex align-items-center">
                                <span>$12,457</span>
                              </div>
                            </td>
                            <td>
                              <span class="badge fs-6 fw-normal bg-tint-success text-success">Completed</span>
                            </td>
                          </tr>
                          <tr class="align-middle">
                            <td>
                              #76444326
                            </td>
                            <td>Carrie Blount</td>
                            <td>03 April, 2021</td>
                            <td>19 Aug, 2021</td>
                            <td>
                              <div class="d-flex align-items-center">
                                <span>$12,457</span>
                              </div>
                            </td>
                            <td>
                              <span class="badge fs-6 fw-normal bg-tint-success text-success">Completed</span>
                            </td>
                          </tr>
                          <tr class="align-middle">
                            <td>
                              #76444326
                            </td>
                            <td>Carrie Blount</td>
                            <td>03 April, 2021</td>
                            <td>19 Aug, 2021</td>
                            <td>
                              <div class="d-flex align-items-center">
                                <span>$12,457</span>
                              </div>
                            </td>
                            <td>
                              <span class="badge fs-6 fw-normal bg-tint-success text-success">Completed</span>
                            </td>
                          </tr>

                          <tr class="align-middle">
                            <td>
                              #12498745
                            </td>
                            <td>Ander Durham</td>
                            <td>15 March, 2021</td>
                            <td>19 Aug, 2021</td>
                            <td>
                              <div class="d-flex align-items-center">
                                <span>$785</span>
                              </div>
                            </td>
                            <td>
                              <span class="badge fs-6 fw-normal bg-tint-success text-success">Completed</span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="card-footer text-end">
              <button class="btn btn-gray">View All Transactions</button>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={handleClose}>
                Đóng
              </button>
            </div>
          </div>
        </div>
      </div>
  );
}

export default NotifyModal;
