import { useState } from "react";
import { updateTask } from "../../services/tasksAPI";

// UI Blocks
import ProjectSelect from "../UI/ProjectSelect";
import TeamSelect from "../UI/TeamSelect";
import OwnersMultiSelect from "../UI/OwnersMultiSelect";
import TagsMultiSelect from "../UI/TagsMultiSelect";
import { BsXLg } from "react-icons/bs";
import { FaCaretDown } from "react-icons/fa";
import useFetchCreateTask from "../../hooks/useFetchCreateTask";

const EditTask = ({ setTaskModal, taskData }) => {
  const closeModal = () => setTaskModal(false);

  const { loading, projectList, tagList, teamList, userList } =
    useFetchCreateTask();

  const getUserIDs = () => {
    const data = taskData?.owners?.map((owner) => owner._id) || [];
    return data;
  };

  const [taskName, setTaskName] = useState(taskData.name);
  const [project, setProject] = useState(taskData.project._id);
  const [selectedUsers, selectUsers] = useState(getUserIDs);
  const [team, selectTeam] = useState(taskData.team._id);
  const [selectedTags, selectTags] = useState(taskData.tags);
  const [timeToComplete, setTime] = useState(taskData.timeToComplete);
  const [status, setStatus] = useState(taskData.status);

  const [formRes, setRes] = useState(null);
  const [formLoad, setLoad] = useState(false);
  const [formErr, setErr] = useState(null);

  const handleForm = async (e) => {
    e.preventDefault();
    setLoad(true);
    setErr(null);
    try {
      const requestData = {
        name: taskName,
        project,
        team,
        owners: selectedUsers,
        tags: selectedTags,
        timeToComplete,
        status,
      };

      const response = await updateTask(taskData._id, requestData);

      if (response.status === 200) {
        setRes("Task Updated Successfully!");
        setTimeout(() => {
          setTaskModal(false);
          window.location.reload();
        }, 3000);
      }
    } catch (error) {
      setRes(null);
      setErr(error.response.data.message);
    } finally {
      setLoad(false);
    }
  };

  return (
    <>
      {/* Main modal */}
      <div className="fixed inset-0 z-50 flex justify-center items-center overflow-y-auto overflow-x-hidden bg-gray-800/50 backdrop-blur-xs">
        <div className="relative p-4 w-full max-w-md max-h-full">
          {/* Modal content */}
          <div className="relative bg-white rounded-lg shadow-sm ">
            {/* Modal header */}
            <div className="flex items-center justify-between p-2 md:p-3 border-b rounded-t  border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 ">
                Edit Task Details
              </h3>
              <button
                onClick={closeModal}
                type="button"
                className="text-gray-400 bg-transparent hover:bg-rose-200 hover:text-rose-700 rounded-lg text-sm p-2 cursor-pointer"
              >
                <BsXLg />
              </button>
            </div>

            {/* Modal body */}
            {loading ? (
              <div className="flex h-80 justify-center items-center">
                <div className="loader"></div>
              </div>
            ) : (
              <>
                {taskData.status !== "Completed" ? (
                  <form onSubmit={handleForm} className="p-2 md:p-3">
                    <div className="grid gap-2 mb-4 grid-cols-2">
                      {/* Task Name */}
                      <div className="col-span-2">
                        <label
                          htmlFor="task"
                          className="block mb-2 text-sm font-medium text-gray-900"
                        >
                          Task Name
                        </label>
                        <input
                          type="text"
                          name="task"
                          id="task"
                          placeholder="Enter Task Name"
                          className="bg-gray-200 border border-gray-300 text-gray-600 text-sm rounded-sm focus:outline-none focus:shadow-sm block w-full p-2.5"
                          onChange={(e) => setTaskName(e.target.value)}
                          value={taskName}
                          required
                          disabled
                        />
                      </div>

                      {/* Project Select */}
                      <ProjectSelect
                        projectList={projectList}
                        project={project}
                        setProject={setProject}
                      />

                      {/* Owners Multi Select */}
                      <OwnersMultiSelect
                        userList={userList}
                        selectedUsers={selectedUsers}
                        selectUsers={selectUsers}
                      />

                      {/* Team Select */}
                      <TeamSelect
                        teamList={teamList}
                        team={team}
                        selectTeam={selectTeam}
                      />

                      {/* Tags Multi Select */}
                      <TagsMultiSelect
                        tagList={tagList}
                        selectedTags={selectedTags}
                        selectTags={selectTags}
                      />

                      {/* Time to Complete */}
                      <div className="col-span-2">
                        <label
                          htmlFor="estTime"
                          className="block mb-2 text-sm font-medium text-gray-900 "
                        >
                          Estimated Time to Complete (days)
                        </label>
                        <input
                          type="number"
                          name="estTime"
                          id="estTime"
                          min={1}
                          max={90}
                          placeholder="Enter Time in Days"
                          className="bg-gray-50 border border-gray-300 text-gray-600 text-sm rounded-sm focus:outline-none focus:shadow-sm block w-full p-2.5"
                          value={timeToComplete}
                          onChange={(e) => setTime(e.target.value)}
                          required
                        />
                      </div>

                      {/* Status */}
                      <div className="col-span-2">
                        <label
                          htmlFor="status"
                          className="block mb-2 text-sm font-medium text-gray-900 "
                        >
                          Select Status
                        </label>
                        <div className="relative">
                          <select
                            name="status"
                            id="status"
                            className="appearance-none bg-gray-50 border border-gray-300 text-gray-600 text-sm rounded-sm focus:outline-none focus:shadow-sm block w-full p-2.5 cursor-pointer"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            required
                          >
                            <option value="">Dropdown</option>
                            <option value="To Do">To Do</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                            <option value="Blocked">Blocked</option>
                          </select>
                          <FaCaretDown className="absolute right-2.5 top-3 text-gray-600" />
                        </div>
                      </div>
                    </div>

                    {formRes && (
                      <div className="bg-green-100 text-green-700 border border-green-500 rounded-lg p-2 text-sm">
                        <p>{formRes}</p>
                      </div>
                    )}

                    {formLoad && (
                      <div className="bg-cyan-100 text-cyan-700 border border-cyan-500 rounded-lg p-2 text-sm">
                        <p>Saving Task...</p>
                      </div>
                    )}

                    {formErr && (
                      <div className="bg-rose-100 text-rose-700 border border-rose-500 rounded-lg p-2 text-sm">
                        <p>{formErr}</p>
                      </div>
                    )}

                    <div className="flex gap-2 justify-end mt-4 rounded-b p-2.5">
                      <button
                        type="button"
                        className="text-white bg-neutral-500 hover:bg-neutral-600 focus:outline-none font-sm rounded-sm text-sm px-2 py-1 cursor-pointer"
                        onClick={closeModal}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none font-sm rounded-sm text-sm px-2 py-1 cursor-pointer"
                      >
                        Save
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="p-2.5">
                    <p className="italic text-gray-700 mb-4">
                      Cannot update a task that is already completed!
                    </p>
                    <button
                      type="button"
                      className="text-white bg-neutral-500 hover:bg-neutral-600 focus:outline-none font-sm rounded-sm text-sm px-2 py-1 cursor-pointer"
                      onClick={closeModal}
                    >
                      Close
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default EditTask;
