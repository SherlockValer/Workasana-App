import { api } from "../api";

// get last week data
export const getLastWeekReport = () => {
  return api.get("/report/last-week");
};

// get pending work
export const getPendingReport = () => {
  return api.get("/report/pending");
};

// get closed by teams
export const getByTeam = () => {
  return api.get("/report/closed-tasks/teams");
};

// get closed by owners
export const getByOwner = () => {
  return api.get("/report/closed-tasks/owners");
};
