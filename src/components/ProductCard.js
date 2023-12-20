import React from "react";
import { Link } from "react-router-dom";
import "../styles/ProductCard.css";
import starIcon from "../assets/img/star.png";
import ggmapIcon from "../assets/img/google-map-icon.png";

const ProductCard = ({ id, image, name, address, price, star, trip }) => (

  <div className="product-card-box">
    <div className="product-fix-img">
      <Link to={`/detail/${id}`}>
        <img src={image} alt="" />
      </Link>
    </div>
    <div className="product-card-actions">
      <p className="transmission">
        <Link to={`/detail/${id}`} >
        </Link>
        Số tự động
      </p>
      <p className="delivery">
        <Link to={`/detail/${id}`}>
        </Link>
        Giao xe tận nơi
      </p>
    </div>

    <div className="address-box">
      <div className="ggmap-fix-icon">
        <img src={ggmapIcon} alt="" />
      </div>{" "}
      {address}
    </div>

    <p className="desc-name">{name}</p>

    <div className="line"></div>
    <div className="info-price">
      <div className="info">
        <div className="star-info">
          <p>{star}</p>
          <div className="fix-icon">
            <img src={starIcon} alt="" />
          </div>
        </div>
        <span className="trip">{trip} chuyến</span>
      </div>
      <div className="price">{price}k VND</div>
    </div>
  </div>
);

export default ProductCard;
