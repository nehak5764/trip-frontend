
import axios from "axios";

// Read backend URL from environment variable
const API_BASE = `${import.meta.env.VITE_API_URL}/api`;

// Create Axios instance
const api = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
});

// Dynamically set Authorization token
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
export const addExpense = async ({ tripId, title, amount, token }) => {
  return axios.post(
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
