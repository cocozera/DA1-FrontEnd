import * as SecureStore from "expo-secure-store";
import { createContext, useEffect, useState } from "react";
import api from "../services/api";
import { loginApi, registerApi } from "../services/authService";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null); // 👤 nuevo
  const [loading, setLoading] = useState(false);
  const [initializing, setInitializing] = useState(true);

  // 🔄 Carga inicial del token y el usuario
  useEffect(() => {
    (async () => {
      try {
        const savedToken = await SecureStore.getItemAsync("token");
        if (savedToken) {
          setToken(savedToken);
          await fetchUser(); // cargar usuario
        }
      } catch (e) {
        console.error("❌ Error inicial:", e);
      } finally {
        setInitializing(false);
      }
    })();
  }, []);

  // 🧠 Cargar el usuario desde /me
  const fetchUser = async () => {
    try {
      const res = await api.get("/users/me");
      setUser(res.data); // { id, name, email... }
    } catch (err) {
      console.error("❌ Error al obtener usuario:", err);
    }
  };

  const login = async ({ email, password }) => {
    setLoading(true);
    try {
      const { success, data, error } = await loginApi({ email, password });
      if (!success) throw new Error(error);
      await SecureStore.setItemAsync("token", data.token);
      setToken(data.token);
      await fetchUser(); // cargar usuario al loguear
      return true;
    } finally {
      setLoading(false);
    }
  };

  const register = async (registerData) => {
    setLoading(true);
    try {
      const { success, data, error } = await registerApi(registerData);
      if (!success) throw new Error(error);
      if (data.token) {
        await SecureStore.setItemAsync("token", data.token);
        setToken(data.token);
        await fetchUser(); // cargar usuario al registrar
      }
      return true;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setToken(null);
    setUser(null);
    await SecureStore.deleteItemAsync("token");
  };

  if (initializing) return null;

  return (
    <AuthContext.Provider
      value={{ token, user, loading, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
