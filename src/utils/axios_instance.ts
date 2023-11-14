import axios from "axios";
export const instance = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
  baseURL: import.meta.env.VITE_BASEURL || "http://localhost:5000/user/",
});
