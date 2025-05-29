// src/services/routeService.js
import api from './api';

const parseError = (error, defaultMsg) => {
  if (!error.response) {
    return 'Servidor no disponible. Por favor, inténtalo más tarde.';
  }
  return error.response.data?.message || defaultMsg;
};

export const getAllRoutes = async () => {
  try {
    const { data } = await api.get('/routes');
    return { success: true, data };
  } catch (error) {
    const msg = parseError(error, 'Error al obtener todas las rutas');
    console.error('❌ getAllRoutes falla:', msg);
    return { success: false, error: msg };
  }
};

export const getRouteDetails = async (routeId) => {
  try {
    const { data } = await api.get(`/routes/${routeId}`);
    return { success: true, data };
  } catch (error) {
    const msg = parseError(error, `Error al obtener detalles de la ruta ${routeId}`);
    console.error(`❌ getRouteDetails (${routeId}) falla:`, msg);
    return { success: false, error: msg };
  }
};

export const getRouteHistory = async () => {
  try {
    const { data } = await api.get('/routes/completed-routes');
    return { success: true, data };
  } catch (error) {
    const msg = parseError(error, 'Error al obtener rutas completadas');
    console.error('❌ getRouteHistory falla:', msg);
    return { success: false, error: msg };
  }
};

export const getInProgressRoutes = async () => {
  try {
    const { data } = await api.get('/routes/inprogress-routes');
    return { success: true, data };
  } catch (error) {
    const msg = parseError(error, 'Error al obtener rutas en progreso');
    console.error('❌ getInProgressRoutes falla:', msg);
    return { success: false, error: msg };
  }
};

export const assignRoute = async (routeId) => {
  try {
    const { data } = await api.post('/routes/assign', null, {
      params: { routeId },
    });
    return { success: true, data };
  } catch (error) {
    const msg = parseError(error, `Error al asignar la ruta ${routeId}`);
    console.error(`❌ assignRoute (${routeId}) falla:`, msg);
    return { success: false, error: msg };
  }
};

export const completeRoute = async (routeId) => {
  try {
    const { data } = await api.post('/routes/complete', null, {
      params: { routeId },
    });
    return { success: true, data };
  } catch (error) {
    const msg = parseError(error, `Error al completar la ruta ${routeId}`);
    console.error(`❌ completeRoute (${routeId}) falla:`, msg);
    return { success: false, error: msg };
  }
};
