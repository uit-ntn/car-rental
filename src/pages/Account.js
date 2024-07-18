import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import AccountLayout from "../components/AccountLayout";
import "../styles/Account.css";

const Account = () => {
  // Account information state
  const [userData, setUserData] = useState({});
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [updateMode, setUpdateMode] = useState(false);

  // Driving license state
  const [licenseData, setLicenseData] = useState({
    licenseNumber: "",
    licenseName: "",
    licenseImage: null, // New state for storing license image
  }); const [editLicenseMode, setEditLicenseMode] = useState(false);

  // Fetch user data and driving license data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = Cookies.get("userId");

        if (userId) {
          // Fetch user data
          const userResponse = await fetch(`http://127.0.0.1:8000/api/user/`);
          if (!userResponse.ok) {
            throw new Error(`HTTP Error! Status: ${userResponse.status}`);
          }
          const userData = await userResponse.json();
          setUserData(userData);

          // Fetch driving license data
          // Placeholder for actual API call
          const licenseResponse = await fetch(`https://example.com/api/license`);
          if (!licenseResponse.ok) {
            throw new Error(`HTTP Error! Status: ${licenseResponse.status}`);
          }
          const licenseData = await licenseResponse.json();
          setLicenseData(licenseData);
        }
      } catch (error) {
        console.error("Error fetching data from API:", error);
      }
    };

    fetchData();
  }, []);

  // Handle avatar change
  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    setSelectedAvatar(file);
  };

  // Handle update click for account information
  const handleUpdateClick = async (event) => {
    event.preventDefault();
    try {
      // Update user data logic
      // Placeholder for actual API call
      const formData = new FormData();
      formData.append("avatar", selectedAvatar);
      // ... append other user data fields to formData
      const updateResponse = await fetch(`https://6539dce6e3b530c8d9e8c413.mockapi.io/car-rental/user/1`, {
        method: "PUT",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (!updateResponse.ok) {
        throw new Error(`HTTP Error! Status: ${updateResponse.status}`);
      }
      const updatedData = await updateResponse.json();
      setUserData(updatedData);
      setUpdateMode(false);
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  // Handle input change for account information
  const handleInputChange = (e, field) => {
    const { value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [field]: value,
    }));
  };

  // Handle edit click for driving license information
  const handleLicenseEditClick = () => {
    setEditLicenseMode((prevMode) => !prevMode);
  };

  // Handle update click for driving license information
  const handleLicenseUpdateClick = async (event) => {
    event.preventDefault();
    try {
      // Update driving license data logic
      // Placeholder for actual API call
      const updateLicenseResponse = await fetch(`https://example.com/api/updateLicense`, {
        method: "PUT",
        body: JSON.stringify(licenseData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!updateLicenseResponse.ok) {
        throw new Error(`HTTP Error! Status: ${updateLicenseResponse.status}`);
      }
      const updatedLicenseData = await updateLicenseResponse.json();
      setLicenseData(updatedLicenseData);
      setEditLicenseMode(false);
    } catch (error) {
      console.error("Error updating driving license data:", error);
    }
  };

  // Handle input change for driving license information
  const handleLicenseInputChange = (e, field) => {
    const { value, files } = e.target;

    if (field === "licenseImage" && files && files.length > 0) {
      const file = files[0];
      setLicenseData((prevLicenseData) => ({
        ...prevLicenseData,
        [field]: file,
      }));
    } else {
      setLicenseData((prevLicenseData) => ({
        ...prevLicenseData,
        [field]: value,
      }));
    }
  };
  return (
    <AccountLayout>
      {userData && (
        <div className="account-container">
          <div className="account-info-section">

            <div className="account-header">
              <h2 className="account-title">Thông tin tài khoản</h2>
              <div>
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
                      type="date"
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
          <div className="driving-license-container">
            <div className="driving-lincense-header">
              <h3>Giấy phép lái xe</h3>
              <div className="driving-license-actions-box">
                <div className="driving-license-actions">
                  <button onClick={handleLicenseEditClick}>
                    {editLicenseMode ? "Hủy" : "Chỉnh sửa"}
                  </button>
                </div>
                {editLicenseMode && (
                  <div className="driving-license-actions">
                    <button onClick={handleLicenseUpdateClick}>Cập nhật</button>
                  </div>
                )}
              </div>
            </div>
            <div className="driving-license-info">
              {editLicenseMode ? (
                <div className="info-license">
                  <div className="license-custom-input">
                    <p>Số GPLX</p>
                    <input
                      type="text"
                      name="licenseNumber"
                      value={licenseData.licenseNumber || ""}
                      onChange={(e) => handleLicenseInputChange(e, "licenseNumber")}
                    />
                  </div>
                  <div className="license-custom-input">
                    <p>Nhập họ tên đầy đủ</p>
                    <input
                      type="text"
                      name="licenseName"
                      value={licenseData.licenseName || ""}
                      onChange={(e) => handleLicenseInputChange(e, "licenseName")}
                    />
                  </div>
                  {/* Add the input field for license image here */}
                  <div className="license-custom-input">
                    <p>Ảnh giấy phép lái xe</p>
                    <input
                      type="file"
                      accept="image/*"
                      name="licenseImage"
                      onChange={(e) => handleLicenseInputChange(e, "licenseImage")}
                    />
                  </div>
                </div>
              ) : (
                <div className="info-license">
                  <p>Số GPLX: {licenseData.licenseNumber || "N/A"}</p>
                  <p>Nhập họ tên đầy đủ: {licenseData.licenseName || "N/A"}</p>
                  {/* Add the rendering for the license image here */}
                  <img
                    className="license-image"
                    src={licenseData.licenseImage ? licenseData.licenseImage : ""}
                    alt="License Image"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </AccountLayout>
  );
};
export default Account;