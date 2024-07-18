import React, { useState, useEffect } from "react";
import Layout from "../layouts/Layout";
import CarList from "../components/CarList";
import Slider from "../components/Slider";
import SearchBar from "../components/SearchBar";
import "../styles/Home.css";
import { Link } from "react-router-dom";

function Home() {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const apiUrl = "http://127.0.0.1:8000/api/cars";

      fetch(apiUrl, {
        method: "GET",
      })
        .then((res) => {
          if (!res.ok) {
            console.log("Error!");
            throw new Error(res.message);
          }
          return res.json();
        })
        .then((data) => {
          const sortedCars = [...data.data].sort((a, b) => b.STAR - a.STAR);
          setCars(sortedCars.slice(0, 8));
        })
        .catch((error) => console.error("Lỗi khi lấy dữ liệu:", error));
    }
    fetchData();
    console.log(localStorage.getItem('isLoggedIn'));
  }, []);


  return (
    <>
      <Layout>
        <div className="container-fuild home-content">
          {/*banner section*/}
          <div className="row banner-container">
            <div className="col background">
              <h1>Car Rental - Cùng Bạn Đến</h1>
              <h1>Mọi Hành Trình</h1>
              <div className="line"></div>
              <h5>
                Trải nghiệm sự khác biệt từ <span>hơn 8000</span> xe gia đình
                đời mới khắp Việt Nam
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
          <div className="instruction-section d-flex flex-column align-items-center">
            <div className="instruction-section-title text-center mb-4">
              <h3>Hướng dẫn thuê xe</h3>
              <p>Chỉ với 4 bước đơn giản để trải nghiệm thuê xe Mioto một cách nhanh chóng</p>
            </div>
            <div className="tutorial-container d-flex justify-content-center">
              <div className="tutorial-item">
                <div className="tutorial-fix-img">
                  <img
                    src={require("../assets/img/tutorial-img-1.png")}
                    alt=""
                    className="img-fluid"
                  />
                </div>
                <p>
                  <span>1</span> Đặt xe trên web Car Rental
                </p>
              </div>
              <div className="tutorial-item">
                <div className="tutorial-fix-img">
                  <img
                    src={require("../assets/img/tutorial-img-2.png")}
                    alt=""
                    className="img-fluid"
                  />
                </div>
                <p>
                  <span>2</span> Nhận xe
                </p>
              </div>
              <div className="tutorial-item">
                <div className="tutorial-fix-img">
                  <img
                    src={require("../assets/img/tutorial-img-3.png")}
                    alt=""
                    className="img-fluid"
                  />
                </div>
                <p>
                  <span>3</span> Bắt đầu hành trình
                </p>
              </div>
              <div className="tutorial-item">
                <div className="tutorial-fix-img">
                  <img
                    src={require("../assets/img/tutorial-img-4.png")}
                    alt=""
                    className="img-fluid"
                  />
                </div>
                <p>
                  <span>4</span> Trả xe và kết thúc chuyến đi
                </p>
              </div>
            </div>
          </div>
          {/* explore-section */}
          <div className="explore-section">
            <div className="explore-fix-img">
              <img src={require("../assets/img/explore-img.png")} alt=""></img>
            </div>
            <div className="explore-item">
              <h2>Bạn muốn biết thêm về Car Rental</h2>
              <p>
                Car Rental kết nối khách hàng có nhu cầu thuê xe với hàng ngàn
                chủ xe ô tô ở TPHCM, Hà Nội & các tỉnh thành khác. Chúng tôi
                hướng đến việc xây dựng cộng đồng nngười dùng ô tô văn minh & uy
                tín tại Việt Nam
              </p>
              <button className="btn btn-success">
                <Link to="/about">Tìm hiểu thêm</Link>
              </button>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default Home;
