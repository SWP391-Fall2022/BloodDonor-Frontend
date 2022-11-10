import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LinearScale,
  LineElement,
  CategoryScale,
  PointElement,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const LineChart = () => {
  var data = {
    labels: ["", "Tuần 1", "Tuần 2", "Tuần 3", "Tuần 4", "Tuần 5"],
    datasets: [
      {
        label: "Tham gia",
        data: [100, 20, 80, 50, 40, 65],
        backgroundColor: ["rgba(54, 162, 235, 1)"],
        borderColor: ["rgba(54, 162, 235, 1)"],
        borderWidth: 2,
        tension: 0.1,
      },
      {
        label: "Hủy",
        data: [20, 10, 30, 20, 30, 80],
        backgroundColor: ["rgba(153, 102, 255, 1)"],
        borderColor: ["rgba(153, 102, 255, 1)"],
        borderWidth: 2,
        tension: 0.1,
      },
    ],
  };
  var options = {
    scales: {
      y: {
        beginAtZero: true,
        display: true,
        ticks: {
            stepSize: 20
        }
      },
      x:{
        display: true,
      }
    },
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        align: "middle"
    }
  }
  };
  return (
    <div>
      <Line data={data} height={200} width={300} options={options} />
    </div>
  );
};

export default LineChart;
