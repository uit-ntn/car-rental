import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import React from "react";
import "../styles/SideBar.css";

const SideBar = () => {
    return (
        <div className="sidebar-container">
            <h2>Xin chào bạn !</h2>
            <div className="sidebar-items">
                <div>
                    <p> <Link to={`/account/${Cookies.get("userId")}`}><i className='bx bx-user'></i>Tài khoản của tôi</Link></p>
                </div>
                <div>
                    <p><Link to={`/mycars/${Cookies.get("userId")}`}><i className='bx bxs-car'></i>Xe của tôi</Link></p>
                </div>
                <div>
                    <p><Link to={`/cart/${Cookies.get("userId")}`}><i className='bx bx-cart'></i>Giỏ hàng</Link></p>
                </div>
                <div>
                    <p><Link to={`/transaction-history/${Cookies.get("userId")}`}><i className='bx bx-history'></i>Lịch sử giao dịch</Link></p>
                </div>
                <div>
                    <p><Link to={`/resetpw/${Cookies.get("userId")}`}><i className='bx bx-lock-alt'></i>Đổi mật khẩu</Link></p>
                </div>
            </div>
        </div>
    );
};

export default SideBar;
