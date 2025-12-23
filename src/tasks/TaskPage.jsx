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
        // redirect on auth error
        if (err?.response?.status === 401) nav("/login");
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    // socket for realtime: incrementally update list on new notifications/tasks if needed
    const socket = io("http://localhost:3000", {
      auth: { token: `Bearer ${token}` },
      transports: ["websocket"],
    });

    socket.on("connect", () => {
      // console.log("socket connected - tasks page");
    });

    socket.on("newNotification", (payload) => {
      // payload may contain task info; conservative approach: refetch tasks
      (async () => {
        try {
          const refreshed = await getTasks(token);
          setTasks(refreshed);
        } catch (e) {
          // ignore
        }
      })();
    });

    return () => {
      mounted = false;
      socket.disconnect();
    };
  }, []);

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
