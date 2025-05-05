import React from "react";
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { generateDueDate } from "../../utils/generateDueDate";
import { colorMap, tags } from "../../utils/getTagData";

const TasksTable = ({ tasks }) => {
  return (
    <div className="rounded-lg overflow-x-auto">
      <table className="w-full border-collapse text-sm">
        {/* Table Heading */}
        <thead className="bg-sky-100 text-gray-500 uppercase text-left text-xs p-3">
          <tr>
            <th className="px-4 py-2">Tasks</th>
            <th className="px-4 py-2">Owner</th>
            <th className="px-4 py-2">Tags</th>
            <th className="px-4 py-2">Due on</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2"></th>
          </tr>
        </thead>
        {/* Table Data */}
        <tbody className="border-1 border-slate-200">
          {tasks &&
            tasks.length !== 0 &&
            tasks.map((task) => (
              <tr key={task._id}>
                {/* Tasks */}
                <td className="px-4 py-2 border-1 border-slate-200">
                  {task.name}
                </td>
                {/* Owners */}
                <td className="px-4 py-2 border-1 border-slate-200">
                  <div className="flex flex-wrap gap-1 ">
                    {task.owners.length > 1 ? (
                      task.owners.map((owner) => {
                        return (
                          <img
                            key={owner._id}
                            className="rounded-full"
                            src={`http://placehold.co/20?text=${owner.name[0]}`}
                          />
                        );
                      })
                    ) : (
                      <div
                        key={task.owners[0]._id}
                        className="flex items-center gap-2"
                      >
                        <img
                          className="rounded-full"
                          src={`http://placehold.co/20?text=${task.owners[0].name[0]}`}
                        />
                        <p className="text-sm text-zinc-500">
                          {task.owners[0].name}
                        </p>
                      </div>
                    )}
                  </div>
                </td>
                {/* Tags */}
                <td className="px-4 py-2 text-xs border-1 border-slate-200">
                  <div className="flex flex-wrap gap-2 ">
                    {task.tags.map((tag, index) => {
                      const tagData = tags.find((t) => t.name === tag);
                      const className =
                        colorMap[tagData.color] || "bg-gray-500 text-white";
                      return (
                        <span
                          className={`${className} px-2 py-1 rounded-sm text-[10px]`}
                          key={index}
                        >
                          {tag}
                        </span>
                      );
                    })}
                  </div>
                </td>
                {/* Due Date */}
                <td className="px-4 py-2 text-xs border-1 border-slate-200">
                  {generateDueDate(task.createdAt, task.timeToComplete)}
                </td>
                {/* Status */}
                <td className={`px-4 py-2 text-xs border-1 border-slate-200 `}>
                  <span
                    className={`px-2 py-1 rounded-sm ${
                      task.status === "Completed"
                        ? "bg-green-100 text-green-700"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {task.status}
                  </span>
                </td>
                {/* Details Link */}
                <td className="px-4 py-2 text-xs border-1 border-slate-200">
                  <Link to={`/tasks/${task._id}`}>
                    <FaRegArrowAltCircleRight />
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default TasksTable;
