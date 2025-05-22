import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "react-native";
import "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { enableScreens } from "react-native-screens";
import Toast from "react-native-toast-message";
import { AuthProvider } from "../src/context/authContext";
import { navigationRef } from "../src/routes/navigationRef";
import AppNavigator from "./routes/AppNavigator";

enableScreens();

const App = () => {
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
};

export default App;
