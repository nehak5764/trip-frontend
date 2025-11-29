import { io } from "socket.io-client";

let socket = null;

/**
 * Connects the socket with the given JWT token
 * @param {string} token
 */
export const connectSocket = (token) => {
  if (!token) {
    console.warn("❌ No token provided. Socket will not authenticate.");
    return;
  }

  // Disconnect existing socket if any
  if (socket) {
    socket.disconnect();
  }

  // Use environment variable for backend URL
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  if (!backendUrl) {
    console.error("❌ VITE_BACKEND_URL is not defined!");
    return;
  }

  // Initialize socket connection
  socket = io(backendUrl, {
    transports: ["websocket"],
    withCredentials: true,
    auth: { token },
  });

  socket.on("connect", () => {
    console.log("✅ Socket connected:", socket.id);
  });

  socket.on("disconnect", (reason) => {
    console.log("⚡ Socket disconnected:", reason);
  });

  socket.on("connect_error", (err) => {
    console.error("❌ Socket connection error:", err.message);
  });
};

/**
 * Disconnects the current socket
 */
export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
    console.log("⚡ Socket disconnected manually");
  }
};

/**
 * Get current socket instance
 * @returns {Socket | null}
 */
export const getSocket = () => socket;

/**
 * Safe emit function
 */
export const emitEvent = (event, payload) => {
  if (socket && socket.connected) {
    socket.emit(event, payload);
  } else {
    console.warn(`⚠️ Cannot emit '${event}' - socket not connected yet.`);
  }
};
