import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "react-native";
import "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { enableScreens } from "react-native-screens";
import Toast from "react-native-toast-message";
import AppNavigator from "./routes/AppNavigator";

enableScreens();

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaProvider>
        <NavigationContainer>
          <AppNavigator />
          <Toast /> 
        </NavigationContainer>
      </SafeAreaProvider>
    </>
  );
};

export default App;
