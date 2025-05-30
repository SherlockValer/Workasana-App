import { FaCaretDown } from "react-icons/fa";

const ProjectSelect = ({
  projectList,
  currentProject,
  project,
  setProject,
}) => {
  return (
    <div className="col-span-2">
      <label
        htmlFor="name"
        className="block mb-2 text-sm font-medium text-gray-900 "
      >
        Select Project
      </label>
      <div className="relative">
        <select
          className="appearance-none bg-gray-50 border border-gray-300 text-gray-600 text-sm rounded-sm focus:outline-none focus:shadow-sm block w-full p-2.5 cursor-pointer"
          name="project"
          id="project"
          value={project}
          onChange={(e) => setProject(e.target.value)}
          required
        >
          <option value="">Dropdown</option>
          {currentProject ? (
            <option value={currentProject._id}>{currentProject.name}</option>
          ) : (
            projectList?.map((proj) => (
              <option key={proj._id} value={proj._id}>
                {proj.name}
              </option>
            ))
          )}
        </select>
        <FaCaretDown className="absolute right-2.5 top-3 text-gray-600" />
      </div>
    </div>
  );
};

export default ProjectSelect;
