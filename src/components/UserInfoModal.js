import React, { useState, useEffect } from "react";
import "../styles/UserInfoModal.css";

function UserInfoModal({ USER_ID, onclose }) {
    const userAPI = `https://6539dce6e3b530c8d9e8c413.mockapi.io/car-rental/user/${USER_ID}`;
    const [userData, setUserData] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(userAPI);
                if (!response.ok) {
                    throw new Error("Failed to fetch user data");
                }

                const data = await response.json();
                setUserData(data);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, [userAPI, USER_ID]);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = async () => {
        try {
            const response = await fetch(userAPI, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });

            if (!response.ok) {
                throw new Error("Failed to save user data");
            }

            setIsEditing(false);
        } catch (error) {
            console.error("Error saving user data:", error);
        }
    };



    const renderField = (label, value) => {
        return (
            <div className="user-info-modal-item">
                <p>{label} :</p>
                {isEditing ? (
                    <input
                        type="text"
                        placeholder={value}
                    />
                ) : (
                    <p>{value}</p>
                )}
            </div>
        );
    };

    if (!userData) {
        return <p>Loading...</p>;
    }

    console.log(userData);
    return (
        <div className="user-info-modal-container">
            {renderField("User ID", userData.USER_ID)}
            {renderField("Password", userData.password)}
            {renderField("First name", userData.FIRST_NAME)}
            {renderField("Last name", userData.LAST_NAME)}
            {renderField("Day of birthday", userData.DOB)}
            {renderField("GPLX", userData.GPLX)}
            {renderField("LOCATION", userData.LOCATION)}

            <div className="user-info-modal-actions">

                {!isEditing && (<div className="user-info-modal-btn">
                    <button onClick={handleEditClick}>Chỉnh Sửa</button>
                    <button>Xóa</button>
                    <button onClick={onclose}>Đóng</button>
                </div>)}
                {isEditing && (
                    <div className="user-info-modal-btn">
                        <button onClick={handleSaveClick}>Lưu</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default UserInfoModal;
