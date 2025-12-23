import React, { createContext, useEffect, useState } from "react";
import { connectSocket } from "../services/notificationService";

export const NotificationsContext = createContext();

export const NotificationsProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!token || !user) return;

    const socket = connectSocket(token);

    // 🔴 Quand une nouvelle notification arrive
    socket.on("newNotification", (notif) => {
      setNotifications((prev) => [notif, ...prev]);
    });

    // 🟢 Quand une notification est marquée comme lue
    socket.on("notificationRead", ({ id }) => {
      setNotifications((n) =>
        n.map((notif) =>
          notif.id === id ? { ...notif, isRead: true } : notif
        )
      );
    });

    // ❌ Quand une notification est supprimée
    socket.on("notificationDeleted", ({ id }) => {
      setNotifications((n) => n.filter((notif) => notif.id !== id));
    });

    return () => {
      socket.disconnect();
    };
  }, [token, user]);

  return (
    <NotificationsContext.Provider value={{ notifications, setNotifications }}>
      {children}
    </NotificationsContext.Provider>
  );
};
