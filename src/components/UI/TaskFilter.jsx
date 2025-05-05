import { useState } from "react";
import { BsX } from "react-icons/bs";
import { TbCaretDownFilled } from "react-icons/tb";

const TaskFilter = ({ owners, tags, setFilters }) => {
  const [owner, setOwner] = useState("All");
  const [tag, setTag] = useState("All");

  const [isOpen, setOpen] = useState(false);

  const handleFilter = () => {
    const filterObj = { owner, tag };
    setFilters(filterObj);
  };

  const handleClear = () => {
    setOwner("All");
    setTag("All");
    const filterObj = { owner: "All", tag: "All" };
    setFilters(filterObj);
  };

  const handleFilterOpen = () => {
    isOpen ? setOpen(false) : setOpen(true);
  };

  return (
    <div className="relative">
      <div
        onClick={handleFilterOpen}
        className="flex gap-1 justify-between align-middle items-center bg-zinc-100 p-1 rounded-sm"
      >
        <span>Filter</span>
        <TbCaretDownFilled />
      </div>
      {isOpen && (
        <div className="absolute z-10 top-8 right-0 w-48 h-fit  bg-white rounded-lg p-4 border border-slate-200 shadow-sm">
          <div className="flex justify-between mb-2">
            <h1>Filters</h1>
            <button
              onClick={() => setOpen(false)}
              className="text-slate-700 p-1 hover:text-rose-800 hover:bg-rose-200 rounded-sm"
            >
              <BsX />
            </button>
          </div>
          <hr className="border border-slate-200" />
          <div className="mt-2">
            <h1>Owner</h1>
            <select
              onChange={(e) => setOwner(e.target.value)}
              className="w-full mt-2 border border-slate-200 p-1 rounded-sm focus:outline-none focus:ring focus:ring-sky-300"
              name="ownerFilter"
              id="ownerFilter"
              value={owner}
            >
              <option value="All">Select</option>
              {owners &&
                owners.length !== 0 &&
                owners.map((owner, index) => (
                  <option key={index} value={owner}>
                    {owner}
                  </option>
                ))}
            </select>
          </div>
          <div className="mt-3">
            <h1>Tag</h1>
            <select
              onChange={(e) => setTag(e.target.value)}
              className="w-full mt-2 border border-slate-200 p-1 rounded-sm focus:outline-none focus:ring focus:ring-sky-300"
              name="ownerFilter"
              id="ownerFilter"
              value={tag}
            >
              <option value="All">Select</option>
              {tags &&
                tags.length !== 0 &&
                tags.map((tag, index) => (
                  <option key={index} value={tag}>
                    {tag}
                  </option>
                ))}
            </select>
          </div>
          <hr className="border border-slate-200 my-4" />
          <div className="flex gap-2 justify-end">
            <button
              onClick={handleClear}
              className="text-white bg-slate-500 hover:bg-slate-600 rounded-sm cursor-pointer px-2 py-1 "
            >
              Clear
            </button>
            <button
              onClick={handleFilter}
              className="text-white bg-blue-700 hover:bg-blue-800 rounded-sm cursor-pointer px-2 py-1 "
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskFilter;
