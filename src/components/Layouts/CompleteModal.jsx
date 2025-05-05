import React from "react";
import { BsXLg } from "react-icons/bs";
import { updateTask } from "../../services/tasksAPI";

const CompleteModal = ({ setCompleteModal, taskData }) => {
  const closeModal = () => setCompleteModal(false);

  const { name, project, team, owners, tags } = taskData;

  const handleYes = async () => {
    try {
      const requestData = {
        name,
        project,
        team,
        owners,
        tags,
        timeToComplete: 0,
        status: "Completed",
      };

      const response = await updateTask(taskData._id, requestData);

      if (response.status === 200) {
        setTimeout(() => {
          setCompleteModal(false);
          window.location.reload();
          console.log("Task Marked as Complete!");
        }, 1000);
      }
    } catch (error) {
      console.log(error.response.data);
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
                Mark as Complete
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
            <div className="p-2 md:p-3">
              <p className="italic text-gray-700 mb-2">
                Are you sure you want to mark this task as complete?
              </p>
            </div>
            <div className="flex gap-2 justify-end rounded-b p-2.5">
              <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none font-sm rounded-sm text-sm px-2 py-1 cursor-pointer"
                onClick={handleYes}
              >
                Yes
              </button>
              <button
                type="button"
                className="text-white bg-neutral-500 hover:bg-neutral-600 focus:outline-none font-sm rounded-sm text-sm px-2 py-1 cursor-pointer"
                onClick={closeModal}
              >
                No
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CompleteModal;
