import React from "react";
import ReactDOM from "react-dom/client";
import "remixicon/fonts/remixicon.css";
import "react-circular-progressbar/dist/styles.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { AuthProvider } from "./context/AuthContext";
import { CarProvider } from "./context/CarContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <CarProvider>
        <App />
      </CarProvider>
    </AuthProvider>
  </React.StrictMode>
);

reportWebVitals();
