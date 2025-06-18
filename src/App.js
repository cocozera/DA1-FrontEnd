import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { useContext, useEffect } from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { enableScreens } from 'react-native-screens';
import Toast from 'react-native-toast-message';

import { AuthContext, AuthProvider } from '../src/context/authContext';
import { navigationRef } from '../src/routes/navigationRef';
import AppNavigator from './routes/AppNavigator';

import {
  configureNotifications,
  registerPushToken,
  requestNotificationPermissions,
  startPeriodicNotifications,
  stopPeriodicNotifications
} from './services/notificationService';

enableScreens();

function AppContent() {
  const { user, token } = useContext(AuthContext);

  useEffect(() => {
    console.log('[App] 🔄 useEffect ejecutado - user:', user, 'token:', token);

    async function setupNotifications() {
      if (!user?.id || !token) {
        console.log('[App] ⛔ No hay user o token, no configuro notificaciones');
        return;
      }

      console.log('[App] ✅ Configurando notificaciones...');
      await configureNotifications();

      console.log('[App] 📲 Pidiendo permiso para notificaciones...');
      const granted = await requestNotificationPermissions();
      console.log('[App] 🧾 Permiso notificación otorgado:', granted);

      if (!granted) {
        console.log('🚫 Usuario no aceptó notificaciones');
        return;
      }

      console.log('[App] 📡 Registrando push token en el backend...');
      await registerPushToken(user.id);

      console.log('[App] 🔁 Iniciando polling de notificaciones cada 1 min...');
      startPeriodicNotifications(1);
    }

    setupNotifications();

    return () => {
      console.log('[App] ❌ Limpiando polling de notificaciones');
      stopPeriodicNotifications();
    };
  }, [user?.id, token]);

  return (
    <SafeAreaProvider>
      <NavigationContainer ref={navigationRef}>
        <AppNavigator />
        <Toast />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default function App() {
  const [fontsLoaded] = useFonts({
    'Montserrat-Regular': require('./assets/fonts/Montserrat-Regular.ttf'),
    'Montserrat-Bold': require('./assets/fonts/Montserrat-Bold.ttf'),
  });

  if (!fontsLoaded) {
    console.log('[App] ⏳ Cargando fuentes...');
    return null;
  }

  console.log('[App] ✅ Fuentes cargadas, renderizando App...');

  return (
    <AuthProvider>
      <StatusBar barStyle="dark-content" />
      <AppContent />
    </AuthProvider>
  );
}
