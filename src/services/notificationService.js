import { io } from "socket.io-client";

let socket = null;

// URL dynamique : utilise Render sur Netlify, sinon localhost
const SOCKET_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const connectSocket = (token) => {
  socket = io(SOCKET_URL, {
    extraHeaders: {
      Authorization: `Bearer ${token}`,
    }
  });

  return socket;
};

export const getSocket = () => socket;
