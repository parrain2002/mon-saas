// src/pages/notificationsService.js
import axios from "axios";

const API_BASE = "http://localhost:3000/notifications";

function authHeader(token) {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
}

export async function getUserNotifications(token) {
  const res = await axios.get(API_BASE, authHeader(token));
  return res.data;
}

export async function getUnreadCount(token) {
  const res = await axios.get(`${API_BASE}/unread/count`, authHeader(token));
  return res.data;
}

export async function markAsRead(notificationId, token) {
  const res = await axios.patch(`${API_BASE}/${notificationId}/read`, {}, authHeader(token));
  return res.data;
}

export async function deleteNotification(notificationId, token) {
  // 204 expected - axios returns empty data
  const res = await axios.delete(`${API_BASE}/${notificationId}`, authHeader(token));
  return res.data;
}

// optional: to create test notification
export async function sendTestNotification(userId, message, token) {
  const res = await axios.post(`${API_BASE}/test`, { userId, message }, authHeader(token));
  return res.data;
}
