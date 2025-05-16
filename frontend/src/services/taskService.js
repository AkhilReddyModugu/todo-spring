import axios from 'axios';

const API_URL = 'http://localhost:8080/api/tasks';

export const getTasks = () => axios.get(API_URL).then((res) => res.data);

export const createTask = (task) => axios.post(API_URL, task).then((res) => res.data);

export const updateTask = (id, updatedTask) =>
  axios.put(`${API_URL}/${id}`, updatedTask).then((res) => res.data);

export const deleteTask = (id) => axios.delete(`${API_URL}/${id}`).then((res) => res.data);