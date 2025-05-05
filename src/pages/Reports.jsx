import ClosedByOwnerChart from "../components/Containers/ClosedByOwnerChart";
import ClosedByTeamChart from "../components/Containers/ClosedByTeamChart";
import LastWeekChart from "../components/Containers/LastWeekChart";
import PendingChartOne from "../components/Containers/PendingChartOne";

const Reports = () => {
  return (
    <div className="p-4 ">
      <h1 className="text-2xl font-bold mb-4">Reports</h1>
      <div className="w-full flex flex-wrap text-xs gap-10">
        <LastWeekChart />
        <PendingChartOne />
        <ClosedByTeamChart />
        <ClosedByOwnerChart />
      </div>
    </div>
  );
};

export default Reports;
