import React, { useState, useEffect, useCallback } from 'react';
import slider1 from '../assets/img/slider1.jpg';
import slider2 from '../assets/img/slider2.jpg';
import slider3 from '../assets/img/slider3.jpg';
import slider4 from '../assets/img/slider4.jpg';
import '../styles/Slider.css';

function Slider() {
  const images = [slider1, slider2, slider3, slider4];

  const [currentIndex, setCurrentIndex] = useState(0);
  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, [images.length]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      nextSlide();
    }, 2000);

    return () => {
      clearInterval(intervalId);
    };
  }, [nextSlide]); 
  return (
    <div className="slider">
      <div className="image-container">
        <img
          src={images[currentIndex]}
          alt={`Hình ${currentIndex + 1}`}
          className="active"
        />
      </div>
    </div>
  );
}

export default Slider;
