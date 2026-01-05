// src/tasks/TaskPage.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getTasks,
  getProjects,
  createTask,
  updateTask,
  deleteTask,
} from "./taskService";
import TaskList from "./TaskList";
import TaskForm from "./TaskForm";
import { io } from "socket.io-client";

export default function TaskPage() {
  const nav = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // RÉCUPÉRATION DE L'URL DEPUIS NETLIFY (OU LOCALHOST)
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

  useEffect(() => {
    if (!token) {
      nav("/login");
      return;
    }

    let mounted = true;

    (async () => {
      try {
        const [t, p] = await Promise.all([getTasks(token), getProjects(token)]);
        if (!mounted) return;
        setTasks(t);
        setProjects(p);
      } catch (err) {
        console.error("load tasks/projects", err);
        if (err?.response?.status === 401) nav("/login");
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    // CONFIGURATION SOCKET.IO DYNAMIQUE
    const socket = io(API_URL, {
      auth: { token: `Bearer ${token}` },
      transports: ["websocket"],
    });

    socket.on("connect", () => {
       console.log("Connecté au serveur temps réel sur :", API_URL);
    });

    socket.on("newNotification", (payload) => {
      (async () => {
        try {
          const refreshed = await getTasks(token);
          if (mounted) setTasks(refreshed);
        } catch (e) {
          console.error("Erreur refresh socket", e);
        }
      })();
    });

    return () => {
      mounted = false;
      socket.disconnect();
    };
  }, [token, nav, API_URL]);

  const handleCreate = async (data) => {
    try {
      const created = await createTask(data, token);
      setTasks((prev) => [created, ...prev]);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Erreur création tâche");
    }
  };

  const handleToggle = async (task) => {
    try {
      const updated = await updateTask(task.id, { completed: !task.completed }, token);
      setTasks((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
    } catch (err) {
      console.error(err);
      alert("Erreur mise à jour");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Supprimer cette tâche ?")) return;
    try {
      await deleteTask(id, token);
      setTasks((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      console.error(err);
      alert("Erreur suppression");
    }
  };

  if (loading) return <p>Chargement des tâches…</p>;

  return (
    <div>
      <h1>Tasks</h1>

      {(role === "ADMIN" || role === "MANAGER") && (
        <div style={{ marginBottom: 20 }}>
          <h2>Créer une tâche</h2>
          <TaskForm projects={projects} onCreate={handleCreate} />
        </div>
      )}

      <TaskList
        tasks={tasks}
        onToggle={handleToggle}
        onDelete={handleDelete}
        projects={projects}
      />
    </div>
  );
}