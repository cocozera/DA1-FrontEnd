// src/services/authService.js
import api from "./api";

const parseError = (error, defaultMsg) => {
  if (!error.response) {
    return "Servidor no disponible. Por favor, inténtalo más tarde.";
  }
  return error.response.data?.message || defaultMsg;
};

export const loginApi = async ({ email, password }) => {
  console.log("🔑 loginApi llamado con:", { email, password: "***" });
  try {
    const { data } = await api.post("/auth/login", { email, password });
    console.log("✅ loginApi respuesta:", data);
    return { success: true, data };
  } catch (error) {
    const msg = parseError(error, "Error al iniciar sesión");
    console.error("❌ loginApi falla:", msg);
    return { success: false, error: msg };
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
    return { success: true, data };
  } catch (error) {
    const msg = parseError(error, "Error al registrarse");
    console.error("❌ registerApi falla:", msg);
    return { success: false, error: msg };
  }
};

export const recoverPassword = async ({ email }) => {
  console.log("📧 recoverPassword llamado con:", email);
  try {
    const { data } = await api.post("/auth/recover-password", { email });
    console.log("✅ recoverPassword respuesta:", data);
    return { success: true, data };
  } catch (error) {
    const msg = parseError(error, "Error al enviar el código de recuperación");
    console.error("❌ recoverPassword falla:", msg);
    return { success: false, error: msg };
  }
};

export const verifyToken = async ({ email, token }) => {
  console.log("🔍 verifyToken llamado con:", { email, token: "***" });
  try {
    const { data } = await api.post("/auth/verify", {
      email,
      code: token,
    });
    console.log("✅ verifyToken respuesta:", data);
    return { success: true, data };
  } catch (error) {
    const msg = parseError(error, "Token inválido o expirado");
    console.error("❌ verifyToken falla:", msg);
    return { success: false, error: msg };
  }
};

export const changePassword = async ({ email, code, newPassword }) => {
  console.log("🔄 changePassword llamado con:", { email, code: "***" });
  try {
    const { data } = await api.post("/auth/change-password", {
      email,
      code,
      newPassword,
    });
    console.log("✅ changePassword respuesta:", data);
    return { success: true, data };
  } catch (error) {
    const msg = parseError(error, "Error al cambiar la contraseña");
    console.error("❌ changePassword falla:", msg);
    return { success: false, error: msg };
  }
};
