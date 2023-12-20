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
                    <p><Link to={`/mycars/${Cookies.get("userId")}`}>Xe của tôi</Link></p>
                </div>
                <div>
                    <p><Link to = {`/cart/${Cookies.get("userId")}`}>Giỏ hàng</Link></p>
                </div>
                <div>
                    <p><Link to={`/transaction-history/${Cookies.get("userId")}`}>Lịch sử giao dịch</Link></p>
                </div>
                <div>
                    <p>
                        <Link to={`/resetpw/${Cookies.get("userId")}`}>Đổi mật khẩu</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
export default SideBar;