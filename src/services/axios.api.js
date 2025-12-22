import axios from "axios";

const axiosApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Validación en desarrollo (opcional pero útil)
if (!process.env.NEXT_PUBLIC_BACKEND_URL) {
  console.warn("⚠️ NEXT_PUBLIC_BACKEND_URL no está definida");
}

export default axiosApi;
