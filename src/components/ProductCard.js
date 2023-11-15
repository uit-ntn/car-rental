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
      <Link to={`/detail/${id}`} className="transmission">
        Số tự động
      </Link>
      <Link to={`/detail/${id}`} className="delivery">
        Giao xe tận nơi
      </Link>
      <div className="address-box">
        <span className="ggmap-fix-icon">
          <img src={ggmapIcon} alt="" />
        </span>{" "}
        {address}
      </div>
    </div>
    <p className="desc-name">{name}</p>

    <div className="line"></div>
    <div className="info-price">
      <div className="info">
        <span className="star">
          {star}
          <span className="fix-icon">
            <img src={starIcon} alt="" />
          </span>
        </span>

        <span className="trip">{trip} chuyến</span>
      </div>
      <div className="price">{price} USD</div>
    </div>
  </div>
);

export default ProductCard;
