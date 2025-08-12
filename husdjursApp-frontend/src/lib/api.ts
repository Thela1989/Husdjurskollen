import axios from "axios";

export const api = axios.create({ baseURL: "http://localhost:5000/api" });

export function setAuthToken(token?: string) {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    localStorage.setItem("token", token);
  } else {
    delete api.defaults.headers.common["Authorization"];
    localStorage.removeItem("token");
  }
}

const saved = localStorage.getItem("token");
if (saved) setAuthToken(saved);
