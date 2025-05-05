import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useEffect, useState } from "react";
import { getByOwner } from "../../services/reportAPI";

ChartJS.register(
  BarElement,
  BarController,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

const ClosedByOwnerChart = () => {
  const [chartData, setData] = useState([]);
  const [chartLabels, setLabels] = useState([]);

  const [loading, setLoading] = useState(false);

  const getClosedByTeam = async () => {
    try {
      const response = await getByOwner();
      if (response.status === 200) {
        const sortedStats = response.data.data.tasksClosed;
        // .sort(
        //   (a, b) => a.tasksClosed - b.tasksClosed
        // );
        const stats = sortedStats.map((elem) => elem.tasksClosed);
        const labels = sortedStats.map((stat) => stat.owner.name);
        setData(stats);
        setLabels(labels);
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    getClosedByTeam();
  }, []);

  const data = {
    labels: chartLabels,
    datasets: [
      {
        axis: "y",
        label: "Completed Tasks",
        data: chartData,
        backgroundColor: ["tomato"],
      },
    ],
  };

  const options = {
    borderRadius: 5,
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
        position: "bottom",
      },
      title: {
        display: true,
        text: "Tasks Closed by Owner",
      },
    },
    scales: {
      y: {
        ticks: {
          autoSkip: false,
          precision: 0,
        },
        title: {
          display: true,
          text: "No. of tasks closed",
          color: "black",
        },
      },
      x: {
        ticks: {
          precision: 0,
          autoSkip: false,
        },
        title: {
          display: false,
          color: "black",
          font: "8px",
        },
      },
    },
  };

  return (
    <div className="h-80 w-100">
      {!loading && <Bar data={data} options={options} />}
      {loading && (
        <div className="h-screen w-full flex justify-center items-center">
          <div className="loader "></div>
        </div>
      )}
    </div>
  );
};

export default ClosedByOwnerChart;
