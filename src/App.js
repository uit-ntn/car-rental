import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { publicRoutes, saleStaffRoutes, warehouseStaffRoute, adminRoutes } from "./routes/routes";
import { AuthProvider } from "../src/context/AuthContext";
import "./App.css";

function App() {

  const mockRole = [
    "customer",
    "sale staff",
    "warehouse saff",
    "admin"
  ]

  const [userRole, setUserRole] = useState("");

  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <Routes>

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

            {saleStaffRoutes.map((route, index) => {
              const Page = route.page;
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={<Page />}
                />
              );
            })}


            {warehouseStaffRoute.map((route, index) => {
              const Page = route.page;
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={<Page />}
                />
              );
            })}

            {adminRoutes.map((route, index) => {
              const Page = route.page;
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={<Page />}
                />
              );
            })}
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
