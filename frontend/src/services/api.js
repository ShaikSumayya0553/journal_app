import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to automatically attach authorization token to outgoing requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("journal_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;