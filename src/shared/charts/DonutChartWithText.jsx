import React, { useRef, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";

const DonutChartWithText = ({ data, options }) => {
  console.log(data);
  console.log(options);
  const chartRef = useRef(null);

  useEffect(() => {
    // Access the chart instance
    const chartInstance = chartRef.current?.chartInstance;

    if (chartInstance) {
      // Get the canvas context
      const ctx = chartInstance.ctx;

      // Set font styles
      ctx.font = "16px Arial";
      ctx.fillStyle = "#fff";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      // Get the center coordinates of the chart
      const centerX =
        (chartInstance.chartArea.left + chartInstance.chartArea.right) / 2;
      const centerY =
        (chartInstance.chartArea.top + chartInstance.chartArea.bottom) / 2;

      // Draw text inside the donut chart
      ctx.fillText("Your Text Here", centerX, centerY);
    }
  }, []);

  return <Doughnut data={data} options={options} ref={chartRef} />;
};

export default DonutChartWithText;
