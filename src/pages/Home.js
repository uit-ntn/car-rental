import React, { useState } from "react";
import Layout from "../layouts/Layout";
import CarList from "../components/CarList";
import Slider from "../components/Slider";
import SearchBar from "../components/SearchBar";
import InstructionSection from "../components/InstructionSection";
import ExploreSection from "../components/ExploreSection";
import "../styles/Home.css";

const Home = () => {
  const [cars, setCars] = useState([]);

  return (
    <>
      <Layout>
        <div className="container-fuild home-content">
          {/* Banner section */}
          <div className="row banner-container">
            <div className="col background">
              <h1>Car Rental - Cùng Bạn Đến</h1>
              <h1>Mọi Hành Trình</h1>
              <div className="line"></div>
              <h5>
                Trải nghiệm sự khác biệt từ <span>hơn 8000</span> xe gia đình đời mới khắp
                Việt Nam
              </h5>
            </div>
          </div>

          {/* Search options section */}
          <SearchBar />

          {/* Promo section */}
          <Slider />

          {/* Service section */}
          <div className="service-section"></div>

          {/* Featured car section */}
          <div className="featured-car-section">
            <h2>Xe Dành Cho Bạn</h2>
            <CarList cars={cars} />
          </div>

          {/* Instruction section */}
          <InstructionSection />

          {/* Explore section */}
          <ExploreSection />
        </div>
      </Layout>
    </>
  );
};

export default Home;
