import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  DoughnutController,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useEffect, useState } from "react";
import { getPendingReport } from "../../services/reportAPI";
import annotationPlugin from "chartjs-plugin-annotation";

ChartJS.register(
  ArcElement,
  DoughnutController,
  annotationPlugin,
  Title,
  Tooltip,
  Legend
);

const PendingChartOne = () => {
  const [chartData, setChartData] = useState([]);
  const [chartLabels, setLabels] = useState([]);

  const [loading, setLoading] = useState(false);

  const getPendingTasks = async () => {
    try {
      setLoading(true);
      const response = await getPendingReport();
      if (response.status === 200) {
        const stats = response.data.data.stats.map((stat) => stat.pendingDays);
        const labels = response.data.data.stats.map((stat) => stat._id);
        setChartData(stats);
        setLabels(labels);
        setLoading(false);
      }
    } catch (error) {
      console.log(error.response.data);
      setLoading(false);
    }
  };

  useEffect(() => {
    getPendingTasks();
  }, []);

  const data = {
    labels: chartLabels,
    datasets: [
      {
        data: chartData,
        backgroundColor: ["orange", "purple", "green"],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: "Total Days of Work Pending",
      },
      annotation: {
        annotations: {
          dLabel: {
            type: "doughnutLabel",
            content: ({ chart }) => [
              "Total",
              chart.getDatasetMeta(0).total,
              "days of work pending",
            ],
            font: [{ size: 60 }, { size: 50 }, { size: 30 }],
            color: ["black", "red", "grey"],
          },
        },
      },
    },
  };

  return (
    <div className="h-80 w-80">
      {!loading && <Doughnut data={data} options={options} />}
      {loading && (
        <div className="h-screen w-full flex justify-center items-center">
          <div className="loader "></div>
        </div>
      )}
    </div>
  );
};

export default PendingChartOne;
