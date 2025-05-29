import axios from 'axios';
import Constants from 'expo-constants';
import * as SecureStore from 'expo-secure-store';
import { Alert, Platform } from 'react-native';
import Toast from 'react-native-toast-message';
import { navigate } from '../routes/navigationRef';

const getHostIP = () => {
  let host = null;
  if (Constants.manifest?.debuggerHost) {
    host = Constants.manifest.debuggerHost.split(':')[0];
  } else if (Constants.expoConfig?.hostUri) {
    host = Constants.expoConfig.hostUri.split(':')[0];
  }
  return host
    ? `http://${host}:8080/api`
    : 'http://localhost:8080/api';
};

const API_BASE_URL =
  Platform.OS === 'android'
    ? 'http://10.0.2.2:8080/api'
    : getHostIP();

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Request interceptor (igual al tuyo)
api.interceptors.request.use(
  async config => {
    console.log('➡️ Petición a', config.url);
    if (config.url && !config.url.startsWith('/auth')) {
      const token = await SecureStore.getItemAsync('token');
      if (token) config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    console.error('❌ Error en request interceptor:', error);
    return Promise.reject(error);
  }
);

// Response interceptor mejorado
api.interceptors.response.use(
  response => response,
  async error => {
    if (!error.response) {
      console.error('🚧 Backend no disponible:', error.message);
  
      Alert.alert(
        'Sin conexión',
        'No se pudo conectar con el servidor. Inténtalo más tarde.'
      );
      Toast.show({
        type: 'error',
        text1: 'Error de conexión',
        text2: 'El servidor no responde.',
      });
    }
    else if (error.response.status === 401 || error.response.status === 403) {
      console.warn('🚫 Token inválido o expirado. Cerrando sesión...');
      await SecureStore.deleteItemAsync('token');
      navigate('Login');
    }
    else {
      console.warn(
        `⚠️ Error ${error.response.status} en ${error.config.url}:`,
        error.response.data
      );
    }

    return Promise.reject(error);
  }
);

export default api;
