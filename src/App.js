import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { publicRoutes, customerRoutes, saleStaffRoutes, warehouseStaffRoute, adminRoutes } from "./routes/routes";
import NotFound from "./pages/NotFound";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "./context/AuthContext";
import DashboardLayout from "./layouts/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import User from "./pages/User";
import Car from "./pages/Car";
import Rental from "./pages/Rental";
import "./App.css";

/**
 * Component bảo vệ route dựa trên vai trò người dùng.
 * @param {Object} props - Props của component.
 * @param {React.Element} props.element - Component con cần render.
 * @param {Array<string>} props.allowedRoles - Danh sách vai trò được phép truy cập.
 * @returns {React.Element} - Trả về component hoặc điều hướng nếu không đủ quyền.
 */
const ProtectedRoute = ({ element, allowedRoles }) => {
  const { userData, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>; // Hiển thị khi đang load dữ liệu
  }

  const role = userData?.role?.toLowerCase() || null;

  console.log("User Role:", role);
  console.log("Allowed Roles:", allowedRoles);

  if (!role || !allowedRoles.includes(role)) {
    return <Navigate replace to="/not-found" />;
  }
  return element;
};

function App() {
  const { userData, loading } = useContext(AuthContext);
  const role = userData?.role?.toLowerCase() || null;



  return (
    <Router>
      <div className="App">
        <Routes>
          {role === 'admin' && <Route path="*" element={<Navigate to="/dashboard" />} />}
          {/* Public routes */}
          {publicRoutes.map((route, index) => (
            <Route key={index} path={route.path} element={<route.page />} />
          ))}

          {/* Customer routes */}
          {customerRoutes.map((route, index) => (
            <Route key={index} path={route.path} element={<ProtectedRoute element={<route.page />} allowedRoles={['customer']} />} />
          ))}

          {/* Sales staff routes */}
          {saleStaffRoutes.map((route, index) => (
            <Route key={index} path={route.path} element={<ProtectedRoute element={<route.page />} allowedRoles={['salestaff']} />} />
          ))}

          {/* Warehouse staff routes */}
          {warehouseStaffRoute.map((route, index) => (
            <Route key={index} path={route.path} element={<ProtectedRoute element={<route.page />} allowedRoles={['warehousestaff']} />} />
          ))}

          {/* Admin routes với DashboardLayout */}
          <Route path="/dashboard" element={<ProtectedRoute element={<DashboardLayout />} allowedRoles={['admin']} />}>
            <Route index element={<Dashboard />} />
            <Route path="users" element={<User />} />
            <Route path="cars" element={<Car />} />
            <Route path="contracts" element={<Rental />} />
          </Route>

          {/* Route cho NotFound */}
          <Route path="*" element={<NotFound />} />
        </Routes>

        {/* ToastContainer để hiển thị thông báo */}
        <ToastContainer position="top-right" autoClose={5000} hideProgressBar />
      </div>
    </Router>
  );
}

export default App;
