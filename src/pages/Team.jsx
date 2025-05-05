import { useEffect, useState } from "react";
import { getTeamsWithData } from "../services/teamAPI";
import { LuChevronsRight } from "react-icons/lu";
import CreateTeam from "../components/Layouts/CreateTeam";
import { useNavigate } from "react-router-dom";
import { useUserLoginContext } from "../context/userLoginContext";

const Team = () => {
  const navigate = useNavigate();

  const { user, authError } = useUserLoginContext();

  const [showTeamModal, setTeamModal] = useState(false);

  const [teamList, setList] = useState([]);
  const [isOpen, setOpen] = useState(false);
  const [currentTeam, setCurrent] = useState(null);

  const [loading, setLoading] = useState(false);

  const getTeamList = async () => {
    try {
      setLoading(true);
      const response = await getTeamsWithData();
      if (response.status === 200) {
        setList(response.data.teams);
        console.log(response.data.teams);
        setLoading(false);
      }
    } catch (error) {
      console.log(error.response.data);
      setLoading(false);
    }
  };

  useEffect(() => {
    getTeamList();
  }, []);

  const handleDetails = (team) => {
    setOpen(true);
    setCurrent(team);
  };

  const handleChevronRight = () => {
    setOpen(false);
    setCurrent(null);
  };

  const handleNewTeam = () => {
    if (user) {
      setTeamModal(true);
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="flex flex-1 max-w-full">
      {!loading && (
        <>
          <div className="flex flex-col p-4">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-semibold">Teams</h1>
              <button
                className="bg-blue-700 text-white text-sm rounded-sm px-2 py-1 mx-6 cursor-pointer"
                onClick={handleNewTeam}
              >
                + New Team
              </button>
            </div>
            <div className="flex flex-wrap gap-2 my-8">
              {teamList.length !== 0 &&
                teamList.map((team) => (
                  <div
                    onClick={() => handleDetails(team)}
                    className="w-62 flex flex-col justify-between bg-zinc-100 p-2.5 rounded-sm cursor-pointer hover:bg-violet-100"
                  >
                    <div>
                      <h1 className="text-base mb-2 font-bold">
                        {team.team.name}
                      </h1>
                      <p className="text-xs text-gray-500 mb-4">
                        {team.team.description}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-zinc-600 mb-2">
                        Members :
                      </p>
                      <div className="flex flex-wrap  gap-1 ">
                        {team.owners.length > 1 ? (
                          team.owners.map((owner) => {
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
                            key={team.owners[0]._id}
                            className="flex items-center gap-2"
                          >
                            <img
                              className="rounded-full"
                              src={`http://placehold.co/20?text=${team.owners[0].name[0]}`}
                            />
                            <p className="text-sm text-zinc-500">
                              {team.owners[0].name}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          {isOpen && (
            <div
              className={`relative min-w-62 min-h-screen bg-zinc-200 rounded-l-lg p-4 `}
            >
              <div className="fixed max-w-60 min-w-55 top-4 bottom-5 overflow-y-auto overflow-x-hidden teamscroller">
                <div className="">
                  <LuChevronsRight
                    onClick={handleChevronRight}
                    className="cursor-pointer"
                  />
                </div>
                <h1 className="mt-4 mb-2 text-xl font-semibold text-zinc-700">
                  {currentTeam.team.name} Team
                </h1>
                <div className="text-sm">
                  <h2>Members </h2>
                  {currentTeam.owners.map((owner) => (
                    <div className="w-11/12 flex gap-3 items-center p-2 bg-white my-2 rounded-sm">
                      <img
                        key={owner._id}
                        className="rounded-full"
                        src={`http://placehold.co/30?text=${owner.name[0]}`}
                      />
                      <div>
                        <h3>{owner.name}</h3>
                        <p className="text-gray-700 text-xs">{owner.email}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          {/* New Team */}
          {showTeamModal && <CreateTeam setTeamModal={setTeamModal} />}
        </>
      )}
      {loading && (
        <div className="h-screen w-full flex justify-center items-center">
          <div className="loader "></div>
        </div>
      )}
    </div>
  );
};

export default Team;
