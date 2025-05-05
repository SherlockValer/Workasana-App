import { useEffect, useState } from "react";
import { getTasksByOwner } from "../../services/tasksAPI";
import { generateDueDate } from "../../utils/generateDueDate";
import CreateTask from "./CreateTask";
import { colorMap, tags } from "../../utils/getTagData";
import { Link } from "react-router-dom";
import { useUserLoginContext } from "../../context/userLoginContext";

const MyTasks = () => {
  const [data, setData] = useState([]);
  const [slicedData, setSliced] = useState([]);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(false);

  const { user, authError } = useUserLoginContext();

  const [showTaskModal, setTaskModal] = useState(false);

  const getTasks = async (userID) => {
    try {
      setLoading(true);
      const response = await getTasksByOwner(userID);
      if (response.status === 200) {
        setData(response.data.data.tasks);
        setLoading(false);
      }
    } catch (error) {
      console.log(error.response.data);
      setLoading(false);
    }
  };

  useEffect(() => {
    getTasks(user._id);
  }, []);

  useEffect(() => {
    const completed = data.filter((project) => project.status === "Completed");
    const inProgress = data.filter((project) => project.status !== "Completed");
    if (filter !== "") {
      const filteredData = filter === "Completed" ? completed : inProgress;
      // const sliced = filteredData.slice(0, 3);
      setSliced(filteredData);
    } else {
      const sortedData = [...inProgress, ...completed];
      // const sliced = sortedData.slice(0, 3);
      setSliced(sortedData);
    }
  }, [data, filter]);

  const handleCreateTask = () => {
    if (user) {
      setTaskModal(true);
    } else {
      navigate("/login");
    }
  };

  return (
    <section className="my-8">
      {!loading && (
        <>
          <div className="flex justify-between gap-3 flex-wrap align-middle">
            <div className="flex gap-5 align-middle">
              <p className="text-2xl font-semibold">My Tasks</p>
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
              onClick={handleCreateTask}
              className="px-2 py-0 h-7 bg-blue-700 text-white text-sm font-semibold rounded-sm cursor-pointer"
            >
              + New Task
            </button>
            {/* Create Tasks */}
            {showTaskModal && <CreateTask setTaskModal={setTaskModal} />}
          </div>
          <div className="flex flex-wrap gap-2">
            {slicedData.length !== 0 &&
              slicedData.map((elem, index) => {
                return (
                  <div
                    className="w-60 h-fit grow my-3 p-4 rounded-lg bg-zinc-100"
                    key={index}
                  >
                    <span
                      className={`text-xs px-2 py-1 rounded-sm font-bold ${
                        elem.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {elem.status}
                    </span>
                    <Link to={`/tasks/${elem._id}`}>
                      <h2 className="font-bold mt-3 mb-1">{elem.name}</h2>
                    </Link>
                    <p className="text-sm font-semibold line-clamp-2 text-gray-400 mb-3">
                      Due on:{" "}
                      {generateDueDate(elem.createdAt, elem.timeToComplete)}
                    </p>
                    <div className="flex ">
                      {elem.owners.length > 1 ? (
                        elem.owners.map((owner) => {
                          return (
                            <img
                              className="rounded-full"
                              src={`http://placehold.co/30?text=${owner.name[0]}`}
                            />
                          );
                        })
                      ) : (
                        <div className="flex items-center gap-2">
                          <img
                            className="rounded-full"
                            src={`http://placehold.co/30?text=${elem.owners[0].name[0]}`}
                          />
                          <p className="text-sm text-zinc-500">
                            {elem.owners[0].name}
                          </p>
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2 mt-3">
                      {elem.tags.map((tag) => {
                        const tagData = tags.find((t) => t.name === tag);
                        const className =
                          colorMap[tagData.color] || "bg-gray-500 text-white";
                        return (
                          <span
                            className={`${className} px-2 py-1 rounded-sm text-[10px]`}
                          >
                            {tag}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
          </div>
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

export default MyTasks;
