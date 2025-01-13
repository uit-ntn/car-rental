import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="text-center text-lg-start bg-body-tertiary text-muted container-fuild">

      {/*social network section*/}
      <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
        <div className="me-5 d-none d-lg-block">
          <span>Liên hệ với chúng tôi:</span>
        </div>

        <div className="d-flex justify-content-between">
          <Link to="https://www.facebook.com/UIT.NTN.13" className="me-4 text-reset">
            <i className="fab fa-facebook-f"></i>
          </Link>
          <Link to="/" className="me-4 text-reset">
            <i className="fab fa-twitter"></i>
          </Link>
          <Link to="/" className="me-4 text-reset">
            <i className="fab fa-google"></i>
          </Link>
          <Link to="https://www.instagram.com/np_thanh_nhan" className="me-4 text-reset">
            <i className="fab fa-instagram"></i>
          </Link>
          <Link to="https://www.linkedin.com/in/nguyen-nhan-732a66247/" className="me-4 text-reset">
            <i className="fab fa-linkedin"></i>
          </Link>
          <Link to="https://github.com/uit-ntn" className="me-4 text-reset">
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
              <p className="text-muted text-justify">
                Với đội ngũ nhân viên chuyên nghiệp, tận tâm và giàu kinh nghiệm, chúng tôi cam kết mang đến cho bạn trải nghiệm thuê xe tốt nhất.
              </p>
            </div>

            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">
                Công nghệ sử dụng
              </h6>
              <p>
                <Link to="https://react.dev" className="text-reset">React js</Link>
              </p>
              <p>
                <Link to="https://nodejs.org" className="text-reset">Node js</Link>
              </p>
              <p>
                <Link to="https://mongoDB.com" className="text-reset">MongoDB</Link>
              </p>
              <p>
                <Link to="https://expressjs.com" className="text-reset"> Express js</Link>
              </p>
            </div>

            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">
               Liên kết hữu ích
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
              <h6 className="text-uppercase fw-bold mb-4">Liên hệ</h6>
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
