import { TbPlayerSkipForward } from "react-icons/tb";
import { api, authApi } from "../api";

// get task by owner
export const getTaskByID = (taskID) => {
  return api.get(`/tasks?_id=${taskID}`);
};

// get tasks by owner
export const getTasksByOwner = (userID) => {
  return api.get(`/tasks?owners=${userID}`);
};

// Create a task
export const createTask = (formData) => {
  return authApi.post("/tasks", formData);
};

// Update a task
export const updateTask = (taskID, formData) => {
  return authApi.post(`/tasks/${taskID}`, formData);
};
