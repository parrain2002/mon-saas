// src/tasks/taskService.js
import axios from "axios";

const API = "http://localhost:3000";

export const getTasks = async (token) => {
  const res = await axios.get(`${API}/tasks`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const createTask = async (payload, token) => {
  // payload: { title, projectId, assignedToId? }
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

// Try to fetch project members. If route /projects/:id/members doesn't exist,
// fallback to GET /users and filter by managerId of the project.
export const getProjectMembers = async (projectId, token) => {
  try {
    const res = await axios.get(`${API}/projects/${projectId}/members`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data; // expect [{id,email,name,role,...}, ...]
  } catch (err) {
    // fallback: try to fetch project to get managerId, then /users
    try {
      const projectRes = await axios.get(`${API}/projects/${projectId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const managerId = projectRes.data.managerId;
      const usersRes = await axios.get(`${API}/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // members = users whose managerId === managerId
      return usersRes.data.filter((u) => u.managerId === managerId);
    } catch (e) {
      // final fallback: return empty array
      return [];
    }
  }
};

// helper to fetch all projects for the select
export const getProjects = async (token) => {
  const res = await axios.get(`${API}/projects`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
