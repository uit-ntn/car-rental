import React from "react";

const ChartStats = ({ title, value }) => {
  return (
    <div className="card shadow-lg rounded-3 border-0">
      <div
        className="card-header text-white text-center fw-bold"
        style={{
          background: "linear-gradient(90deg, #007bff, #0056b3)",
          borderTopLeftRadius: "12px",
          borderTopRightRadius: "12px",
          padding: "12px",
          fontSize: "2rem",
        }}
      >
        {title}
      </div>
      <div className="card-body text-center d-flex align-items-center justify-content-center">
        <h1 className="fw-bold text-primary">{value}</h1>
      </div>
    </div>
  );
};

export default ChartStats;
