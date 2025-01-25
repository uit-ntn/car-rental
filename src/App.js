import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { publicRoutes, customerRoutes, saleStaffRoutes, warehouseStaffRoute, adminRoutes } from "./routes/routes";
import NotFound from "./pages/NotFound";
import { ToastContainer } from "react-toastify";  // Thêm import ToastContainer
import 'react-toastify/dist/ReactToastify.css';  // Thêm CSS cho Toast

import "./App.css";

const getUserRole = () => {
  // get role from localStorage
  return localStorage.getItem('role');
  // customer, saleStaff, warehouseStaff, admin
};

// ProtectedRoute Component : Protect route with role
const ProtectedRoute = ({ element, allowedRoles }) => {
  const role = getUserRole();

  if (!role) {
    return <Navigate to="/auth/login" />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/404" />;
  }

  return element;
};

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Public route */}
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

          {/* Customer route */}
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

          {/* Staff route */}
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

          {/* Warehouse route */}
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

          {/* Admin route */}
          {adminRoutes.map((route, index) => {
            const Page = route.page;
            return (
              <Route
                key={index}
                path={route.path}
                element={<ProtectedRoute element={<Page />} allowedRoles={['admin']} />}
              />
            );
          })}

          {/* Route NotFound */}
          <Route path="*" element={<NotFound />} />
        </Routes>

        {/* ToastContainer to show notification */}
        <ToastContainer position="top-right" autoClose={5000} hideProgressBar />
      </div>
    </Router>
  );
}

export default App;
