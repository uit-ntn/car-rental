import React from "react";
import ChartStats from "../components/ChartStats";
import CrudTable from "../components/CrudTable";

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

        {/* Manage Data Section */}
        <div className="col-md-12 mb-4">
          <CrudTable />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
