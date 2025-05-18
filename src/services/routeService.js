// services/routeService.js
import api from './api'; // tu axios con baseURL y bearer interceptor

export const getAllRoutes = () =>
  api.get('/routes/').then(res => res.data);

export const getRouteDetails = routeId =>
  api.get(`/routes/${routeId}`).then(res => res.data);

export const getRouteHistory = () =>
  api.get('/routes/completed-routes').then(res => res.data);
