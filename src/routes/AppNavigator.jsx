import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChangePasswordScreen from '../screens/ChangePasswordScreen';
import LoginScreen from '../screens/LoginScreen';
import RecoverPasswordScreen from '../screens/RecoverPasswordScreen';
import RegisterScreen from '../screens/RegisterScreen';
import TokenVerificationScreen from '../screens/TokenVerificationScreen';


const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="RecoverPassword" component={RecoverPasswordScreen} />
      <Stack.Screen name="TokenVerification" component={TokenVerificationScreen} />
      <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
    </Stack.Navigator>
  );
}
