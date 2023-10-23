import React from "react";
import Layout from "../components/Layout";
import "../styles/Home.css"

function Home() {
    return (
        <>
            <Layout>
                <div className="home-content">

                    {/*banner section*/}
                    <div className="banner-container">
                        <div className="background">
                            <h1>Car Rental - Cùng Bạn Đến</h1>
                            <h1>Mọi Hành Trình</h1>
                            <div className="line"></div>
                            <h5>Trải nghiệm sự khác biệt từ <span>hơn 8000</span> xe gia đình đời mới khắp Việt Nam</h5>
                        </div>

                    </div>

                    {/*search-options section*/}
                    <div className="search-options">

                    </div>
                    <div className="promo-section"></div>

                    {/*service-section */}
                    <div className="service-section"></div>


                    {/*instruction section*/}
                    <div className="instruction section"></div>

                </div>
            </Layout>
        </>
    )
}
export default Home;