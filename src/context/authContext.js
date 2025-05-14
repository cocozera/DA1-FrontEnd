// src/context/authContext.js
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";
import { loginApi, registerApi } from "../services/authService";
import { getProfile } from '../services/userService';


export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [initializing, setInitializing] = useState(true);

  console.log("👤 AuthProvider render, token:", token);

  useEffect(() => {
    console.log("⏳ AuthProvider cargando token desde AsyncStorage");
    (async () => {
      const savedToken = await AsyncStorage.getItem("token");
      if (savedToken) {
        console.log("✅ Token encontrado:", savedToken);
        setToken(savedToken);
        // opcional: fetch /me para poblar `user`
      } else {
        console.log("🚫 No hay token guardado");
      }
      setInitializing(false);
    })();
  }, []);

  const login = async ({ email, password }) => {
  setLoading(true);
  try {
    const { token: newToken } = await loginApi({ email, password });
    setToken(newToken);
    await AsyncStorage.setItem("token", newToken);

    // 🔁 Recuperar userId desde otro lado o backend
    const savedUserId = await AsyncStorage.getItem("userId");
    const userId = savedUserId ? parseInt(savedUserId) : null;

    if (!userId) {
      console.warn("⚠️ No hay userId guardado, no puedo hacer /me");
      return;
    }

    const profile = await getProfile(userId);
    setUser(profile);
  } finally {
    setLoading(false);
  }
};

  const register = async (data) => {
    console.log("🔄 AuthContext.register iniciando con:", data);
    setLoading(true);
    try {
      const { token: newToken, user: userData } = await registerApi(data);
      console.log("🆕 Registro exitoso, token:", newToken, "user:", userData);
      setToken(newToken);
      setUser(userData);
      await AsyncStorage.setItem("token", newToken);
    } finally {
      setLoading(false);
      console.log("🔄 AuthContext.register terminó");
    }
  };

  const logout = async () => {
    console.log("🚪 AuthContext.logout");
    setUser(null);
    setToken(null);
    await AsyncStorage.removeItem("token");
  };

  if (initializing) return null;

  return (
    <AuthContext.Provider
      value={{ user, token, loading, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
