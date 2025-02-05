import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

const ChartContainer = () => {
  const barData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Total Income",
        data: [30, 50, 70, 60, 90],
        backgroundColor: "rgba(54, 162, 235, 0.6)",
      },
      {
        label: "Total Expense",
        data: [20, 40, 50, 70, 80],
        backgroundColor: "rgba(255, 99, 132, 0.6)",
      },
    ],
  };

  return (
    <div className="row mt-4">
      <div className="col-md-6">
        <h5>Bar Chart</h5>
        <Bar data={barData} />
      </div>
      <div className="col-md-6">
        <h5>Calendar Widget</h5>
        <div className="card p-3">
          <h4 className="text-center">📅 JAN 2025</h4>
        </div>
      </div>
    </div>
  );
};

export default ChartContainer;
