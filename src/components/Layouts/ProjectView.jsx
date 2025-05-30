import { useEffect, useState } from "react";
import { getProjects } from "../../services/projectsAPI";
import { GrCheckboxSelected } from "react-icons/gr";
import { GrCheckbox } from "react-icons/gr";
import { Link, useNavigate } from "react-router-dom";
import CreateProject from "./CreateProject";
import { useUserLoginContext } from "../../context/userLoginContext";

const ProjectView = () => {
  const [data, setData] = useState([]);
  const [slicedData, setSliced] = useState([]);
  const [filter, setFilter] = useState("");
  const [show, setShow] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = useUserLoginContext();
  const navigate = useNavigate();

  const getAllProjects = async () => {
    try {
      setLoading(true);
      const response = await getProjects();
      if (response.status === 200) {
        const data = response.data.data;
        setData(data);
        setLoading(false);
      }
    } catch (error) {
      console.log(error.response.data);
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllProjects();
  }, []);

  useEffect(() => {
    if (filter !== "") {
      const filteredData =
        filter === "Completed"
          ? data.filter((project) => project.status === "Completed")
          : data.filter((project) => project.status === "In Progress");

      const sliced = filteredData.slice(0, 3);
      setSliced(sliced);
    } else {
      const sliced = data.slice(0, 3);
      setSliced(sliced);
    }
  }, [data, filter]);

  const handleCreateProject = () => {
    if (user) {
      setShow(true);
    } else {
      navigate("/login");
    }
  };

  return (
    <section className="my-8">
      {!loading && (
        <>
          {/* Header */}
          <div className="flex justify-between gap-3 flex-wrap align-middle">
            <div className="flex gap-5 flex-wrap align-middle">
              <p className="text-2xl font-semibold">Projects</p>
              <select
                className="focus:outline-none text-zinc-700 bg-zinc-100 rounded-sm text-xs"
                name="filter"
                id="filter"
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="">Filter</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
            <button
              onClick={handleCreateProject}
              className="px-2 py-0 h-7 bg-blue-700 text-white text-sm font-semibold rounded-sm cursor-pointer"
            >
              + New Project
            </button>
          </div>
          {/* Cards */}
          <div className="flex flex-wrap gap-2">
            {slicedData.length !== 0 &&
              slicedData.map((elem, index) => {
                const { tasks, totalTasks, status, project } = elem;
                return (
                  <Link
                    to="/project"
                    state={{ details: elem }}
                    className="w-60 h-fit grow my-3 p-4 rounded-lg bg-zinc-100"
                    key={index}
                  >
                    <span
                      className={`text-xs px-2 py-1 rounded-sm font-bold ${
                        status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {status}
                    </span>
                    <h2 className="font-bold mt-3 mb-1 line-clamp-1">
                      {project.name}
                    </h2>
                    <p className="text-sm line-clamp-2 text-gray-600 mb-3">
                      {project.description}
                    </p>
                    <div className="text-sm/4 mt-2 text-gray-600">
                      {tasks
                        .filter((task) => task.status !== "Completed")
                        .map((task, index) => (
                          <p
                            className="flex gap-2 mt-2 p-2 rounded-sm bg-white"
                            key={index}
                          >
                            <GrCheckbox />
                            {task.name}
                          </p>
                        ))}
                    </div>
                    <div className="text-sm/4 text-gray-600">
                      {tasks
                        .filter((task) => task.status === "Completed")
                        .map((task, index) => (
                          <p
                            className="flex gap-2 mt-2 p-2 rounded-sm bg-white"
                            key={index}
                          >
                            <GrCheckboxSelected />
                            {task.name}
                          </p>
                        ))}
                    </div>
                  </Link>
                );
              })}
          </div>
          {show && <CreateProject setShow={setShow} />}
        </>
      )}
      {loading && (
        <div className="flex h-80 justify-center items-center">
          <div className="loader"></div>
        </div>
      )}
    </section>
  );
};

export default ProjectView;
