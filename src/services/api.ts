import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000", // Ton API NestJS
  withCredentials: true,            // Si tu utilises des cookies
});

export default api;
