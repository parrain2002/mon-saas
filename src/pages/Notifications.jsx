// src/pages/Notifications.jsx
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  getUserNotifications,
  markAsRead,
  deleteNotification,
} from "./notificationsService";
import { io } from "socket.io-client";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const socketRef = useRef(null);
  const nav = useNavigate();

  // RÉCUPÉRATION DYNAMIQUE DE L'URL (Render sur Netlify, sinon localhost)
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      nav("/login");
      return;
    }

    let mounted = true;

    // --- 1️⃣ Récupération des notifications via API ---
    (async () => {
      try {
        const data = await getUserNotifications(token);
        if (mounted) setNotifications(data);
      } catch (err) {
        console.error("fetch notifications error", err);
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    // --- 2️⃣ Connexion WebSocket (Socket.io) ---
    const socket = io(API_URL, {
      extraHeaders: {
        Authorization: `Bearer ${token}`,
      },
      transports: ["websocket"],
    });

    socketRef.current = socket;

    socket.on("newNotification", (payload) => {
      setNotifications((prev) => [payload, ...prev]);
    });

    socket.on("notificationRead", ({ id }) => {
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
      );
    });

    socket.on("notificationDeleted", ({ id }) => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    });

    socket.on("connect_error", (err) => {
      console.error("Socket connect error:", err);
    });

    // Nettoyage à la fermeture du composant
    return () => {
      mounted = false;
      socket.disconnect();
    };
  }, [nav, API_URL]);

  const handleMarkAsRead = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await markAsRead(id, token);
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
      );
    } catch (err) {
      console.error("mark as read error", err);
      alert("Erreur lors du marquage");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Supprimer la notification ?")) return;
    const token = localStorage.getItem("token");
    try {
      await deleteNotification(id, token);
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    } catch (err) {
      console.error("delete notif error", err);
      alert("Erreur lors de la suppression");
    }
  };

  if (loading) return <p>Chargement des notifications…</p>;

  return (
    <div>
      <h1>Notifications</h1>

      {notifications.length === 0 && <p>Aucune notification</p>}

      <ul>
        {notifications.map((n) => (
          <li key={n.id} style={{ marginBottom: 12 }}>
            <div>
              <strong>{n.isRead ? "" : "[NEW] "}</strong>
              <span>{n.message}</span>
            </div>
            <div>
              <small>{new Date(n.createdAt).toLocaleString()}</small>
            </div>

            <div style={{ marginTop: 5 }}>
              {!n.isRead && (
                <button onClick={() => handleMarkAsRead(n.id)} style={{ marginRight: 10 }}>
                  Marquer lu
                </button>
              )}
              <button onClick={() => handleDelete(n.id)} style={{ color: 'red' }}>
                Supprimer
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
