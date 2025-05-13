// src/services/authService.js
import api from './api';

export const loginApi = async ({ email, password }) => {
  const { data } = await api.post('/auth/login', { email, password });
  return data;
};

export const registerApi = async ({ name, email, password, phoneNumber }) => {
  const { data } = await api.post('/auth/register', {
    name, email, password, phoneNumber
  });
  return data;
};


