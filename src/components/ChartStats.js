import React from "react";

const ChartStats = ({ title, value }) => {
  return (
    <div
      className="card shadow-lg border-0 p-3 position-relative text-white"
      style={{
        borderRadius: "15px",
        background: "linear-gradient(135deg, #007bff 0%, #0056b3 100%)",
        overflow: "hidden",
        transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-5px)";
        e.currentTarget.style.boxShadow = "0px 15px 30px rgba(0, 91, 187, 0.5)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0px 5px 15px rgba(0, 91, 187, 0.3)";
      }}
    >
      {/* Hiệu ứng ánh sáng góc trên */}
      <div
        className="position-absolute"
        style={{
          top: "-20px",
          right: "-20px",
          background: "rgba(255, 255, 255, 0.2)",
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          filter: "blur(20px)",
        }}
      ></div>

      {/* Tiêu đề */}
      <h5 className="text-uppercase fw-bold text-center mb-2">{title}</h5>

      {/* Giá trị hiển thị */}
      <div className="d-flex align-items-center justify-content-center py-3">
        <h1 className="fw-bold" style={{ fontSize: "2.8rem" }}>{value}</h1>
      </div>

      {/* Hiệu ứng ánh sáng góc dưới */}
      <div
        className="position-absolute"
        style={{
          bottom: "-20px",
          left: "-20px",
          background: "rgba(255, 255, 255, 0.2)",
          width: "80px",
          height: "80px",
          borderRadius: "50%",
          filter: "blur(25px)",
        }}
      ></div>
    </div>
  );
};

export default ChartStats;
