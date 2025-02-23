import API from "./api";

export const registerService = async (userData) => {
  return API.post("/auth/register", userData);
};

export const loginService = async (credentials) => {
  return API.post("/auth/login", credentials);
};
