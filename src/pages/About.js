import Layout from "../components/Layout";
import "../styles/About.css";
import banner_1 from "../assets/img/aboutus.banner.jpeg";
import banner_2 from "../assets/img/aboutus2.png";
import { useEffect } from "react";
function About() {
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <Layout>
      <div className="about">
        <div className="instruction-section">
          <h1>Car Rental Cùng bạn đến mọi hành trình</h1>
          <div>
            <p>
              Mỗi chuyến đi là một hành trình khám phá cuộc sống và thế giới
              xung quanh, là cơ hội học hỏi và chinh phục những điều mới lạ của
              mỗi cá nhân để trở nên tốt hơn. Do đó, chất lượng trải nghiệm của
              khách hàng là ưu tiên hàng đầu và là nguồn cảm hứng của đội ngũ
              Car Rental.
            </p>
            <br></br>
            <br></br>
            <p>
              CAR-RENTAL là nền tảng chia sẻ ô tô, sứ mệnh của chúng tôi không
              chỉ dừng lại ở việc kết nối chủ xe và khách hàng một cách Nhanh
              chóng - An toàn - Tiện lợi, mà còn hướng đến việc truyền cảm hứng
              KHÁM PHÁ những điều mới lạ đến cộng đồng qua những chuyến đi trên
              nền tảng của chúng tôi.
            </p>
          </div>
        </div>
        <div className="aboutus-banner">
          <img src={banner_1} alt=""></img>
        </div>
        <div className="explore-container">
          <div className="explore-main">
            <h2>Drive. Explore. Inspire</h2>
            <p>
              Cầm lái và Khám phá thế giới đầy Cảm hứng.
              <p>
                Car Rental đặt mục tiêu trở thành cộng động người dùng ô tô Văn
                minh & Uy tín #1 tại Việt Nam, nhằm mang lại những giá trị thiết
                thực cho tất cả những thành viên hướng đến một cuộc sống tốt đẹp
                hơn.
              </p>
              <p>
                Chúng tôi tin rằng mỗi hành trình đều quan trọng, vì vậy đội ngũ
                và các đối tác của MIOTO với nhiều kinh nghiệm về lĩnh vực cho
                thuê xe, công nghệ, bảo hiểm & du lịch sẽ mang đến cho hành
                trình của bạn thêm nhiều trải nghiệm mới lạ, thú vị cùng sự an
                toàn ở mức cao nhất.
              </p>
            </p>
          </div>
          <div className="explore-banner">
            {" "}
            <img src={banner_2} alt=""></img>
          </div>
        </div>
      </div>
    </Layout>
  );
}
export default About;
