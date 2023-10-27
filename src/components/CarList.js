import React from "react";
import ProductCard from "./ProductCard";
import "../styles/CarList.css";

const CarList = ({ cars }) => (
  <ul className="Car-list-container">
    {cars.map((car, index) => (
      <li key={index}>
        <ProductCard key={index} 
        id={car.id} 
        image={car.image} 
        name={car.name} 
        address={car.address} 
        star ={car.star} 
        price={car.price}
        trip = {car.trip}/>
      </li>
    ))}
  </ul>
);

export default CarList;
