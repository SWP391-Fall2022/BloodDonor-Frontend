import React from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  PointElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);
ChartJS.defaults.font.size = 10;
const filterParticipatedStatus = (data, key) => {
  return data.filter((item) => item.donateRegistrationResponse.status === "CHECKED_IN")
    .length;
};
const DoughnutChartGender = (dataS) => {
  var data = {
    labels: ["Nữ", "Nam"],
    datasets: [
      {
        data: [dataS.dataS.Female, dataS.dataS.Male],
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
          "rgba(153, 102, 255)",
        ],
        hoverOffset: 4,
      },
    ],
  };
  var options = {
    scales: {
      xAxes: [
        {
          display: false, //this will remove all the x-axis grid lines
        },
      ]
    },
    responsive: true,
    plugins: {
        legend: {
          position: "bottom",
          align:"middle"
      }
    }
  };
  return (
    <div>
      <Doughnut data={data} height={120} width={300}  options={options} />
    </div>
  );
};

export default DoughnutChartGender;
