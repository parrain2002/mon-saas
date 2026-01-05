// src/tasks/taskService.js
import axios from "axios";

// On récupère l'URL depuis les variables d'environnement (Vite)
// Si elle n'est pas définie, on garde localhost par défaut
const API = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const getTasks = async (token) => {
  const res = await axios.get(`${API}/tasks`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const createTask = async (payload, token) => {
  const res = await axios.post(`${API}/tasks`, payload, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const updateTask = async (id, payload, token) => {
  const res = await axios.put(`${API}/tasks/${id}`, payload, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const deleteTask = async (id, token) => {
  const res = await axios.delete(`${API}/tasks/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const getProjectMembers = async (projectId, token) => {
  try {
    const res = await axios.get(`${API}/projects/${projectId}/members`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (err) {
    try {
      const projectRes = await axios.get(`${API}/projects/${projectId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const managerId = projectRes.data.managerId;
      const usersRes = await axios.get(`${API}/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return usersRes.data.filter((u) => u.managerId === managerId);
    } catch (e) {
      return [];
    }
  }
};

export const getProjects = async (token) => {
  const res = await axios.get(`${API}/projects`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};