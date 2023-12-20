import React, { useState, useEffect } from "react";
import "../styles/NotifyModal.css";
import { useAuth } from "../hooks/useAuthentication";

function NotifyModal() {
  const { userId } = useAuth();
  const [userContracts, setUserContracts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const contractAPI = "";

  useEffect(() => {
    if (userId) {
      // Chỉ gọi API khi người dùng đã đăng nhập
      fetch(`${contractAPI}?user_id=${userId}`)
        .then((response) => response.json())
        .then((data) => {
          setUserContracts(data);
          setIsLoading(false);
        })
        .catch((error) => console.error("Error fetching data:", error));
    }
  }, [contractAPI, userId]);

  const calculateRemainingDays = (startDate) => {
    const today = new Date();
    const start = new Date(startDate);
    const differenceInTime = start.getTime() - today.getTime();
    const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));

    return differenceInDays;
  };

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  if (!userId) {
    // Người dùng chưa đăng nhập, không hiển thị NotifyModal
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
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5>DANH SÁCH HỢP ĐỒNG THUÊ XE</h5>
            </div>
            <div className="modal-body">
              {isLoading ? (
                <p>Loading...</p>
              ) : (
                <ul>
                  {userContracts.map((contract) => (
                    <li
                      key={contract.id}>
                      <p>
                        Hợp đồng #{contract.id}
                      </p>
                      <p>
                        Trạng thái : {contract.DEPOSIT_STATUS}
                      </p>
                      {calculateRemainingDays(contract.startDate) >= 0 ? (
                        <>
                          {contract.RETURN_STATUS}
                          Số ngày còn lại: {calculateRemainingDays(contract.startDate)}
                        </>
                      ) : (
                        <>{contract.RETURN_STATUS}
                          Quá hạn: {Math.abs(calculateRemainingDays(contract.startDate))} ngày
                        </>
                      )}

                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={handleClose}>
                Đóng
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotifyModal;
