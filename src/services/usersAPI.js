import { authApi } from "../api";

export const getUsers = () => {
  return authApi.get("/users");
};
