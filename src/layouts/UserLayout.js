import React from "react";
import Sidebar from "../components/UserSidebar";
import Header from "../components/Header";
import Footer from "../components/Footer";

const UserLayout = ({ children }) => {
  return (
    <div className="container-fluid">
      <Header />
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3" style={{ height: '100vh', position: 'sticky', top: 0, backgroundColor: '#f8f9fa', padding: '15px' }}>
          <Sidebar />
        </div>
        {/* Nội dung chính */}
        <div className="col-md-9">
          <main style={{ backgroundColor: "#fff", border: "1px solid #ddd", borderRadius: "8px", padding: "20px" }}>
            {children}
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserLayout;
