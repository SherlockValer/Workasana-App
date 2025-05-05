import { api, authApi } from "../api";

// get projects
export const getProjects = () => {
  return api.get("/projects");
};

// get projects without data
export const getProjectsOnly = () => {
  return api.get("/projects/only");
};

// create new project
export const createProject = (projectData) => {
  return authApi.post("/projects", projectData);
};
