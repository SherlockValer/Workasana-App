import { useState } from "react";
import { BsXLg } from "react-icons/bs";
import { createProject } from "../../services/projectsAPI";

const CreateProject = ({ setShow }) => {
  const closeModal = () => setShow(false);

  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);

  const [formRes, setRes] = useState(null);
  const [formLoad, setLoad] = useState(false);
  const [formErr, setErr] = useState(null);

  const handleForm = async (e) => {
    e.preventDefault();
    try {
      setLoad(true);
      const requestData = {
        name,
        description,
      };

      const response = await createProject(requestData);
      if (response.status === 201) {
        setRes("Project Created Successfully!");
        setLoad(false);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    } catch (error) {
      setErr(error.response.data.message);
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
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t  border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 ">
                Create New Project
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
            <form onSubmit={handleForm} className="p-4 md:p-5">
              <div className="grid gap-4 mb-4 grid-cols-2">
                <div className="col-span-2">
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Project Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:outline-none focus:shadow-sm block w-full p-2.5 "
                    placeholder="Enter Project Name"
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="col-span-2">
                  <label
                    htmlFor="description"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Project Description
                  </label>
                  <textarea
                    id="description"
                    rows={4}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:outline-none focus:shadow-sm"
                    placeholder="Enter Project Description"
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
              </div>

              {formRes && (
                <div className="bg-green-100 text-green-700 border border-green-500 rounded-lg p-2 text-sm">
                  <p>{formRes}</p>
                </div>
              )}

              {formLoad && (
                <div className="bg-cyan-100 text-cyan-700 border border-cyan-500 rounded-lg p-2 text-sm">
                  <p>Saving Project...</p>
                </div>
              )}

              {formErr && (
                <div className="bg-rose-100 text-rose-700 border border-rose-500 rounded-lg p-2 text-sm">
                  <p>{formErr}</p>
                </div>
              )}

              <div className="flex gap-2 justify-end mt-4">
                <button
                  type="button"
                  className="text-white bg-neutral-500 hover:bg-neutral-600 focus:outline-none font-sm rounded-sm text-sm px-2 py-1 cursor-pointer"
                  onClick={() => setShow(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none font-sm rounded-sm text-sm px-2 py-1 cursor-pointer"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateProject;
