import { io } from "socket.io-client";

let socket = null;

export const connectSocket = (token) => {
  socket = io("http://localhost:3000", {
    extraHeaders: {
      Authorization: `Bearer ${token}`,
    }
  });

  return socket;
};

export const getSocket = () => socket;
