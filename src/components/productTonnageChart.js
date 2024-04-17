import React from "react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

const data = {
  labels: ["RB1", "RB2", "RB3", "RB4"],
  datasets: [
    {
      label: "Tonnage",
      backgroundColor: function (context) {
        var ctx = context.chart.ctx;
        var gradient = ctx.createLinearGradient(0, 0, 0, 200);
        gradient.addColorStop(0, "rgba(0, 0, 255, 1)");
        gradient.addColorStop(0.25, "rgba(0, 0, 255, 0.75)");
        gradient.addColorStop(0.5, "rgba(0, 0, 255, 0.5)");
        gradient.addColorStop(0.75, "rgba(0, 0, 255, 0.25)");
        gradient.addColorStop(1, "rgba(0, 0, 255, 0.0)");
        return gradient;
      },
      borderColor: "#00f",
      borderWidth: 1,
      borderRadius: 5,
      barThickness: 30,
      borderSkipped: "bottom", // Bottom border skipped
      hoverBackgroundColor: "#475989",
      hoverBorderColor: "rgba(75, 192, 192, 1)",
      data: [150, 180, 200, 190],
    },
  ],
};

const options = {
  plugins: {
    title: {
      display: false,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      title: {
        display: true,
        text: "Tonnage (tons)",
      },
    },
    x: {
      title: {
        display: true,
        text: "Product",
      },
      grid: {
        display: false,
      },
    },
  },
};

function ProductTonnageChart() {
  return (
    <div className="mt-2">
      <Bar data={data} options={options} />
    </div>
  );
}

export default ProductTonnageChart;
