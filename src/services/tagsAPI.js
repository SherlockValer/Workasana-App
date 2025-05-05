import { api } from "../api";

export const getTags = () => {
  return api.get("/tags");
};

export const getTagByName = (tagName) => {
  return api.get(`/tags?name=${tagName}`);
};
