import axios from "axios";

const API = "http://localhost:3000/auth";
import { LoginData, RegisterData } from '../models/Auth.model'; // 👈 Import des interfaces

export async function register(data: RegisterData) {
  const res = await axios.post(`${API}/register`, data);
  return res.data;
}

export async function login(email: string, password: string) { 
  // 🚨 CORRECTION : Envoyer l'objet JSON contenant les deux variables
  const res = await axios.post(`${API}/login`, {
    email: email, // 👈 Envoyer l'objet structuré dans le BODY
    password: password,
  });
  return res.data;
}
