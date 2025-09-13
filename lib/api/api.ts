import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "https://notehub-api.goit.study";

export const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    console.error("API error:", err?.response?.data ?? err.message);
    return Promise.reject(err);
  }
);

export default api;
