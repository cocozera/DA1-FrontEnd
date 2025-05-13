// src/services/authService.js
import api from "./api";

export const loginApi = async ({ email, password }) => {
  console.log("🔑 loginApi llamado con:", { email, password: "***" });
  try {
    const { data } = await api.post("/auth/login", { email, password });
    console.log("✅ loginApi respuesta:", data);
    return data;
  } catch (error) {
    console.error("❌ Error en loginApi:", error);
    const msg =
      error?.response?.data?.message || "Error al iniciar sesión";
    console.log("⚠️ loginApi lanza mensaje:", msg);
    throw new Error(msg);
  }
};

export const registerApi = async ({ name, email, password, phoneNumber }) => {
  console.log("📝 registerApi llamado con:", {
    name,
    email,
    phoneNumber,
    password: "***",
  });
  try {
    const { data } = await api.post("/auth/register", {
      name,
      email,
      password,
      phoneNumber,
    });
    console.log("✅ registerApi respuesta:", data);
    return data;
  } catch (error) {
    console.error("❌ Error en registerApi:", error);
    const msg =
      error?.response?.data?.message || "Error al registrarse";
    console.log("⚠️ registerApi lanza mensaje:", msg);
    throw new Error(msg);
  }
};

export const changePassword = async ({ email, code, newPassword }) => {
  try {
    const res = await api.post('/auth/change-password', {
      email,
      code,
      newPassword
    });
    return { success: true, data: res.data };
  } catch (err) {
    console.error('ERROR:', err.response?.data || err.message);
    return { success: false, error: err.response?.data || err.message };
  }
};



