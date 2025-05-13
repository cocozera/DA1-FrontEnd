// src/services/api.js
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Platform } from "react-native";

// Detecta plataforma para usar el host correcto
const API_BASE_URL =
  Platform.OS === "android"
    ? "http://10.0.2.2:8080/api"    // Android emulator
    : Platform.OS === "web"
    ? "http://localhost:8080/api"   // RN Web
    : "http://localhost:8080/api";  // iOS simulator / dispositivo físico usa localhost o IP de red

console.log("⚙️ api.js: baseURL ->", API_BASE_URL);

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use(
  async (config) => {
    console.log("➡️ Petición a", config.url);
    if (config.url && !config.url.startsWith("/auth")) {
      const token = await AsyncStorage.getItem("token");
      console.log("🔐 Token:", token);
      if (token) config.headers.Authorization = `Bearer ${token}`;
    } else {
      console.log("🔓 Ruta de auth, no se añade token");
    }
    return config;
  },
  (error) => {
    console.error("❌ Error en interceptor:", error);
    return Promise.reject(error);
  }
);

export default api;
