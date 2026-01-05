import axios from "axios";
import { LoginData, RegisterData } from '../models/Auth.model';

// Utilisation de la variable d'environnement pour l'URL
const API_BASE = (import.meta as any).env.VITE_API_URL || "http://localhost:3000";
const API = `${API_BASE}/auth`;

export async function register(data: RegisterData) {
  const res = await axios.post(`${API}/register`, data);
  return res.data;
}

export async function login(email: string, password: string) { 
  const res = await axios.post(`${API}/login`, {
    email: email,
    password: password,
  });
  return res.data;
}
