import axios from "axios";

const api = axios.create({
  // Utilise l'URL de Render sur Netlify, sinon localhost par défaut
  baseURL: (import.meta as any).env.VITE_API_URL || "http://localhost:3000",
  withCredentials: true,
});

export default api;