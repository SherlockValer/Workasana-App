import { useEffect, useState } from "react";
import { getTaskByID } from "../services/tasksAPI";
import { useNavigate, useParams } from "react-router-dom";
import { generateDueDate } from "../utils/generateDueDate";
import { BsFillRecordFill, BsHouse } from "react-icons/bs";
import { FaCalendarCheck, FaEdit } from "react-icons/fa";
import { colorMap, tags } from "../utils/getTagData";
import EditTask from "../components/Layouts/EditTask";
import CompleteModal from "../components/Layouts/CompleteModal";
import { useUserLoginContext } from "../context/userLoginContext";

const TaskDetails = () => {
  const navigate = useNavigate();

  const { user, authError } = useUserLoginContext();

  const [taskData, setData] = useState(null);
  const [error, setError] = useState(null);

  const [showTaskModal, setTaskModal] = useState(false);
  const [showCompleteModal, setCompleteModal] = useState(false);

  const [loading, setLoading] = useState(false);

  const { taskID } = useParams();

  const getTaskDetails = async () => {
    try {
      setLoading(true);
      const response = await getTaskByID(taskID);
      if (response.status === 200) {
        setData(response.data.data.tasks[0]);
        setLoading(false);
      }
    } catch (error) {
      setError(error.response.data);
      setLoading(false);
    }
  };

  useEffect(() => {
    getTaskDetails();
  }, []);

  const getColor = (status) => {
    if (status === "To Do") return "oklch(85.2% 0.199 91.936)";
    if (status === "In Progress") return "oklch(68.5% 0.169 237.323)";
    if (status === "Completed") return "oklch(69.6% 0.17 162.48)";
    if (status === "Blocked") return "oklch(70.4% 0.191 22.216)";
  };

  const handleEditTask = () => {
    if (user) {
      setTaskModal(true);
    } else {
      navigate("/login");
    }
  };

  const handleCompleteTask = () => {
    if (user) {
      setCompleteModal(true);
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="w-full min-h-screen flex justify-center mt-15">
      {!loading && (
        <>
          {taskData && (
            <div className="w-4/5">
              <h1 className="text-2xl font-semibold mb-8">{taskData.name}</h1>
              <div className="grid grid-cols-10 gap-y-4 items-center text-sm border-b pb-10 border-zinc-300">
                <div className="col-span-2 text-gray-500">Status</div>
                <div className="col-span-8">
                  <div className="flex gap-1 items-center w-fit bg-zinc-100 p-1 pr-2 rounded-sm">
                    <BsFillRecordFill
                      style={{ color: getColor(taskData.status) }}
                    />
                    {taskData.status}
                  </div>
                </div>
                <div className="col-span-2 text-gray-500">Owners</div>
                <div className="col-span-8 flex items-center gap-3">
                  {taskData.owners.map((owner) => (
                    <div key={owner._id} className="flex items-center gap-1">
                      <img
                        src={`https://placehold.co/30?text=${owner.name[0]}`}
                        alt={`${owner.name}`}
                        className="rounded-full"
                      />
                      <div>{owner.name}</div>
                    </div>
                  ))}
                </div>
                <div className="col-span-2 text-gray-500">Project</div>
                <div className="col-span-8">{taskData.project.name}</div>
                <div className="col-span-2 text-gray-500">Team</div>
                <div className="col-span-8">{taskData.team.name}</div>
                <div className="col-span-2 text-gray-500">Tags</div>
                <div className="col-span-8 flex gap-2">
                  {taskData.tags.map((tag, index) => {
                    const tagData = tags.find((t) => t.name === tag);
                    const className =
                      colorMap[tagData.color] || "bg-gray-500 text-white";
                    return (
                      <span
                        className={`${className} px-2 rounded-sm`}
                        key={index}
                      >
                        {tag}
                      </span>
                    );
                  })}
                </div>
                <div className="col-span-2 text-gray-500">Due Date</div>
                <div className="col-span-8">
                  {generateDueDate(taskData.createdAt, taskData.timeToComplete)}
                </div>
              </div>
              <div className="flex gap-2">
                <div className="mt-4 text-sm font-semibold">
                  <button
                    onClick={handleEditTask}
                    className="flex gap-2 items-center bg-blue-700 text-white  px-2 py-1 rounded-sm hover:bg-blue-800 cursor-pointer"
                  >
                    <FaEdit />
                    Edit Task
                  </button>
                </div>
                {taskData.status !== "Completed" && (
                  <div className="mt-4 text-sm font-semibold">
                    <button
                      onClick={handleCompleteTask}
                      className="flex gap-2 items-center bg-green-700 text-white  px-2 py-1 rounded-sm hover:bg-green-800 cursor-pointer"
                    >
                      <FaCalendarCheck />
                      Mark as Complete
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
          {/* Edit Task */}
          {showTaskModal && (
            <EditTask setTaskModal={setTaskModal} taskData={taskData} />
          )}
          {/* Mark as Complete */}
          {showCompleteModal && (
            <CompleteModal
              setCompleteModal={setCompleteModal}
              taskData={taskData}
            />
          )}
        </>
      )}
      {loading && (
        <div className="flex h-80 justify-center items-center">
          <div className="loader"></div>
        </div>
      )}
    </div>
  );
};

export default TaskDetails;
