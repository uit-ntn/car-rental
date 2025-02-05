import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { publicRoutes, customerRoutes, saleStaffRoutes, warehouseStaffRoute, adminRoutes } from "./routes/routes";
import NotFound from "./pages/NotFound";
import { ToastContainer } from "react-toastify";  // Thêm import ToastContainer
import 'react-toastify/dist/ReactToastify.css';  // Thêm CSS cho Toast
import { AuthContext } from "./context/AuthContext"; // Import AuthContext
import DashboardLayout from "./layouts/DashboardLayout";
import Dashboard from "./pages/Dashboard"; // import the Dashboard page


import "./App.css";

// ProtectedRoute Component : Protect route with role
const ProtectedRoute = ({ element, allowedRoles }) => {
  const { userData } = useContext(AuthContext); // Lấy thông tin người dùng từ AuthContext
  const role = userData ? userData.role : null; // Lấy vai trò của người dùng

  return element; // Nếu vai trò hợp lệ, hiển thị trang
};

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Các route công cộng */}
          {publicRoutes.map((route, index) => {
            const Page = route.page;
            return (
              <Route
                key={index}
                path={route.path}
                element={<Page />}
              />
            );
          })}

          {/* Các route dành cho customer */}
          {customerRoutes.map((route, index) => {
            const Page = route.page;
            return (
              <Route
                key={index}
                path={route.path}
                element={<ProtectedRoute element={<Page />} allowedRoles={['customer']} />}
              />
            );
          })}

          {/* Các route dành cho sales staff */}
          {saleStaffRoutes.map((route, index) => {
            const Page = route.page;
            return (
              <Route
                key={index}
                path={route.path}
                element={<ProtectedRoute element={<Page />} allowedRoles={['saleStaff']} />}
              />
            );
          })}

          {/* Các route dành cho warehouse staff */}
          {warehouseStaffRoute.map((route, index) => {
            const Page = route.page;
            return (
              <Route
                key={index}
                path={route.path}
                element={<ProtectedRoute element={<Page />} allowedRoles={['warehouseStaff']} />}
              />
            );
          })}

          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/users" element={<div>User Management Page</div>} />
            <Route path="/dashboard/cars" element={<div>Cars Management Page</div>} />
            <Route path="/dashboard/rentals" element={<div>Rentals Management Page</div>} />
          </Route>


          {/* Route cho trang NotFound */}
          <Route path="*" element={<NotFound />} />
        </Routes>

        {/* ToastContainer để hiển thị thông báo */}
        <ToastContainer position="top-right" autoClose={5000} hideProgressBar />
      </div>
    </Router>
  );
}

export default App;
