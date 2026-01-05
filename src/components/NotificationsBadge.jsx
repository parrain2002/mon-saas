import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { getUnreadCount } from "../pages/notificationsService";
import { useNavigate } from "react-router-dom";

export default function NotificationBadge() {
  const [count, setCount] = useState(0);
  const nav = useNavigate();

  // RÉCUPÉRATION DYNAMIQUE DE L'URL
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

  const token = localStorage.getItem("token");
  
  useEffect(() => {
    if (!token) return;

    // 1️⃣ Récupérer le nombre non lus
    getUnreadCount(token)
      .then((res) => setCount(res.count))
      .catch(() => setCount(0));

    // 2️⃣ Connexion Socket.IO avec URL dynamique
    const socket = io(API_URL, {
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
  }, [token, API_URL]);

  if (!token) return null;

  return (
    <button onClick={() => nav("/notifications")} aria-label="Notifications">
      🔔 {count > 0 ? `(${count})` : ""}
    </button>
  );
}