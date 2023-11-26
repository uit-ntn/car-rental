import { Link } from "react-router-dom";
import React from "react";
import "../styles/SideBar.css"
const SideBar = () => {
    return (

        <div className="sidebar-container">
            <h2>Xin chào bạn !</h2>
            <div className="sidebar-items">
                <div>
                    <p><Link to="/account">Tài khoản của tôi</Link></p>
                </div>
                <div>
                    <p><Link to="/mycars">Xe của tôi</Link></p>
                </div>
                <div>
                    <p><Link to="/myaddress">Địa chỉ của tôi</Link></p>
                </div>
                <div>
                    <p>
                        <Link to='resetpw'>Đổi mật khẩu</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
export default SideBar;