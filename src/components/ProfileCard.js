import React from "react";
import "../styles/ProfileCard.css";
function ProfileCard(props) {
    return (
        <>
            <div className="profile-card">
                <img
                    src={props.IMG ? props.IMG : "https://cdn.vectorstock.com/i/preview-1x/62/38/avatar-13-vector-42526238.jpg"}
                    alt=""
                    className="profile-avatar"
                />
                <p className="profile-heading">Hello {props.FIRST_NAME ? props.FIRST_NAME : "" } {props.LAST_NAME ? props.LAST_NAME :""}</p>
                <p>{props.DOB ? props.DOB : "Ngày sinh"}</p>
            </div>

        </>
    )
}
export default ProfileCard;