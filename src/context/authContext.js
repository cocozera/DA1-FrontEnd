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
    
    // Guardar token en estado y en storage
    setToken(newToken);
    await AsyncStorage.setItem("token", newToken);

    // Traer perfil del usuario con el token
    const profile = await getProfile();
    setUser(profile); // ✅ user ahora tiene name, email, phoneNumber, etc.
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
