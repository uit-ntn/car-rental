import React from "react";
import ChartStats from "../components/ChartStats";

const Dashboard = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        {/* Stats Section */}
        <div className="col-md-6 col-xl-4 mb-4">
          <ChartStats />
        </div>
        <div className="col-md-6 col-xl-4 mb-4">
          <ChartStats />
        </div>
        <div className="col-md-12 col-xl-4 mb-4">
          <ChartStats />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
