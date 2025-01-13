import React from "react";
import "../styles/ExploreSection.css";
import { Link } from "react-router-dom";

const ExploreSection = () => {
  return (
    <div className="explore-section">
      <div className="explore-fix-img">
        <img src={require("../assets/img/explore-img.png")} alt="" />
      </div>
      <div className="explore-item">
        <h2>Bạn muốn biết thêm về Car Rental</h2>
        <p>
          Car Rental kết nối khách hàng có nhu cầu thuê xe với hàng ngàn chủ xe ô tô ở
          TPHCM, Hà Nội & các tỉnh thành khác. Chúng tôi hướng đến việc xây dựng cộng đồng
          người dùng ô tô văn minh & uy tín tại Việt Nam.
        </p>
        <button className="btn btn-success">
          <Link to="/about">Tìm hiểu thêm</Link>
        </button>
      </div>
    </div>
  );
};

export default ExploreSection;
