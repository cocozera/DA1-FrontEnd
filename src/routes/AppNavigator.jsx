import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChangePasswordScreen from '../screens/ChangePasswordScreen';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import ProfileScreen from '../screens/ProfileScreen';
import RecoverPasswordScreen from '../screens/RecoverPasswordScreen';
import RegisterScreen from '../screens/RegisterScreen';
import TokenVerificationScreen from '../screens/TokenVerificationScreen';
import ViewAllRoutesScreen from '../screens/ViewAllRoutesScreen';


const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="RecoverPassword" component={RecoverPasswordScreen} />
      <Stack.Screen name="TokenVerification" component={TokenVerificationScreen} />
      <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="ViewAllRoutes" component={ViewAllRoutesScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
}
