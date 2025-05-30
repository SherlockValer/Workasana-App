import { IoMdLogOut } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useUserLoginContext } from "../context/userLoginContext";

const Setting = () => {
  const navigate = useNavigate();

  const { user } = useUserLoginContext();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="p-4 text-sm w-full">
      {user && (
        <div className="w-full sm:w-3/5 md:w-2/5 lg:w-1/5">
          <h1 className="text-2xl font-bold mb-4">Account</h1>
          <div>
            <section className="mb-6">
              <img
                src={`https://placehold.co/75?text=${user.name[0]}`}
                alt={user.name}
                className="rounded-full"
              />
            </section>
            <section className="mb-6">
              <p className="text-gray-500 mb-2">Full Name</p>
              <p className="w-full p-2 border border-gray-300 text-gray-700 rounded-sm cursor-pointer">
                {user.name}
              </p>
            </section>
            <section className="mb-8">
              <p className="text-gray-500 mb-2">Email</p>
              <p className="w-full p-2 border border-gray-300 text-gray-700 rounded-sm cursor-pointer">
                {user.email}
              </p>
            </section>
          </div>

          <button
            onClick={handleLogout}
            className="flex gap-2 leading-none bg-violet-700 text-white px-4 py-2 rounded-sm text-sm cursor-pointer hover:bg-violet-800"
          >
            <IoMdLogOut />
            Logout
          </button>
        </div>
      )}
      {!user && (
        <div className="flex h-80 justify-center items-center">
          <div className="loader"></div>
        </div>
      )}
    </div>
  );
};

export default Setting;
