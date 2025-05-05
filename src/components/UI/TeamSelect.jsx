import { useState, useEffect } from "react";
import { FaCaretDown } from "react-icons/fa";
import { getTeams } from "../../services/teamAPI";

const TeamSelect = ({ team, selectTeam }) => {
  const [teamList, setTeamList] = useState([]);

  const getAllTeams = async () => {
    try {
      const response = await getTeams();
      if (response.status === 200) {
        setTeamList(response.data.teams);
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    getAllTeams();
  }, []);

  return (
    <div className="col-span-2">
      <label
        htmlFor="team"
        className="block mb-2 text-sm font-medium text-gray-900 "
      >
        Select Team
      </label>
      <div className="relative">
        <select
          name="team"
          id="team"
          className="appearance-none bg-gray-50 border border-gray-300 text-gray-600 text-sm rounded-sm focus:outline-none focus:shadow-sm block w-full p-2.5 cursor-pointer"
          value={team}
          onChange={(e) => selectTeam(e.target.value)}
          required
        >
          <option value="">Dropdown</option>
          {teamList.length !== 0 &&
            teamList.map((team) => (
              <option key={team._id} value={team._id}>
                {team.name}
              </option>
            ))}
        </select>
        <FaCaretDown className="absolute right-2.5 top-3 text-gray-600" />
      </div>
    </div>
  );
};

export default TeamSelect;
