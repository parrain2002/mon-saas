// src/services/projectService.js

const API_URL = "http://localhost:3000/projects";

export async function getProjects(token) {
  const res = await fetch(API_URL, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!res.ok) throw new Error("Cannot fetch projects");
  return res.json();
}

export async function getProject(id, token) {
  const res = await fetch(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!res.ok) throw new Error("Cannot fetch project");
  return res.json();
}

export async function createProject(data, token) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error("Cannot create project");
  return res.json();
}

export async function updateProject(id, data, token) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error("Cannot update project");
  return res.json();
}

export async function deleteProject(id, token) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!res.ok) throw new Error("Cannot delete project");
  return res.json();
}
