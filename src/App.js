// App.js
import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { enableScreens } from 'react-native-screens';
import Toast from 'react-native-toast-message';

import { AuthProvider } from '../src/context/authContext';
import { navigationRef } from '../src/routes/navigationRef';
import AppNavigator from './routes/AppNavigator';

enableScreens();

export default function App() {
  // 1. Carga Montserrat desde assets/fonts
  const [fontsLoaded] = useFonts({
    'Montserrat-Regular': require('./assets/fonts/Montserrat-Regular.ttf'),
    'Montserrat-Bold':    require('./assets/fonts/Montserrat-Bold.ttf'),
  });

  // 2. Mientras no estén listas, renderiza null
  if (!fontsLoaded) {
    return null;
  }

  // 3. Una vez cargadas, arranca la app
  return (
    <AuthProvider>
      <StatusBar barStyle="dark-content" />
      <SafeAreaProvider>
        <NavigationContainer ref={navigationRef}>
          <AppNavigator />
          <Toast />
        </NavigationContainer>
      </SafeAreaProvider>
    </AuthProvider>
  );
}
