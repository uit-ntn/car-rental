import React, { useEffect, useState } from "react";
import ChartStats from "../components/ChartStats";
import api from "../configs/api";

const Dashboard = () => {

  const [userData, setUserData] = useState([]);
  const [carData, setCarData] = useState([]);
  const [rentalData, setRentalData] = useState([]);

  useEffect(() => {
    // Gọi API lấy dữ liệu
    const fetchData = async () => {
      try {
        const [usersRes, carsRes, rentalsRes] = await Promise.all([
          api.get("/api/users"),
          api.get("/api/cars"),
          api.get("/api/rentals"),
        ]);

        setUserData(usersRes.data);
        setCarData(carsRes.data);
        setRentalData(rentalsRes.data);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container-fluid mt-4">
      <div className="row g-4">
        <div className="col-md-6 col-xl-4">
          <ChartStats title="NGƯỜI DÙNG" value={userData.length} />
        </div>
        <div className="col-md-6 col-xl-4">
          <ChartStats title="XE" value={carData.length} />
        </div>
        <div className="col-md-12 col-xl-4">
          <ChartStats title="HỢP ĐỒNG" value={rentalData.length} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
