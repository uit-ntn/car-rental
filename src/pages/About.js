import Layout from "../layouts/Layout";
import banner_1 from "../assets/img/aboutus.banner.jpeg";
import banner_2 from "../assets/img/aboutus2.png";
import { useEffect } from "react";

function About() {
  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <Layout>
      <div className="about container-fluid">
        {/* Section: Introduction */}
        <div className="row border-bottom py-5">
          <div className="col-lg-10 mx-auto">
            <h1 className="display-4 text-center mb-4">
              Car Rental Cùng bạn đến mọi hành trình
            </h1>
            <p className="lead text-justify">
              Mỗi chuyến đi là một hành trình khám phá cuộc sống và thế giới
              xung quanh, là cơ hội học hỏi và chinh phục những điều mới lạ của
              mỗi cá nhân để trở nên tốt hơn. Do đó, chất lượng trải nghiệm của
              khách hàng là ưu tiên hàng đầu và là nguồn cảm hứng của đội ngũ
              Car Rental.
            </p>
            <p className="lead text-justify mt-4">
              CAR-RENTAL là nền tảng chia sẻ ô tô, sứ mệnh của chúng tôi không
              chỉ dừng lại ở việc kết nối chủ xe và khách hàng một cách Nhanh
              chóng - An toàn - Tiện lợi, mà còn hướng đến việc truyền cảm hứng
              KHÁM PHÁ những điều mới lạ đến cộng đồng qua những chuyến đi trên
              nền tảng của chúng tôi.
            </p>
          </div>
        </div>

        {/* Section: About Us Banner */}
        <div className="row my-5">
          <div className="col-lg-10 mx-auto text-center">
            <img
              src={banner_1}
              alt="Car Rental Banner"
              className="img-fluid rounded"
            />
          </div>
        </div>

        {/* Section: Explore */}
        <div className="row align-items-center my-5">
          {/* Text Content */}
          <div className="col-lg-5 mx-auto">
            <h2 className="text-center mb-4">Drive. Explore. Inspire</h2>
            <p className="lead">
              Cầm lái và Khám phá thế giới đầy Cảm hứng.
            </p>
            <p className="text-justify fs-5">
              Car Rental đặt mục tiêu trở thành cộng đồng người dùng ô tô Văn
              minh & Uy tín #1 tại Việt Nam, nhằm mang lại những giá trị thiết
              thực cho tất cả những thành viên hướng đến một cuộc sống tốt đẹp
              hơn.
            </p>
            <p className="text-justify fs-5">
              Chúng tôi tin rằng mỗi hành trình đều quan trọng, vì vậy đội ngũ
              và các đối tác của MIOTO với nhiều kinh nghiệm về lĩnh vực cho
              thuê xe, công nghệ, bảo hiểm & du lịch sẽ mang đến cho hành trình
              của bạn thêm nhiều trải nghiệm mới lạ, thú vị cùng sự an toàn ở
              mức cao nhất.
            </p>
          </div>

          {/* Image Content */}
          <div className="col-lg-5 mx-auto">
            <img
              src={banner_2}
              alt="Explore Banner"
              className="img-fluid rounded"
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default About;
