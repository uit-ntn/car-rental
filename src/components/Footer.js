import React from "react";
import { Link } from "react-router-dom";
import "../styles/Footer.css";

function Footer() {
    return (
        <div className="footer">
            <ul className="footer-content">
                <li className="footer-info">
                    <h1>CAR RENTAL</h1>
                    <div className="phone-contact">
                        <p>0823 346 347</p>
                        <p>Tổng đài hỗ trợ : 24/24</p>
                    </div>
                    <div className="email-contact">
                        <p>Gửi mail cho CAR RENTAL</p>
                        <p>contact.carrental@gmail.com</p>
                    </div>
                </li>
                <li className="footer-path">
                    <div className="privacy">
                        <h5>Chính sách và quy định</h5>
                        <Link to="/privacy">Quy chế hoạt động</Link>
                        <Link to="/privacy">Bảo mật thông tin</Link>
                        <Link to="/privacy">Giải quyết tranh chấp</Link>
                    </div>
                    <div className="explore">
                        <h5>Tìm hiểu thêm</h5>
                        <Link to="/instructions">Hướng dẫn chung</Link>
                        <Link to="/instructions">Hướng dẫn đặt xe</Link>
                        <Link to="/instructions">Hướng dẫn thanh toán</Link>
                        <Link to="/instructions">Hỏi và trả lời</Link>
                    </div>
                    <div className="about">
                        <h5>Về Car Rental</h5>
                        <Link to="/about">Car Rental blog</Link>
                        <Link to="/recuit">Tuyển dụng</Link>
                    </div>
                </li>
            </ul>
        </div>
    );
}

export default Footer;
