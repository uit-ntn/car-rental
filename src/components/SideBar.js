import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import React from "react";
import "../styles/SideBar.css"
const SideBar = () => {
    return (

        <div className="sidebar-container">
            <h2>Xin chào bạn !</h2>
            <div className="sidebar-items">
                <div>
                    <p><Link to={`/account/${Cookies.get("userId")}`}>Tài khoản của tôi</Link></p>
                </div>
                <div>
                    <p><Link to="/mycars">Xe của tôi</Link></p>
                </div>
                <div>
                    <p><Link to = {`/cart/${Cookies.get("userId")}`}>Giỏ hàng</Link></p>
                </div>
                <div>
                    <p><Link to="/myaddress">Địa chỉ của tôi</Link></p>
                </div>
                <div>
                    <p>
                        <Link to={`/resetpw`}>Đổi mật khẩu</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
export default SideBar;