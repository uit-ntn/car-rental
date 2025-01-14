import React from 'react';
import slider1 from '../assets/img/slider1.jpg';
import slider2 from '../assets/img/slider2.jpg';
import slider3 from '../assets/img/slider3.jpg';

function Slider() {
  const images = [slider1, slider2, slider3];

  return (
    <div className="promo-section container-fluid px-0 mt-5">
      <h2 className="text-center">Chương trình khuyến mãi</h2>
      <h5 className="text-center">Nhận nhiều ưu đãi từ car-rental</h5>

      {/* Bootstrap Carousel */}
      <div
        id="carouselExample"
        className="carousel slide mt-4"
        data-bs-ride="carousel"
        data-bs-interval="1000" // Slide tự động đổi sau 1 giây
      >
        {/* Indicators */}
        <div className="carousel-indicators">
          {images.map((_, index) => (
            <button
              type="button"
              data-bs-target="#carouselExample"
              data-bs-slide-to={index}
              className={index === 0 ? 'active' : ''}
              aria-current={index === 0 ? 'true' : ''}
              aria-label={`Slide ${index + 1}`}
              key={index}
            ></button>
          ))}
        </div>

        {/* Carousel Items */}
        <div className="carousel-inner">
          {images.map((image, index) => (
            <div
              className={`carousel-item ${index === 0 ? 'active' : ''}`}
              key={index}
            >
              <img
                src={image}
                className="d-block w-100"
                style={{
                  height: '600px', // Điều chỉnh chiều cao slider
                  objectFit: 'contain', // Hiển thị toàn bộ ảnh
                  backgroundColor: 'white', // Thêm nền trắng cho các ảnh nhỏ
                }}
                alt={`Slide ${index + 1}`}
              />
            </div>
          ))}
        </div>

        {/* Controls */}
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
}

export default Slider;
