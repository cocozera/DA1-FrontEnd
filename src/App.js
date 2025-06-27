// App.js

import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { useContext, useEffect } from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { enableScreens } from 'react-native-screens';
import Toast from 'react-native-toast-message';

import AsyncStorage from '@react-native-async-storage/async-storage';

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
  const { user } = useContext(AuthContext);

  useEffect(() => {
    async function setupNotifications() {
      if (!user?.id) return;
      await configureNotifications();
      const granted = await requestNotificationPermissions();
      if (!granted) return;
      await registerPushToken(user.id);
      startPeriodicNotifications(10);
      await registerBackgroundFetch(user.id);
    }
    setupNotifications();
    return () => {
      stopPeriodicNotifications();
    };
  }, [user?.id]);

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

  // Limpia cualquier token de AsyncStorage al arrancar
  useEffect(() => {
    AsyncStorage.removeItem('userToken');
    AsyncStorage.removeItem('refreshToken');
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <AuthProvider>
      <StatusBar barStyle="dark-content" />
      <AppContent />
    </AuthProvider>
  );
}
