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
            <footer className="bg-body-tertiary text-center">
                {/* Grid container */}
                <div className="container p-4 pb-0">
                    {/* Section: Social media */}
                    <section className="mb-4">
                        {/* Facebook */}
                        <a
                            data-mdb-ripple-init=""
                            className="btn text-white btn-floating m-1"
                            style={{ backgroundColor: "#3b5998" }}
                            href="#!"
                            role="button"
                        >
                            <i className="fab fa-facebook-f" />
                        </a>
                        {/* Twitter */}
                        <a
                            data-mdb-ripple-init=""
                            className="btn text-white btn-floating m-1"
                            style={{ backgroundColor: "#55acee" }}
                            href="#!"
                            role="button"
                        >
                            <i className="fab fa-twitter" />
                        </a>
                        {/* Google */}
                        <a
                            data-mdb-ripple-init=""
                            className="btn text-white btn-floating m-1"
                            style={{ backgroundColor: "#dd4b39" }}
                            href="#!"
                            role="button"
                        >
                            <i className="fab fa-google" />
                        </a>
                        {/* Instagram */}
                        <a
                            data-mdb-ripple-init=""
                            className="btn text-white btn-floating m-1"
                            style={{ backgroundColor: "#ac2bac" }}
                            href="#!"
                            role="button"
                        >
                            <i className="fab fa-instagram" />
                        </a>
                        {/* Linkedin */}
                        <a
                            data-mdb-ripple-init=""
                            className="btn text-white btn-floating m-1"
                            style={{ backgroundColor: "#0082ca" }}
                            href="#!"
                            role="button"
                        >
                            <i className="fab fa-linkedin-in" />
                        </a>
                        {/* Github */}
                        <a
                            data-mdb-ripple-init=""
                            className="btn text-white btn-floating m-1"
                            style={{ backgroundColor: "#333333" }}
                            href="#!"
                            role="button"
                        >
                            <i className="fab fa-github" />
                        </a>
                    </section>
                    {/* Section: Social media */}
                </div>
                {/* Grid container */}
            </footer>

        </div>
    );
}

export default Footer;
