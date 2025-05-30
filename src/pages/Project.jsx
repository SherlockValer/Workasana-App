import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import TaskFilter from "../components/UI/TaskFilter";
import TasksTable from "../components/Containers/TasksTable";
import CreateTask from "../components/Layouts/CreateTask";
import { useUserLoginContext } from "../context/userLoginContext";

const Project = () => {
  const navigate = useNavigate();

  const { user } = useUserLoginContext();

  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const [showTaskModal, setTaskModal] = useState(false);

  const [owners, setOwners] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectedFilters, setFilters] = useState({ owner: "All", tag: "All" });
  const location = useLocation();

  const [isNewSort, setNewSort] = useState(false);
  const [isOldSort, setOldSort] = useState(false);

  useEffect(() => {
    if (location.state) {
      setData(location.state.details);
    } else {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    if (data.length !== 0) {
      const owners = [
        ...new Set(
          data.tasks
            .map((task) => task.owners.map((owner) => owner.name))
            .flat()
        ),
      ];
      setOwners(owners);

      const tagsData = [...new Set(data.tasks.map((task) => task.tags).flat())];
      setTags(tagsData);

      const filteredByOwner =
        selectedFilters.owner === "All"
          ? data.tasks
          : data.tasks.filter((task) =>
              task.owners.some((owner) => owner.name === selectedFilters.owner)
            );

      const filteredByTag =
        selectedFilters.tag === "All"
          ? filteredByOwner
          : filteredByOwner.filter((task) =>
              task.tags.includes(selectedFilters.tag)
            );

      const newSorted = isNewSort
        ? filteredByTag.sort((a, b) => b.timeToComplete - a.timeToComplete)
        : filteredByTag;

      const oldSorted = isOldSort
        ? newSorted.sort((a, b) => a.timeToComplete - b.timeToComplete)
        : newSorted;

      setFilteredData(oldSorted);
    }
  }, [data, selectedFilters, isNewSort, isOldSort]);

  const handleNewSort = () => {
    if (isNewSort) {
      setNewSort(false);
    } else {
      setNewSort(true);
      setOldSort(false);
    }
  };

  const handleOldSort = () => {
    if (isOldSort) {
      setOldSort(false);
    } else {
      setOldSort(true);
      setNewSort(false);
    }
  };

  const handleNewTask = () => {
    if (user) {
      setTaskModal(true);
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      {data.length !== 0 && (
        <div key={data.project._id} className="grow p-4 mt-8">
          {/* Header */}
          <h1 className="text-2xl font-bold mb-2">{data.project.name}</h1>
          <p className="text-sm text-gray-600 mb-6">
            {data.project.description}
          </p>
          {/* Filters and Sort */}
          <div className="flex justify-between text-xs my-4">
            {/* Sort */}
            <div className="flex gap-2 items-center">
              <span>Sort by: </span>
              <span
                onClick={handleNewSort}
                className={`${
                  isNewSort ? "text-white bg-violet-500" : "text-gray-500"
                }  border border-violet-500 px-1.5 py-0.75 rounded-xl cursor-pointer`}
              >
                Newest First
              </span>
              <span
                onClick={handleOldSort}
                className={`${
                  isOldSort ? "text-white bg-violet-500" : "text-gray-500"
                }  border border-violet-500 px-1.5 py-0.75 rounded-xl cursor-pointer`}
              >
                Oldest First
              </span>
            </div>
            {/* Filter */}
            <div className="flex gap-4 justify-between  align-middle">
              <TaskFilter owners={owners} tags={tags} setFilters={setFilters} />
              {/* New Task Button */}
              <button
                className="text-white bg-blue-700 hover:bg-blue-800 px-2 py-1 rounded-sm cursor-pointer"
                onClick={handleNewTask}
              >
                + New Task
              </button>
            </div>
          </div>
          {/* Table */}
          <TasksTable tasks={filteredData} />
        </div>
      )}
      {/* Create Tasks */}
      {showTaskModal && <CreateTask setTaskModal={setTaskModal} />}
    </>
  );
};

export default Project;
