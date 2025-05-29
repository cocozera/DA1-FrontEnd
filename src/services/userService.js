
// src/services/userService.js
import api from './api';

const parseError = (error, defaultMsg) => {
  if (!error.response) {
    return 'Servidor no disponible. Por favor, inténtalo más tarde.';
  }
  return error.response.data?.message || defaultMsg;
};

export const getProfile = async () => {
  try {
    const { data } = await api.get('/users/me');
    return { success: true, data };
  } catch (error) {
    const msg = parseError(error, 'Error al obtener el perfil de usuario');
    console.error('❌ getProfile falla:', msg);
    return { success: false, error: msg };
  }
};
