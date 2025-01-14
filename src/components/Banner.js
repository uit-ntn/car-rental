import React from "react";
import banner from "../assets/img/banner.jpg"; 

const Banner = () => {
  return (
    <div
      className="row text-white text-center align-items-center justify-content-center py-3 mx-5 position-relative"
      style={{
        backgroundImage: `url(${banner})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        borderRadius: "10px",
        height: "500px",
        marginTop: "50px",
        overflow: "hidden",
      }}
    >
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 1,
        }}
      ></div>

      {/* Nội dung */}
      <div
        className="col-md-8 position-relative"
        style={{
          zIndex: 2,
        }}
      >
        <h1
          className="display-3 fw-bold text-uppercase"
          style={{
            color: "white",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)",
            padding: "10px",
            display: "inline-block",
          }}
        >
          Car Rental
        </h1>
        <h1
          className="display-3 fw-bold text-uppercase"
          style={{
            color: "white",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)",
            padding: "10px",
            display: "inline-block",
            borderRadius: "5px",
            marginTop: "10px",
          }}
        >
          Cùng Bạn Đến Mọi Hành Trình
        </h1>
        <hr
          className="bg-white mx-auto"
          style={{ width: "40%", height: "2px", margin: "20px 0" }}
        />
        <h5
          className="mt-3"
          style={{
            color: "white",
            textShadow: "1px 1px 2px rgba(0, 0, 0, 0.7)",
            fontSize: "1.2rem",
          }}
        >
          Trải nghiệm sự khác biệt từ{" "}
          <span className="text-success fw-bold">hơn 8000</span> xe gia đình đời mới khắp Việt Nam
        </h5>
      </div>
    </div>
  );
};

export default Banner;
