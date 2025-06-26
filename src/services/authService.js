// src/services/authService.js
import api from "./api";

const parseError = (error, defaultMsg) => {
  if (!error.response) {
    return "Servidor no disponible. Por favor, inténtalo más tarde.";
  }
  
  const status = error.response.status;
  const message = error.response.data?.message || defaultMsg;
  
  // Log detallado del error para debugging (sin datos sensibles)
  console.error(`❌ Error ${status}:`, {
    url: error.config?.url,
    method: error.config?.method,
    status,
    message,
    timestamp: new Date().toISOString()
  });
  
  return message;
};

export const loginApi = async ({ email, password }) => {
  
  try {
    const { data } = await api.post("/auth/login", { email, password });
    
    return { success: true, data };
    
  } catch (error) {
    const msg = parseError(error, "Error al iniciar sesión");
    console.error("❌ Login fallido:", {
      email,
      error: msg,
      status: error.response?.status,
      timestamp: new Date().toISOString()
    });
    
    return { success: false, error: msg };
  }
};

export const registerApi = async ({ name, email, password, phoneNumber }) => {
  try {
    const { data } = await api.post("/auth/register", {
      name,
      email,
      password,
      phoneNumber,
    });
    return { success: true, data };
  } catch (error) {
    const msg = parseError(error, "Error al registrarse");
    console.error("❌ registerApi falla:", msg);
    return { success: false, error: msg };
  }
};

export const recoverPassword = async ({ email }) => {
  try {
    const { data } = await api.post("/auth/recover-password", { email });
    return { success: true, data };
  } catch (error) {
    const msg = parseError(error, "Error al enviar el código de recuperación");
    console.error("❌ recoverPassword falla:", msg);
    return { success: false, error: msg };
  }
};

export const verifyToken = async ({ email, token }) => {
  try {
    const { data } = await api.post("/auth/verify", {
      email,
      code: token,
    });
    return { success: true, data };
  } catch (error) {
    const msg = parseError(error, "Token inválido o expirado");
    console.error("❌ verifyToken falla:", msg);
    return { success: false, error: msg };
  }
};

export const changePassword = async ({ email, code, newPassword }) => {
  try {
    const { data } = await api.post("/auth/change-password", {
      email,
      code,
      newPassword,
    });
    return { success: true, data };
  } catch (error) {
    const msg = parseError(error, "Error al cambiar la contraseña");
    console.error("❌ changePassword falla:", msg);
    return { success: false, error: msg };
  }
};
