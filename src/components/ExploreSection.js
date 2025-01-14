import React from "react";
import { Link } from "react-router-dom";

const ExploreSection = () => {
  return (
    <div className="explore-section container mb-5 bg-light rounded shadow-lg d-flex flex-column flex-md-row align-items-center justify-content-between p-5">
      {/* Hình ảnh */}
      <div className="explore-fix-img me-md-5 mb-4 mb-md-0">
        <img
          src={require("../assets/img/explore-img.png")}
          alt="Explore"
          className="img-fluid rounded"
          style={{
            height: "500px", // Tăng chiều cao
            minWidth: "700px", // Tăng chiều rộng
            objectFit: "cover",
          }}
        />
      </div>

      {/* Nội dung */}
      <div className="explore-item text-center text-md-start">
        <h2 className="fw-bold mb-4" style={{ fontSize: "2rem" }}>
          Bạn muốn biết thêm về Car Rental
        </h2>
        <p className="mb-4 text-justify" style={{ fontSize: "1.5rem" }}>
          Car Rental kết nối khách hàng có nhu cầu thuê xe với hàng ngàn chủ xe ô tô ở
          TPHCM, Hà Nội & các tỉnh thành khác. Chúng tôi hướng đến việc xây dựng cộng đồng
          người dùng ô tô văn minh & uy tín tại Việt Nam.
        </p>
        <Link to="/about" className="btn btn-success btn-lg text-white px-4 py-3 text-center">
          Tìm hiểu thêm
        </Link>
      </div>
    </div>
  );
};

export default ExploreSection;
