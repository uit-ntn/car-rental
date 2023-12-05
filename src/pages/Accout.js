import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import AccountLayout from "../components/AccountLayout";
import "../styles/Account.css";

const Account = () => {
  const [userData, setUserData] = useState({});
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [updateMode, setUpdateMode] = useState(false);

  // Lấy dữ liệu người dùng thông qua ID
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = Cookies.get("userId");

        if (userId) {
          const response = await fetch(`https://6539dce6e3b530c8d9e8c413.mockapi.io/car-rental/user/1`);
          if (!response.ok) {
            throw new Error(`Lỗi HTTP! Trạng thái: ${response.status}`);
          }

          const data = await response.json();
          setUserData(data);
        }
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu từ API:", error);
      }
    };

    fetchData();
  }, []);

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    setSelectedAvatar(file);
  };

  // Cập nhật dữ liệu
  const handleUpdateClick = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("avatar", selectedAvatar);
      formData.append("firstName", userData.firstName);
      formData.append("lastName", userData.lastName);
      formData.append("dateOfBirth", userData.dateOfBirth);
      formData.append("gender", userData.gender);
      formData.append("phoneNumber", userData.phoneNumber);
      formData.append("email", userData.email);
  
      const updateResponse = await fetch(`https://6539dce6e3b530c8d9e8c413.mockapi.io/car-rental/user/1`, {
        method: "PUT",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      if (!updateResponse.ok) {
        throw new Error(`Lỗi HTTP! Trạng thái: ${updateResponse.status}`);
      }
  
      const updatedData = await updateResponse.json();
      setUserData(updatedData);
      setUpdateMode(false);
    } catch (error) {
      console.error("Lỗi khi cập nhật dữ liệu:", error);
    }
  };
  

  const handleInputChange = (e, field) => {
    const { value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [field]: value,
    }));
  };

  return (
    <AccountLayout>
      {userData && (
        <div className="account-container">
          <div className="account-header">
            <h2 className="account-title">Thông tin tài khoản</h2>
            <button
              className="account-update-btn"
              onClick={() => setUpdateMode((prevMode) => !prevMode)}
            >
              {updateMode ? "Hủy" : "Cập nhật"}
            </button>
            {updateMode && (
              <button className="account-update-btn" onClick={handleUpdateClick}>
                Lưu
              </button>
            )}
          </div>

          <div className="account-avt-box">
            <div className="account-avt-fix">
              <img className="account-avatar" alt="" src={userData.avatar} />
            </div>
            <div className="user-fullname">{userData.firstName + " " + userData.lastName}</div>
            {updateMode && (
              <div className="account-info-item">
                <input type="file" accept="image/*" onChange={handleAvatarChange} />
              </div>
            )}
          </div>

          <div className="account-info-user">
            <div className="account-info-item">
              <h3 className="account-info-label">Họ</h3>
              <div className="account-info-value">
                {updateMode ? (
                  <input
                    type="text"
                    className="account-info-value"
                    value={userData.firstName || ""}
                    placeholder="Nhập họ của bạn"
                    onChange={(e) => handleInputChange(e, "firstName")}
                  />
                ) : (
                  <p className="account-info-value">{userData.firstName || "N/A"}</p>
                )}</div>
            </div>
            <div className="account-info-item">
              <h3 className="account-info-label">Tên</h3>
              <div className="account-info-value">
                {updateMode ? (
                  <input
                    className="account-info-value"
                    type="text"
                    value={userData.lastName || ""}
                    placeholder="Nhập tên của bạn"
                    onChange={(e) => handleInputChange(e, "lastName")}
                  />
                ) : (
                  <p className="account-info-value">{userData.lastName || "N/A"}</p>
                )}
              </div>
            </div>


            <div className="account-info-item">
              <h3 className="account-info-label">Ngày sinh</h3>
              <div className="account-info-value">
                {updateMode ? (
                  <input
                    type="text"
                    value={userData.dateOfBirth || ""}
                    placeholder="Nhập ngày sinh của bạn"
                    onChange={(e) => handleInputChange(e, "dateOfBirth")}
                  />
                ) : (
                  <p>{userData.dateOfBirth || "N/A"}</p>
                )}
              </div>
            </div>
            <div className="account-info-item">
              <h3 className="account-info-label">Giới tính</h3>
              <div className="account-info-value">
                {updateMode ? (
                  <input
                    type="text"
                    value={userData.gender || ""}
                    placeholder="Nhập giới tính của bạn"
                    onChange={(e) => handleInputChange(e, "gender")}
                  />
                ) : (
                  <p>{userData.gender || "N/A"}</p>
                )}
              </div>
            </div>
            <div className="account-info-item">
              <h3 className="account-info-label">Số điện thoại</h3>
              <div className="account-info-value">
                {updateMode ? (
                  <input
                    type="text"
                    value={userData.phoneNumber || ""}
                    placeholder="Nhập số điện thoại của bạn"
                    onChange={(e) => handleInputChange(e, "phoneNumber")}
                  />
                ) : (
                  <p>{userData.phoneNumber || "N/A"}</p>
                )}
              </div>
            </div>
            <div className="account-info-item">
              <h3 className="account-info-label">Email</h3>
              <div className="account-info-value">
                {updateMode ? (
                  <input
                    type="text"
                    value={userData.email || ""}
                    placeholder="Nhập email của bạn"
                    onChange={(e) => handleInputChange(e, "email")}
                  />
                ) : (
                  <p>{userData.email || "N/A"}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </AccountLayout>
  );
};

export default Account;
