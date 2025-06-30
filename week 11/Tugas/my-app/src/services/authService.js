import axios from "axios";

const API_URL = "https://backendrestu-production.up.railway.app";

export const login = async (username, password) => {
  const response = await axios.post(`${API_URL}/login`, { username, password });
  return response.data;
};

export const register = async (username, password, email, role = "user") => {
  const response = await axios.post(`${API_URL}/register`, { username, password, email, role });
  return response.data;
};