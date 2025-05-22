import axios from 'axios';
import Constants from 'expo-constants';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';
import { navigate } from '../routes/navigationRef';

const getHostIP = () => {
  let host = null;

  if (Constants.manifest?.debuggerHost) {
    host = Constants.manifest.debuggerHost.split(':')[0];
  } else if (Constants.expoConfig?.hostUri) {
    host = Constants.expoConfig.hostUri.split(':')[0];
  }

  if (host) return `http://${host}:8080/api`;

  return 'http://localhost:8080/api'; 
};

const API_BASE_URL =
  Platform.OS === 'android'
    ? 'http://10.0.2.2:8080/api'
    : getHostIP();

console.log('⚙️ api.js: baseURL ->', API_BASE_URL);

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

// 👉 Interceptor de request
api.interceptors.request.use(
  async (config) => {
    console.log('➡️ Petición a', config.url);
    if (config.url && !config.url.startsWith('/auth')) {
      const token = await SecureStore.getItemAsync('token');
      console.log('🔐 Token:', token);
      if (token) config.headers.Authorization = `Bearer ${token}`;
    } else {
      console.log('🔓 Ruta de auth, no se añade token');
    }
    return config;
  },
  (error) => {
    console.error('❌ Error en request interceptor:', error);
    return Promise.reject(error);
  }
);

// 👉 Interceptor de response para errores 401 / 403
api.interceptors.response.use(
  response => response,
  async (error) => {
    const status = error.response?.status;
    if (status === 401 || status === 403) {
      console.warn('🚫 Token inválido o expirado. Cerrando sesión...');
      await SecureStore.deleteItemAsync('token');
      navigate('Login'); // Redirige al Login
    }
    return Promise.reject(error);
  }
);

export default api;
