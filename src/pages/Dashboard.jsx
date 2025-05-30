import { FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";
import ProjectView from "../components/Layouts/ProjectView";
import MyTasks from "../components/Layouts/MyTasks";
import SearchBar from "../components/UI/SearchBar";
import { useUserLoginContext } from "../context/userLoginContext";

const Dashboard = () => {
  const { user } = useUserLoginContext();

  return (
    <div className="grow p-4">
      {/* Search Bar */}
      <SearchBar />

      {/* Project View */}
      <ProjectView />

      {/* My Tasks */}
      {user ? (
        <MyTasks />
      ) : (
        <div className="h-48 flex flex-col items-center justify-center gap-3 bg-zinc-100 rounded-md">
          <h1 className="text-2xl font-bold">My Tasks</h1>
          <p className="text-gray-700 text-sm">Login to continue</p>
          <Link to="/login">
            <button className="flex gap-2 leading-none bg-violet-700 text-white px-6 py-2 rounded-sm text-sm font-semibold cursor-pointer">
              <FaLock />
              Login
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
