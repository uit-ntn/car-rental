import React from "react";

const CarImageSection = ({ image, alt }) => {
  return (
    <div className="col-md-8 d-flex align-items-start mt-4">
      <img
        src={image}
        alt={alt}
        className="img-fluid rounded shadow-sm"
        style={{
          maxHeight: "500px",
          objectFit: "cover",
          width: "100%",
          border: "1px solid #ccc",
          borderRadius: "8px",
        }}
      />
    </div>
  );
};

export default CarImageSection;
