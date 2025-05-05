import { BsGrid1X2 } from "react-icons/bs";
import { BsGrid3X3Gap } from "react-icons/bs";
import { BsPeople } from "react-icons/bs";
import { BsBarChart } from "react-icons/bs";
import { BsGear } from "react-icons/bs";
import { NavLink, useLocation } from "react-router-dom";
import { useUserLoginContext } from "../../context/userLoginContext";

const Sidebar = () => {
  const location = useLocation();
  const { user, authError } = useUserLoginContext();

  return (
    <div className="min-w-48 min-h-screen bg-violet-100 ">
      <h1 className="text-center text-xl font-bold text-violet-800 p-5 mb-8">
        workasana
      </h1>
      <div className="flex flex-col gap-8 text-gray-600 leading-none">
        <NavLink
          to="/"
          className={
            location.pathname === "/" ? "text-violet-800" : "text-gray-600"
          }
        >
          <p className="pl-12 flex gap-2 align-middle">
            <BsGrid1X2 />
            <span>Dashboard</span>
          </p>
        </NavLink>

        <NavLink
          className={
            location.pathname === "/project"
              ? "text-violet-800"
              : "text-gray-600"
          }
        >
          <p className="pl-12 flex gap-2 align-middle">
            <BsGrid3X3Gap />
            <span>Project</span>
          </p>
        </NavLink>

        <NavLink
          to="/team"
          className={
            location.pathname === "/team" ? "text-violet-800" : "text-gray-600"
          }
        >
          <p className="pl-12 flex gap-2 align-middle">
            <BsPeople />
            <span>Team</span>
          </p>
        </NavLink>

        <NavLink
          to="/reports"
          className={
            location.pathname === "/reports"
              ? "text-violet-800"
              : "text-gray-600"
          }
        >
          <p className="pl-12 flex gap-2 align-middle">
            <BsBarChart />
            <span>Reports</span>
          </p>
        </NavLink>

        <NavLink
          to={`${user ? "/setting" : "/login"}`}
          className={
            location.pathname === "/setting"
              ? "text-violet-800"
              : "text-gray-600"
          }
        >
          <p className="pl-12 flex gap-2 align-middle">
            <BsGear />
            <span>Settings</span>
          </p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
