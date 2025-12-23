// src/pages/Projects.jsx

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject
} from "../services/projectService";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editing, setEditing] = useState(null); // id du projet en édition
  const [form, setForm] = useState({ name: "", description: "" });

  const nav = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      nav("/login");
      return;
    }

    (async () => {
      try {
        const data = await getProjects(token);
        setProjects(data);
      } catch (err) {
        console.error(err);
        alert("Erreur chargement projets");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleCreate = async () => {
    const token = localStorage.getItem("token");

    try {
      const newProject = await createProject(form, token);
      setProjects((prev) => [...prev, newProject]);
      setForm({ name: "", description: "" });
    } catch (err) {
      alert("Erreur création projet");
      console.error(err);
    }
  };

  const handleUpdate = async () => {
    const token = localStorage.getItem("token");

    try {
      const updated = await updateProject(editing, form, token);
      setProjects((prev) =>
        prev.map((p) => (p.id === editing ? updated : p))
      );
      setEditing(null);
      setForm({ name: "", description: "" });
    } catch (err) {
      alert("Erreur modification");
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Supprimer ce projet ?")) return;
    const token = localStorage.getItem("token");

    try {
      await deleteProject(id, token);
      setProjects((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      alert("Erreur suppression");
      console.error(err);
    }
  };

  if (loading) return <p>Chargement projets…</p>;

  return (
    <div>
      <h1>Projects</h1>

      <h2>{editing ? "Modifier le projet" : "Créer un projet"}</h2>

      <div>
        <input
          name="name"
          placeholder="Project name"
          value={form.name}
          onChange={handleChange}
        />
        <input
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        />

        {!editing ? (
          <button onClick={handleCreate}>Créer</button>
        ) : (
          <button onClick={handleUpdate}>Mettre à jour</button>
        )}
      </div>

      <h2>Liste des projets</h2>

      {projects.length === 0 && <p>Aucun projet</p>}

      <ul>
        {projects.map((p) => (
          <li key={p.id} style={{ marginBottom: 10 }}>
            <div>
              <strong>{p.name}</strong>
            </div>
            <div>{p.description}</div>
            <div>Manager ID : {p.managerId}</div>

            <button
              onClick={() => {
                setEditing(p.id);
                setForm({ name: p.name, description: p.description });
              }}
            >
              Modifier
            </button>

            <button onClick={() => handleDelete(p.id)}>Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
