import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { getUnreadCount } from "../pages/notificationsService";
import { useNavigate } from "react-router-dom";

export default function NotificationBadge() {
  const [count, setCount] = useState(0);
  const nav = useNavigate();

  const token = localStorage.getItem("token");
  if (!token) return null; // ⛔ Empêche le composant de s'exécuter avant login

  useEffect(() => {
    // 1️⃣ Récupérer le nombre non lus
    getUnreadCount(token)
      .then((res) => setCount(res.count))
      .catch(() => setCount(0));

    // 2️⃣ Connexion Socket.IO AVEC token
    const socket = io("http://localhost:3000", {
      extraHeaders: {
        Authorization: `Bearer ${token}`,
      },
      transports: ["websocket"],
    });

    socket.on("newNotification", () => {
      setCount((c) => c + 1);
    });

    socket.on("notificationRead", () => {
      setCount((c) => Math.max(0, c - 1));
    });

    socket.on("notificationDeleted", () => {
      setCount((c) => Math.max(0, c - 1));
    });

    return () => socket.disconnect();
  }, [token]);

  return (
    <button onClick={() => nav("/notifications")} aria-label="Notifications">
      🔔 {count > 0 ? `(${count})` : ""}
    </button>
  );
}
