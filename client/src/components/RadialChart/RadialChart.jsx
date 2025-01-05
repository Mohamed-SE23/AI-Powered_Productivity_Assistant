import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const RadialChart = ({ completedTasks, pendingTasks }) => {
  const data = {
    labels: ["Completed Tasks", "Pending Tasks"],
    datasets: [
      {
        data: [completedTasks, pendingTasks],
        backgroundColor: ["#7CF57C", "#FF6B4F"],
        hoverBackgroundColor: ["#6DD66C", "#E65B3E"],
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="w-48 h-44 flex flex-col items-center justify-center p-2">
      <h3 className="text-lg font-semibold text-gray-700 mb-2">Tasks Overview</h3>
      <div className="w-32 h-32">
        <Doughnut 
          data={data} 
          options={{
            responsive: true,
            cutout: "70%",
            plugins: {
              legend: {
                display: true,
                position: "bottom",
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default RadialChart;
