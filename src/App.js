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

    async function setupNotifications() {
      
      await configureNotifications();

      const granted = await requestNotificationPermissions();

      if (!granted) {
        return;
      }

      await registerPushToken(user.id);

      startPeriodicNotifications(1);
    }

    setupNotifications();

    return () => {
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
    return null;
  }


  return (
    <AuthProvider>
      <StatusBar barStyle="dark-content" />
      <AppContent />
    </AuthProvider>
  );
}
