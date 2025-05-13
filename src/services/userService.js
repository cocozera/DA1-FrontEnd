// src/services/userService.js
import api from './api';

export const getProfile = async () => {
  const { data } = await api.get('/user/me');
  return data;
};