
import axios from "axios";

// Base URL for backend
const API_BASE = "http://localhost:5000/api";

// Create an Axios instance
const api = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
});

// Set the Authorization header dynamically
export const setToken = (token) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

/* -------------------- AUTH -------------------- */
export const registerUser = (data) => api.post("/auth/signup", data);
export const loginUser = (data) => api.post("/auth/login", data);

/* -------------------- TRIPS -------------------- */
export const getTrips = () => api.get("/trips");
export const getTripById = (id) => api.get(`/trips/${id}`);
export const createTrip = (data) => api.post("/trips", data);

/* -------------------- EXPENSES -------------------- */
// ✅ FIXED: Send token properly in Authorization header
export const addExpense = async ({ tripId, title, amount, token }) => {
  return await axios.post(
    `${API_BASE}/expenses`,
    { tripId, title, amount },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
};

export const getExpenses = (tripId) => api.get(`/expenses/${tripId}`);

/* -------------------- POLLS -------------------- */
export const createPoll = (data) => api.post("/polls", data);
export const votePoll = (pollId, optionId) =>
  api.post(`/polls/${pollId}/vote`, { optionId });

/* -------------------- MESSAGES -------------------- */
export const getMessages = (tripId) => api.get(`/messages/${tripId}`);
export const sendMessage = (data) => api.post("/messages", data);

export default api;
