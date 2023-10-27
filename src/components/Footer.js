import React from "react";
import "../styles/Footer.css"
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
                        <h5>chính sách và quy định</h5>
                        <p>quy chế hoạt động</p>
                        <p>Bảo mật thông tin</p>
                        <p>Giải quyết tranh chấp</p>
                    </div>
                    <div className="explore">
                        <h5>tìm hiểu thêm</h5>
                        <p>Hướng dẫn chung</p>
                        <p>Hướng dẫn đặt xe</p>
                        <p>Hướng dẫn thanh toán</p>
                        <p>Hỏi và trả lời</p>
                    </div>
                    <div className="about">
                        <h5>về Car Rental</h5>
                        <p>Car Rental blog</p>
                        <p>Tuyển dụng</p>
                    </div>
                </li>
            </ul>
        </div>
    )
}
export default Footer;