import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  PieController,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useEffect, useState } from "react";
import { getByTeam } from "../../services/reportAPI";

ChartJS.register(ArcElement, PieController, Title, Tooltip, Legend);

const ClosedByTeamChart = () => {
  const [chartData, setData] = useState([]);
  const [chartLabels, setLabels] = useState([]);

  const [loading, setLoading] = useState(false);

  const getClosedByTeam = async () => {
    try {
      setLoading(true);
      const response = await getByTeam();
      if (response.status === 200) {
        const sortedStats = response.data.data.tasksClosed.sort(
          (a, b) => a.tasksClosed - b.tasksClosed
        );
        const stats = sortedStats.map((elem) => elem.tasksClosed);
        const labels = sortedStats.map((stat) => stat.team.name);
        setData(stats);
        setLabels(labels);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
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
        label: "Completed Tasks",
        data: chartData,
        backgroundColor: [
          "#5B9BD5", // Blue
          "#ED7D31", // Orange
          "#A5A5A5", // Gray
          "#FFC000", // Yellow
          "#4472C4", // Dark Blue
          "#70AD47", // Teal/Green
          "crimson", // Darker Blue
          "rebeccaPurple", // Dark Orange (or additional colors as needed),
          "forestGreen",
          "fireBrick",
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
        position: "bottom",
      },
      title: {
        display: true,
        text: "Tasks Closed by Team",
      },
    },
  };

  return (
    <div className="w-80 h-80">
      {!loading && <Pie data={data} options={options} />}
      {loading && (
        <div className="h-screen w-full flex justify-center items-center">
          <div className="loader "></div>
        </div>
      )}
    </div>
  );
};

export default ClosedByTeamChart;
