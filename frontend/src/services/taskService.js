import API from "./api";

export const getTasks = (filters = {}) => {
  const queryParams = new URLSearchParams(filters).toString();
  return API.get(`/tasks?${queryParams}`);
};
export const getTask = (id) => API.get(`/tasks/${id}`);
export const createTask = (task) => API.post("/tasks", task);
export const updateTask = (id, task) => API.put(`/tasks/${id}`, task);
export const deleteTask = (id) => API.delete(`/tasks/${id}`);
