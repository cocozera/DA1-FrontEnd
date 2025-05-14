// src/services/userService.js
import api from './api';

export const getProfile = async (userId) => {
  const { data } = await api.get(`/users/me`, {
    params: { userId }  // 👈 se envía como query param
  });
  return data;
};