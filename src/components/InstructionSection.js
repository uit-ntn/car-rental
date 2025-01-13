import React from "react";
import "../styles/InstructionSection.css";

const InstructionSection = () => {
  return (
    <div className="instruction-section d-flex flex-column align-items-center">
      <div className="instruction-section-title text-center mb-4">
        <h3>Hướng dẫn thuê xe</h3>
        <p>Chỉ với 4 bước đơn giản để trải nghiệm thuê xe Mioto một cách nhanh chóng</p>
      </div>
      <div className="tutorial-container d-flex justify-content-center">
        <div className="tutorial-item">
          <div className="tutorial-fix-img">
            <img
              src={require("../assets/img/tutorial-img-1.png")}
              alt=""
              className="img-fluid"
            />
          </div>
          <p>
            <span>1</span> Đặt xe trên web Car Rental
          </p>
        </div>
        <div className="tutorial-item">
          <div className="tutorial-fix-img">
            <img
              src={require("../assets/img/tutorial-img-2.png")}
              alt=""
              className="img-fluid"
            />
          </div>
          <p>
            <span>2</span> Nhận xe
          </p>
        </div>
        <div className="tutorial-item">
          <div className="tutorial-fix-img">
            <img
              src={require("../assets/img/tutorial-img-3.png")}
              alt=""
              className="img-fluid"
            />
          </div>
          <p>
            <span>3</span> Bắt đầu hành trình
          </p>
        </div>
        <div className="tutorial-item">
          <div className="tutorial-fix-img">
            <img
              src={require("../assets/img/tutorial-img-4.png")}
              alt=""
              className="img-fluid"
            />
          </div>
          <p>
            <span>4</span> Trả xe và kết thúc chuyến đi
          </p>
        </div>
      </div>
    </div>
  );
};

export default InstructionSection;
