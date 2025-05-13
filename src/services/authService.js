// src/services/authService.js
import api from './api';
export const loginApi = async ({ email, password }) => {
  try {
    const { data } = await api.post('/auth/login', { email, password });
    return data;
  } catch (error) {
    console.error('Error en loginApi:', error);

    // Verificar si el error tiene una respuesta y si contiene el mensaje
    if (error && error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message); // Usar el mensaje específico de la API
    }

    // Si no hay un mensaje detallado, lanzar un error genérico
    throw new Error('Error al iniciar sesión');
  }
};


export const registerApi = async ({ name, email, password, phoneNumber }) => {
  try {
    const { data } = await api.post('/auth/register', {
      name,
      email,
      password,
      phoneNumber
    });
    return data;
  } catch (error) {
    console.error('Error en registerApi:', error);
    throw new Error(error?.response?.data?.message || 'Error al registrarse');
  }
};

export const recoverPassword = async (data) => {
  try {
    const res = await api.post('/auth/recover-password', data);
    console.log('STATUS:', res.status);
    console.log('DATA:', res.data);
    return { success: true, data: res.data };
  } catch (err) {
    console.error('ERROR:', err.response?.data || err.message);
    return { success: false, error: err };
  }
};

export const verifyToken = async (data) => {
  try {
    const res = await api.post('/auth/verify-token', data);
    return { success: true, data: res.data };
  } catch (err) {
    return { success: false, error: err.response?.data || err.message };
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



