import React from "react";

const InstructionSection = () => {
  const cardStyle = {
    minHeight: "300px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
  };

  const imgStyle = {
    height: "250px", // fixed height
    width: "auto",
  };

  return (
    <div className="instruction-section container-fluid py-5 my-5">
      <div className="row">
        <div className="col-12 text-center mb-4">
          <h1 className="fw-bold">Hướng dẫn thuê xe</h1>
          <h3>Chỉ với 4 bước đơn giản để trải nghiệm thuê xe Mioto một cách nhanh chóng</h3>
        </div>
      </div>
      <div className="row justify-content-center my-4">
        <div className="col-md-3 col-6 text-center">
          <div className="p-3 border rounded" style={cardStyle}>
            <img
              src={require("../assets/img/tutorial-img-1.png")}
              alt=""
              style={imgStyle}
              className="mb-3"
            />
            <p className="fw-bold">
              <span className="badge bg-success me-2">1</span>Đặt xe trên web Car Rental
            </p>
          </div>
        </div>
        <div className="col-md-3 col-6 text-center">
          <div className="p-3 border rounded" style={cardStyle}>
            <img
              src={require("../assets/img/tutorial-img-2.png")}
              alt=""
              style={imgStyle}
              className="mb-3"
            />
            <p className="fw-bold">
              <span className="badge bg-success me-2">2</span>Nhận xe
            </p>
          </div>
        </div>
        <div className="col-md-3 col-6 text-center">
          <div className="p-3 border rounded" style={cardStyle}>
            <img
              src={require("../assets/img/tutorial-img-3.png")}
              alt=""
              style={imgStyle}
              className="mb-3"
            />
            <p className="fw-bold">
              <span className="badge bg-success me-2">3</span>Bắt đầu hành trình
            </p>
          </div>
        </div>
        <div className="col-md-3 col-6 text-center">
          <div className="p-3 border rounded" style={cardStyle}>
            <img
              src={require("../assets/img/tutorial-img-4.png")}
              alt=""
              style={imgStyle}
              className="mb-3"
            />
            <p className="fw-bold">
              <span className="badge bg-success me-2">4</span>Trả xe và kết thúc chuyến đi
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructionSection;
