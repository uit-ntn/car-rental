import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import CarList from "../components/CarList";
import Slider from "../components/Slider";
import SearchBar from "../components/SearchBar";
import "../styles/Home.css";
import { Link } from "react-router-dom";
import { queries } from "@testing-library/react";

function Home() {
    const [cars, setCars] = useState([]);
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('https://6539dce6e3b530c8d9e8c413.mockapi.io/car-rental/car');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setCars(data);
            } catch (error) {
                alert('Error fetching data:', error);
            }
        }
        fetchData();
    }, []);




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
                            <h5>
                                Trải nghiệm sự khác biệt từ <span>hơn 8000</span> xe gia đình đời
                                mới khắp Việt Nam
                            </h5>
                        </div>
                    </div>

                    {/*search-options section*/}
                    <SearchBar> </SearchBar>



                    {/* promo-section */}
                    <div className="promo-section">
                        <h2>Chương trình khuyến mãi</h2>
                        <h5>Nhận nhiều ưu đãi từ car-rental</h5>
                        <Slider></Slider>
                    </div>

                    {/*service-section */}
                    <div className="service-section"></div>

                    {/*featured-car-section */}
                    <div className="featured-car-section">
                        <h2>Xe Dành Cho Bạn</h2>
                        <CarList cars={cars}></CarList>
                    </div>

                    {/*instruction section*/}
                    <div className="instruction-section">
                        <div className="instruction-section-title">
                            <h3>Hướng dẫn thuê xe</h3>
                            <p>Chỉ với 4 bước đơn giản để trải nghiệm thuê xe Mioto một cách nhanh chóng</p>
                        </div>
                        <ul className="tutorial-container">
                            <li>
                                <div className="tutorial-item">
                                    <div className="tutorial-fix-img">
                                        <img src={require("../assets/img/tutorial-img-1.png")} alt=""></img>
                                    </div>
                                    <p><span>1</span>Đặt xe trên
                                        web Car Rental</p>
                                </div>
                            </li>
                            <li>
                                <div className="tutorial-item">
                                    <div className="tutorial-fix-img">
                                        <img src={require("../assets/img/tutorial-img-2.png")} alt=" "></img>
                                    </div>
                                    <p><span>2</span>Nhận xe</p>
                                </div>
                            </li>
                            <li>
                                <div className="tutorial-item">
                                    <div className="tutorial-fix-img">
                                        <img src={require("../assets/img/tutorial-img-3.png")} alt=""></img>
                                    </div>
                                    <p><span>3</span>Bắt đầu hành trình</p>
                                </div>
                            </li>
                            <li>
                                <div className="tutorial-item">
                                    <div className="tutorial-fix-img">
                                        <img src={require("../assets/img/tutorial-img-4.png")} alt=""></img>
                                    </div>
                                    <p><span>4</span>Trả xe và kết thúc chuyến đi</p>
                                </div>
                            </li>
                        </ul>
                    </div>



                    {/* explore-section */}
                    <div className="explore-section">
                        <div className="explore-fix-img">
                            <img src={require('../assets/img/explore-img.png')} alt=""></img>
                        </div>
                        <div className="explore-item">
                            <h2>Bạn muốn biết thêm về Car Rental</h2>
                            <p>Car Rental kết nối khách hàng có nhu cầu thuê xe với hàng ngàn chủ xe ô tô ở TPHCM, Hà Nội & các tỉnh thành khác.
                                Chúng tôi hướng đến việc xây dựng cộng đồng nngười dùng ô tô văn minh & uy tín tại Việt Nam</p>
                            <button>
                                <Link to="/about">
                                    Tìm hiểu thêm
                                </Link>
                            </button>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
}

export default Home;
