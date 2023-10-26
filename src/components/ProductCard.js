// ProductCard.js
import React from "react";
import { Link } from "react-router-dom";
import "../styles/ProductCard.css";

const ProductCard = ({ id, image, name, address }) => (
  <div className="product-card-box">
    <div className="product-fix-img">
      <Link to={`/product/${id}`}>
        <img src={image} alt="" />
      </Link>
    </div>
    <div className="product-card-actions">
      <button className="transmission">Số tự động</button>
      <button className="delivery">Giao xe tận nơi</button>
    </div>
    <p className="desc-name">{name}</p>
    <div className="address">{address}</div>
  </div>
);

export default ProductCard;
