import React, { useEffect, useState } from "react";
import ChartStats from "../components/ChartStats";
import api from "../configs/api";
import { Bar, Line } from "react-chartjs-2";
import "chart.js/auto";

const Dashboard = () => {
  const [userData, setUserData] = useState([]);
  const [carData, setCarData] = useState([]);
  const [rentalData, setRentalData] = useState([]);
  const [recentRentals, setRecentRentals] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [monthlyRevenue, setMonthlyRevenue] = useState([]);
  const [carStatus, setCarStatus] = useState({ rented: 0, maintenance: 0, available: 0 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [carsRes, rentalsRes, usersRes] = await Promise.all([
          api.get("/api/cars"),
          api.get("/api/rentals"),
          api.get("/api/users"),
        ]);

        setUserData(usersRes.data || []);
        setCarData(carsRes.data || []);
        setRentalData(rentalsRes.data || []);

        // Tính tổng doanh thu
        const revenue = rentalsRes.data.reduce((acc, rental) => acc + rental.total_cost, 0);
        setTotalRevenue(revenue);

        // Tính doanh thu theo tháng
        calculateMonthlyRevenue(rentalsRes.data);

        // Tính trạng thái xe
        calculateCarStatus(carsRes.data);

        // Lấy danh sách hợp đồng gần đây (5 cái gần nhất)
        fetchRecentRentals(rentalsRes.data, carsRes.data, usersRes.data);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    };

    fetchData();
  }, []);

  // Tính doanh thu theo tháng
  const calculateMonthlyRevenue = (rentals) => {
    const revenueByMonth = Array(12).fill(0);
    rentals.forEach((rental) => {
      const month = new Date(rental.start_date).getMonth();
      revenueByMonth[month] += rental.total_cost;
    });
    setMonthlyRevenue(revenueByMonth);
  };

  // Tính số lượng xe theo trạng thái
  const calculateCarStatus = (cars) => {
    let statusCount = { rented: 0, maintenance: 0, available: 0 };
    cars.forEach((car) => {
      if (car.status === "rented") statusCount.rented++;
      else if (car.status === "maintenance") statusCount.maintenance++;
      else statusCount.available++;
    });
    setCarStatus(statusCount);
  };

  // Lấy thông tin hợp đồng gần đây
  const fetchRecentRentals = (rentals, cars, users) => {
    const recent = rentals.slice(-5).reverse().map((rental) => {
      const car = cars.find((c) => c._id === rental.car_id);
      const user = users.find((u) => u._id === rental.customer_id);
      return {
        ...rental,
        customer_name: user ? user.full_name : "Khách không xác định",
        car_model: car ? `${car.make} ${car.model}` : "Xe không xác định",
      };
    });

    setRecentRentals(recent);
  };

  // Dữ liệu cho biểu đồ Bar (Trạng thái xe)
  const carChartData = {
    labels: ["Đang thuê", "Bảo trì", "Có sẵn"],
    datasets: [
      {
        label: "Số lượng",
        data: [carStatus.rented, carStatus.maintenance, carStatus.available],
        backgroundColor: ["#FF5733", "#FFC107", "#33A8FF"],
      },
    ],
  };

  // Dữ liệu cho biểu đồ Line (Doanh thu theo tháng)
  const revenueChartData = {
    labels: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"],
    datasets: [
      {
        label: "Doanh thu (VND)",
        data: monthlyRevenue,
        fill: false,
        borderColor: "#28a745",
        tension: 0.3,
      },
    ],
  };

  // Top 5 xe có doanh thu cao nhất
  const topCarsByRevenue = carData
    .map((car) => {
      const carRevenue = rentalData
        .filter((rental) => rental.car_id === car._id)
        .reduce((acc, rental) => acc + rental.total_cost, 0);
      return { ...car, revenue: carRevenue };
    })
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 5);


  // Hợp đồng sắp hết hạn (khoảng 3 ngày)
  const expiringRentals = rentalData.filter((rental) => {
    const endDate = new Date(rental.end_date);
    const today = new Date();
    const diffTime = Math.abs(endDate - today);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 3;
  });


  return (
    <div className="container-fluid mt-4">
      <div className="row g-4">
        {/* Các thống kê tổng quan */}
        <div className="col-md-6 col-xl-3">
          <ChartStats title="TỔNG SỐ XE" value={carData?.length || 0} icon="🚗" />
        </div>
        <div className="col-md-6 col-xl-3">
          <ChartStats title="NGƯỜI DÙNG" value={userData?.length || 0} icon="👤" />
        </div>
        <div className="col-md-6 col-xl-3">
          <ChartStats title="HỢP ĐỒNG" value={rentalData?.length || 0} icon="📜" />
        </div>
        <div className="col-md-6 col-xl-3">
          <ChartStats title="TỔNG DOANH THU" value={`${totalRevenue.toLocaleString()}`} icon="💰" />
        </div>
      </div>

      {/* Biểu đồ thống kê */}
      <div className="row mt-4">
        <div className="col-md-6">
          <div className="card p-3 shadow">
            <h5 className="text-center">Trạng thái xe</h5>
            <Bar data={carChartData} />
          </div>
        </div>
        <div className="col-md-6">
          <div className="card p-3 shadow">
            <h5 className="text-center">Doanh thu theo tháng</h5>
            <Line data={revenueChartData} />
          </div>
        </div>
      </div>

      {/*Biểu đồ tròn top 5 xe có doanh thu cao nhất*/}
    <div className="row mt-4">
      <div className="col-12">
        <div className="card p-3 shadow">
      <h5 className="text-center">Top 5 xe có doanh thu cao nhất</h5>
      <Bar
        data={{
          labels: topCarsByRevenue.map((car) => `${car.make} ${car.model}`),
          datasets: [
        {
          label: "Doanh thu (VND)",
          data: topCarsByRevenue.map((car) => car.revenue),
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#4BC0C0",
            "#9966FF",
          ],
        },
          ],
        }}
      />
        </div>
      </div>
    </div>

      {/* Danh sách hợp đồng gần đây */}
      <div className="row mt-4">
        <div className="col-12">
          <div className="card p-3 shadow">
            <h5 className="text-center">Hợp đồng gần đây</h5>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Khách hàng</th>
                  <th>Xe</th>
                  <th>Ngày thuê</th>
                  <th>Ngày trả</th>
                  <th>Giá</th>
                </tr>
              </thead>
              <tbody>
                {recentRentals?.map((rental) => (
                  <tr key={rental._id}>
                    <td>{rental.customer_name}</td>
                    <td>{rental.car_model}</td>
                    <td>{new Date(rental.start_date).toLocaleDateString()}</td>
                    <td>{new Date(rental.end_date).toLocaleDateString()}</td>
                    <td>{rental.total_cost.toLocaleString()} VND</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {recentRentals?.length === 0 && <p className="text-center text-muted">Chưa có hợp đồng nào.</p>}
          </div>
        </div>
      </div>


      {/*Hợp đồng sắp hết hạn*/}
      <div className="row mt-4">
        <div className="col-12">
          <div className="card p-3 shadow">
        <h5 className="text-center">Hợp đồng sắp hết hạn</h5>
        <table className="table table-striped">
          <thead>
            <tr>
          <th>Khách hàng</th>
          <th>Xe</th>
          <th>Ngày thuê</th>
          <th>Ngày trả</th>
          <th>Giá</th>
            </tr>
          </thead>
          <tbody>
            {expiringRentals.map((rental) => (
          <tr key={rental._id}>
            <td>{rental.customer_name}</td>
            <td>{rental.car_model}</td>
            <td>{new Date(rental.start_date).toLocaleDateString()}</td>
            <td>{new Date(rental.end_date).toLocaleDateString()}</td>
            <td>{rental.total_cost.toLocaleString()} VND</td>
          </tr>
            ))}
          </tbody>
        </table>
        {expiringRentals.length === 0 && <p className="text-center text-muted">Không có hợp đồng sắp hết hạn.</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
