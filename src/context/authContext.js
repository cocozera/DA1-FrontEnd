import * as SecureStore from "expo-secure-store";
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
    console.log("⏳ AuthProvider cargando token desde SecureStore");
    (async () => {
      const savedToken = await SecureStore.getItemAsync("token");
      if (savedToken) {
        console.log("✅ Token encontrado:", savedToken);
        setToken(savedToken);
        try {
          const profile = await getProfile();
          setUser(profile);
        } catch (e) {
          console.log("⚠️ Error obteniendo perfil con token guardado:", e);
        }
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
      await SecureStore.setItemAsync("token", newToken);

      const profile = await getProfile();
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
      await SecureStore.setItemAsync("token", newToken);
      setUser(userData);
    } finally {
      setLoading(false);
      console.log("🔄 AuthContext.register terminó");
    }
  };

  const logout = async () => {
    console.log("🚪 AuthContext.logout");
    setUser(null);
    setToken(null);
    await SecureStore.deleteItemAsync("token");
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
