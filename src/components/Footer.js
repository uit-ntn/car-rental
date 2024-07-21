import React from "react";
import { Link } from "react-router-dom";
import "../styles/Footer.css";

function Footer() {
  return (
    <footer className="text-center text-lg-start bg-body-tertiary text-muted container-fuild">

      {/*social network section*/}
      <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
        <div className="me-5 d-none d-lg-block">
          <span>Get connected with us on social networks:</span>
        </div>

        <div className="d-flex justify-content-between">
          <Link to="/" className="me-4 text-reset">
            <i className="fab fa-facebook-f"></i>
          </Link>
          <Link to="/" className="me-4 text-reset">
            <i className="fab fa-twitter"></i>
          </Link>
          <Link to="/" className="me-4 text-reset">
            <i className="fab fa-google"></i>
          </Link>
          <Link to="/" className="me-4 text-reset">
            <i className="fab fa-instagram"></i>
          </Link>
          <Link to="/" className="me-4 text-reset">
            <i className="fab fa-linkedin"></i>
          </Link>
          <Link to="/" className="me-4 text-reset">
            <i className="fab fa-github"></i>
          </Link>
        </div>
      </section>

      <section className="d-flex justify-content-between">
        <div className="container text-center text-md-start mt-5">
          <div className="row mt-3">
            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">
                <i className="fas fa-gem me-3"></i>Car Rental
              </h6>
              <p className="text-justify">
                Với đội ngũ nhân viên chuyên nghiệp, tận tâm và giàu kinh nghiệm, chúng tôi cam kết mang đến cho bạn trải nghiệm thuê xe tốt nhất.
              </p>
            </div>

            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">
                Technicals
              </h6>
              <p>
                <Link to="https://react.dev" className="text-reset">React js</Link>
              </p>
              <p>
                <Link to="https://nodejs.org" className="text-reset">Node js</Link>
              </p>
              <p>
                <Link to="https://www.mysql.com" className="text-reset">MySQL</Link>
              </p>
            </div>

            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">
                Useful links
              </h6>
              <p>
                <Link to="/" className="text-reset">Home</Link>
              </p>
              <p>
                <Link to="/about" className="text-reset">About</Link>
              </p>
              <p>
                <Link to="/contact" className="text-reset">Contact</Link>
              </p>
              <p>
                <Link to="/help" className="text-reset">Help</Link>
              </p>
            </div>

            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
              <p><i className="fas fa-home me-3"></i> Đại học quốc gia thành phố Hồ Chí Minh</p>
              <p>
                <i className="fas fa-envelope me-3"></i>
                npthanhnhan2003@gmail.com
              </p>
              <p><i className="fas fa-phone me-3"></i> + 0823 346 347</p>
              <p><i className="fas fa-print me-3"></i> + 0823 346 347</p>
            </div>
          </div>
        </div>
      </section>

      <div className="text-center p-4" style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}>
        Đội ngũ phát triển web với 200 năm kinh nghiệm
      </div>
    </footer>
  );
}

export default Footer;
