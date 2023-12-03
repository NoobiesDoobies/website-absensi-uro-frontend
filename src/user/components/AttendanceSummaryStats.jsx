import React from "react";
import { Doughnut } from "react-chartjs-2";

const AttendanceSummaryStats = () => {
  const data = {
    labels: ["Red", "Green", "Yellow"],
    datasets: [
      {
        data: [300, 50, 100],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
    text: "23%",
  };
  return (
    <div className="font-normal border border-slate-300 py-2 px-3 rounded-xl text-lg">
      <div className="flex flex-row justify-between items-center">
        <div>Total Attendance</div>
      </div>
      <div>
        <div>Average Late Time</div>
      </div>
    </div>
  );
};

export default AttendanceSummaryStats;
