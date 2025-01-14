import React from "react";
import Layout from "../layouts/Layout";
import CarList from "../components/CarList";
import Slider from "../components/Slider";
import InstructionSection from "../components/InstructionSection";
import ExploreSection from "../components/ExploreSection";
import Banner from "../components/Banner"; // Import Banner

const Home = () => {
  return (
    <Layout>
      <div className="container">
        {/* Banner Section */}
        <Banner />

        {/* Promo Section */}
        <div className="row mt-5">
          <div className="col-xl-12">
            <Slider />
          </div>
        </div>

        {/* Featured Car Section */}
        <div className="row mt-5">
          <div className="col-xl-12">
            <CarList />
          </div>
        </div>

        {/* Instruction Section */}
        <div className="row mt-5">
          <div className="col-xl-12">
            <InstructionSection />
          </div>
        </div>

        {/* Explore Section */}
        <div className="row mt-3">
          <div className="col-xl-12">
            <ExploreSection />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
