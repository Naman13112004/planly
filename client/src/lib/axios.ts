import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "";

// Adjust baseURL if your backend port differs
const api = axios.create({
  baseURL: API_URL, 
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;