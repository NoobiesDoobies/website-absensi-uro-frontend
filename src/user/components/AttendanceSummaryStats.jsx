import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import tailwindConfig from "../../../tailwind.config.js";

import DonutChartWithText from "../../shared/charts/DonutChartWithText.jsx";

ChartJS.register(ArcElement, Tooltip, Legend);

const AttendanceSummaryStats = () => {
  const data1 = {
    labels: ["Hadir", "Absen"],
    datasets: [
      {
        data: [300, 50],
        backgroundColor: ["#eed988", "#748c9c"],
        hoverBackgroundColor: ["#fad456", "#263754"],
      },
    ],
    text: "23%",
  };
  const data2 = {
    labels: ["Hadir", "Absen"],
    datasets: [
      {
        data: [300, 50],
        backgroundColor: ["#eed988", "#878a84"],
        hoverBackgroundColor: ["#fad456", "#748c9c"],
      },
    ],
    text: "23%",
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
    elements: {
      center: {
        text: "test",
      },
    },
  };

  const textCenter = {
    id: "textCenter",
    beforeDatasetsDraw(chart, args, pluginOptions) {
      const { ctx, chartArea, data } = chart;
      ctx.save();
      ctx.font = "16px Arial";
      ctx.fillStyle = "black";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      const centerX = (chartArea.left + chartArea.right) / 2;
      const centerY = (chartArea.top + chartArea.bottom) / 2;
      const percentage = Math.round(
        (data.datasets[0].data[0] /
          (data.datasets[0].data[0] + data.datasets[0].data[1])) *
          100,
        1
      );
      ctx.fillText(`${percentage}%`, centerX, centerY);
    },
  };

  return (
    <div className="font-normal border border-slate-300 py-2 px-3 rounded-xl text-lg grid grid-cols-2 gap-2">
      <div className="flex flex-col justify-between items-center">
        <p>Kehadiran</p>
        <Doughnut data={data1} options={options} plugins={[textCenter]} />
      </div>
      <div className="flex flex-col justify-between items-center">
        <p>Telat</p>
        <Doughnut data={data2} options={options} plugins={[textCenter]} />
      </div>
    </div>
  );
};

export default AttendanceSummaryStats;
