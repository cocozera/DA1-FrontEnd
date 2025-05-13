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



