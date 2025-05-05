import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineController,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useEffect, useState } from "react";
import { getLastWeekReport } from "../../services/reportAPI";

ChartJS.register(
  LineElement,
  LineController,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

const LastWeekChart = () => {
  const [chartdata, setData] = useState([0, 0, 0, 0, 0, 0, 0]);

  const [loading, setLoading] = useState(false);

  const getReportData = async () => {
    try {
      setLoading(true);
      const response = await getLastWeekReport();
      if (response.status === 200) {
        const stats = response.data.data.stats;
        const chartData = [0, 0, 0, 0, 0, 0, 0];
        for (let i = 0; i < stats.length; i++) {
          chartData[stats[i].dayOfWeek - 2] = stats[i].count;
        }
        setData(chartData);
        setLoading(false);
        console.log(chartData);
      }
    } catch (error) {
      console.log(error.response.data);
      setLoading(false);
    }
  };

  useEffect(() => {
    getReportData();
  }, []);

  const data = {
    labels: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    datasets: [
      {
        label: "Completed Tasks",
        data: chartdata,
        borderColor: "green",
        tension: 0.4,
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
        text: "Total Work Done Last Week",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Day of the Week",
          color: "black",
        },
      },
      y: {
        ticks: {
          precision: 0,
        },
        title: {
          display: true,
          text: "Completed Tasks",
          color: "black",
        },
      },
    },
  };

  return (
    <div className="h-80 w-100">
      {!loading && <Line data={data} options={options} />}
      {loading && (
        <div className="h-screen w-full flex justify-center items-center">
          <div className="loader "></div>
        </div>
      )}
    </div>
  );
};

export default LastWeekChart;
