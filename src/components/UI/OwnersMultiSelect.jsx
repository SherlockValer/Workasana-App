import { useState } from "react";
import { FaCaretDown } from "react-icons/fa";
import { BsX } from "react-icons/bs";

const OwnersMultiSelect = ({ userList, selectedUsers, selectUsers }) => {
  const [isOpen, setOpen] = useState(false);

  const handleUserCheckbox = (e) => {
    const { checked, value } = e.target;
    checked
      ? selectUsers((prev) => [...prev, value])
      : selectUsers((prev) => prev.filter((userID) => userID !== value));
  };

  const handleDeleteSelect = (e, id) => {
    e.stopPropagation();
    selectUsers((prev) => prev.filter((userID) => userID !== id));
  };

  return (
    <div className="col-span-2">
      <label
        htmlFor="owners"
        className="block mb-2 text-sm font-medium text-gray-900 "
      >
        Select Team Members
      </label>

      <div className="w-full">
        <div
          onClick={() => setOpen((isOpen) => !isOpen)}
          className="h-auto flex justify-between align-middle bg-gray-50 border border-gray-300 text-gray-600 text-sm rounded-sm p-2.5 cursor-pointer"
        >
          <div className="flex flex-wrap gap-1">
            {selectedUsers?.length !== 0
              ? selectedUsers?.map((userID) => (
                  <div className="flex gap-1 leading-none bg-white p-2  rounded-sm shadow-lg">
                    {userList && userList.length !== 0 && (
                      <div>
                        {userList.find((user) => user._id === userID).name}
                      </div>
                    )}

                    <BsX
                      onClick={(e) => handleDeleteSelect(e, userID)}
                      className="cursor-pointer"
                    />
                  </div>
                ))
              : "Add Team Members"}
          </div>
          <div>
            <FaCaretDown className="text-base" />
          </div>
        </div>
        <div className="w-full relative">
          {isOpen && (
            <div className="absolute top-2 z-10 left-0 grid grid-cols-3 gap-y-2 justify-items-center bg-gray-50 border border-gray-300 text-gray-600 text-sm rounded-sm w-full p-2.5">
              {userList?.length !== 0 &&
                userList?.map((user) => (
                  <label
                    key={user._id}
                    htmlFor={user.name}
                    className="w-25 flex align-middle gap-2"
                  >
                    <input
                      type="checkbox"
                      value={user._id}
                      id={user.name}
                      checked={selectedUsers.includes(user._id)}
                      onChange={(e) => handleUserCheckbox(e)}
                    />
                    {user.name}
                  </label>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OwnersMultiSelect;
