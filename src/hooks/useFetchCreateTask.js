import { useEffect, useState } from "react";
import { getProjectsOnly } from "../services/projectsAPI";
import { getUsers } from "../services/usersAPI";
import { getTeams } from "../services/teamAPI";
import { getTags } from "../services/tagsAPI";

const useFetchCreateTask = () => {
  const [projectList, setProjectList] = useState([]);
  const [userList, setUserList] = useState([]);
  const [teamList, setTeamList] = useState([]);
  const [tagList, setTagList] = useState([]);

  const [loading, setLoading] = useState(false);

  const fetchDetails = async () => {
    setLoading(true);
    try {
      const [projectsRes, usersRes, teamsRes, tagsRes] = await Promise.all([
        getProjectsOnly(),
        getUsers(),
        getTeams(),
        getTags(),
      ]);

      console.log(projectsRes);

      setProjectList(projectsRes.data?.projects);
      setUserList(usersRes.data?.users);
      setTeamList(teamsRes.data?.teams);
      setTagList(tagsRes.data?.data?.tags);
    } catch (error) {
      console.log(error.response?.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  return { loading, projectList, userList, teamList, tagList };
};

export default useFetchCreateTask;
