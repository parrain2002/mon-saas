import React, { useContext } from "react";
import { NotificationsContext } from "../context/NotificationsContext";

const NotificationBell = () => {
  const { notifications } = useContext(NotificationsContext);

  const unread = notifications.filter((n) => !n.isRead).length;

  return (
    <div style={{ position: "relative", cursor: "pointer" }}>
      🔔
      {unread > 0 && (
        <span
          style={{
            position: "absolute",
            top: -5,
            right: -5,
            background: "red",
            color: "#fff",
            borderRadius: "50%",
            padding: "3px 7px",
            fontSize: "12px",
          }}
        >
          {unread}
        </span>
      )}
    </div>
  );
};

export default NotificationBell;
