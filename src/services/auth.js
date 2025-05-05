import { api, authApi } from "../api";

export const login = (credentials) => {
  return api.post("/auth/login", credentials);
};

export const signUp = (userData) => {
  return api.post("/auth/signup", userData);
};

export const userDetails = () => {
  return authApi.get("auth/me");
};
