import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useEffect, useState } from 'react';
import { loginApi, registerApi } from '../services/authService';

export const AuthContext = createContext({
  user: null,
  token: null,
  loading: false,
  login: async () => {},
  register: async () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser]     = useState(null);
  const [token, setToken]   = useState(null);
  const [loading, setLoading] = useState(false);
  const [initializing, setInitializing] = useState(true);

  // Al montar, tratamos de recargar token de AsyncStorage
  useEffect(() => {
    (async () => {
      const savedToken = await AsyncStorage.getItem('token');
      if (savedToken) {
        setToken(savedToken);
        // opcional: podrías pedir /me para recargar user
      }
      setInitializing(false);
    })();
  }, []);

  const login = async (creds) => {
    setLoading(true);
    try {
      const { token: newToken, user: userData } = await loginApi(creds);
      setToken(newToken);
      setUser(userData);
      await AsyncStorage.setItem('token', newToken);
    } finally {
      setLoading(false);
    }
  };

  const register = async (data) => {
    setLoading(true);
    try {
      const { token: newToken, user: userData } = await registerApi(data);
      setToken(newToken);
      setUser(userData);
      await AsyncStorage.setItem('token', newToken);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setUser(null);
    setToken(null);
    await AsyncStorage.removeItem('token');
  };

  // Mientras recargamos token, no renderizamos nada
  if (initializing) return null;

  return (
    <AuthContext.Provider
      value={{ user, token, loading, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
