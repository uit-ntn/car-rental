import React from "react";
import Sidebar from "../components/UserSidebar";
import Header from "../components/Header";
import Footer from "../components/Footer";

const UserLayout = ({ children }) => {
  return (
    <div className="container-fluid">
      <Header />
      <div className="row" style={{ marginTop: '20px', marginBottom: '50px' }}>
        {/* Phần ngoài rìa bên trái trống */}
        <div className="col-md-1"></div>

        {/* Sidebar chiếm 2 phần */}
        <div className="col-md-3 border rounded bg-light" style={{
          color: '#000',  // Màu chữ tối cho sidebar
          marginTop: '20px', // Đảm bảo sidebar cách đều header
          padding: '20px',  // Khoảng cách giữa viền và nội dung
        }}>
          <Sidebar />
        </div>

        <div className="col-md-7" style={{ paddingTop: '20px' }}>
          <main style={{
            backgroundColor: "#ffffff",  // Màu nền trắng cho phần nội dung
            border: "1px solid #ddd",  // Đường viền nhẹ xung quanh phần nội dung
            borderRadius: "8px",  // Bo góc
            padding: "30px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",  // Bóng mờ nhẹ
            minHeight: "500px",  // Tăng chiều dài của nội dung để dài ra một chút
          }}>
            {children}
          </main>
        </div>

        {/* Phần ngoài rìa bên phải trống */}
        <div className="col-md-1"></div>
      </div>
      <Footer />
    </div>
  );
};

export default UserLayout;
