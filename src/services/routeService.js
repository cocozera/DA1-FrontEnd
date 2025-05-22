import api from './api';

export const getAllRoutes = async () => {
  try {
    const res = await api.get('/routes/');
    return res.data;
  } catch (err) {
    console.error('❌ Error en getAllRoutes:', err);
    throw err;
  }
};

export const getRouteDetails = async (routeId) => {
  try {
    const res = await api.get(`/routes/${routeId}`);
    return res.data;
  } catch (err) {
    console.error(`❌ Error en getRouteDetails (${routeId}):`, err);
    throw err;
  }
};

export const getRouteHistory = async () => {
  try {
    const res = await api.get('/routes/completed-routes');
    return res.data;
  } catch (err) {
    console.error('❌ Error en getRouteHistory:', err);
    throw err;
  }
};

export const getInProgressRoutes = async () => {
  try {
    const res = await api.get('/routes/inprogress-routes');
    return res.data;
  } catch (err) {
    console.error('❌ Error en getInProgressRoutes:', err);
    throw err;
  }
};

export const assignRoute = async (routeId) => {
  try {
    const res = await api.post('/routes/assign', null, {
      params: { routeId }
    });
    return res.data;
  } catch (err) {
    console.error(`❌ Error en assignRoute (${routeId}):`, err);
    throw err;
  }
};

export const completeRoute = async (routeId) => {
  try {
    const res = await api.post('/routes/complete', null, {
      params: { routeId }
    });
    return res.data;
  } catch (err) {
    console.error(`❌ Error en completeRoute (${routeId}):`, err);
    throw err;
  }
};
