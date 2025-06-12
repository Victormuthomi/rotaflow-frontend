import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // 🔁 change this if your backend is hosted elsewhere
  withCredentials: true,
});

export default api;
