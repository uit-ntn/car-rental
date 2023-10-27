import React, { useState } from 'react';
import "../styles/Slider.css";

function Slider() {
    const images = [
        require('../assets/img/slider1.jpg'),
        require('../assets/img/slider2.jpg'),
        require('../assets/img/slider3.jpg'),
        require('../assets/img/slider4.jpg'),
    ];


    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((currentIndex + 1) % images.length);
    };

    const prevSlide = () => {
        setCurrentIndex((currentIndex - 1 + images.length) % images.length);
    };

    return (
        <div className="slider">
            {/* <button onClick={prevSlide}></button> */}
            <div className="image-container">
                {images.map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        alt={`Image ${index + 1}`}
                        className={index === currentIndex ? 'active' : ''}
                    />
                ))}
            </div>
            {/* <button onClick={nextSlide}></button> */}
        </div>
    );
}

export default Slider;
