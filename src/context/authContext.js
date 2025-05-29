import * as SecureStore from "expo-secure-store";
import { createContext, useEffect, useState } from "react";
import { loginApi, registerApi } from "../services/authService";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [initializing, setInitializing] = useState(true);

  // Carga inicial del token
  useEffect(() => {
    (async () => {
      console.log("⏳ Cargando token desde SecureStore");
      try {
        const savedToken = await SecureStore.getItemAsync("token");
        if (savedToken) {
          console.log("✅ Token encontrado:", savedToken);
          setToken(savedToken);
        } else {
          console.log("🚫 No hay token guardado");
        }
      } catch (e) {
        console.error("❌ Error al cargar token:", e);
      } finally {
        setInitializing(false);
      }
    })();
  }, []);

  // Login: guarda el token y devuelve true o lanza error
  const login = async ({ email, password }) => {
    setLoading(true);
    try {
      const { success, data, error } = await loginApi({ email, password });
      if (!success) throw new Error(error);
      const newToken = data.token;
      console.log("🔑 Guardando token:", newToken);
      await SecureStore.setItemAsync("token", newToken);
      setToken(newToken);
      return true;
    } finally {
      setLoading(false);
    }
  };

  // Register: igual que login, si viene token lo guarda
  const register = async (registerData) => {
    setLoading(true);
    try {
      const { success, data, error } = await registerApi(registerData);
      if (!success) throw new Error(error);
      if (data.token) {
        console.log("🆕 Registro, guardando token:", data.token);
        await SecureStore.setItemAsync("token", data.token);
        setToken(data.token);
      }
      return true;
    } finally {
      setLoading(false);
    }
  };

  // Logout: borra token
  const logout = async () => {
    console.log("🚪 Logout");
    setToken(null);
    await SecureStore.deleteItemAsync("token");
  };

  if (initializing) return null;

  return (
    <AuthContext.Provider
      value={{ token, loading, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
