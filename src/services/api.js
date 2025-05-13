// src/services/api.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

// Base URL de tu backend
const API_BASE_URL = 'http://10.0.2.2:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para añadir el Bearer token en todas las peticiones
// excepto las que van al endpoint /auth
api.interceptors.request.use(
  async config => {
    // si la petición es a /auth (login, register, etc.), la dejo pasar sin token
    if (config.url && !config.url.startsWith('/auth')) {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  error => Promise.reject(error)
);

export default api;
