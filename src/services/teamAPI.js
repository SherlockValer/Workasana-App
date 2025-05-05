import { api, authApi } from "../api";

// get teams
export const getTeams = () => {
  return api.get("/teams");
};

// get teams
export const getTeamsWithData = () => {
  return api.get("/teams/data");
};

// create team
export const createTeams = (teamData) => {
  return authApi.post("/teams", teamData);
};
