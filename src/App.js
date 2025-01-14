import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { publicRoutes, saleStaffRoutes, warehouseStaffRoute, adminRoutes } from "./routes/routes";
import NotFound  from "./pages/NotFound";
import "./App.css";

function App() {

  return (
    <Router>
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
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
