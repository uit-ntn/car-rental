import React, { useState } from "react";
import AccountLayout from "../components/AccountLayout";
import "../styles/ResetPW.css";

function ResetPW() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handlePasswordChange = async (event) => {
    event.preventDefault();
    if (newPassword !== confirmNewPassword) {
      setErrorMessage("New passwords do not match.");
      return;
    }

    try {
      const response = await fetch("", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          oldPassword,
          newPassword,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      setErrorMessage("");
    } catch (error) {
      console.error("Error changing password:", error);
      setErrorMessage("Error changing password. Please try again.");
    }
  };

  return (
    <AccountLayout>
      <form className="resetpw-form" onSubmit={handlePasswordChange}>
        <div className="resetpw-heading">
          <h3>Thay đổi mật khẩu</h3>
        </div>
        <div className="resetpw-input">
          <label htmlFor="oldPassword">Nhập mật khẩu cũ</label>
          <input
            type="password"
            id="oldPassword"
            name="oldPassword"
            placeholder="Old password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
        </div>
        <div className="resetpw-input">
          <label htmlFor="newPassword">Nhập mật khẩu mới</label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            placeholder="New password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <div className="resetpw-input">
          <label htmlFor="confirmNewPassword">Nhập lại mật khẩu mới</label>
          <input
            type="password"
            id="confirmNewPassword"
            name="confirmNewPassword"
            placeholder="Re-type new password"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
          />
        </div>
        {errorMessage && <div className="resetpw-error">{errorMessage}</div>}
        <div className="resetpw-button">
          <button type="submit">Lưu</button>
        </div>
      </form>
    </AccountLayout>
  );
}

export default ResetPW;
