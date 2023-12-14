import React from "react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { publicRoutes, privateRoutes, adminRoutes } from "./routes/routes";
import "./App.css"
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

          {privateRoutes.map((route, index) => {
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
    </Router>
  );
}

export default App;
