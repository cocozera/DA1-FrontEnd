// src/screens/LoginScreen.js
import { useContext, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
import CustomButton from "../components/CustomButton";
import CustomTextInput from "../components/CustomTextInput";
import { AuthContext } from "../context/authContext";
import { colors, typography } from "../styles/globalStyles";

export default function LoginScreen({ navigation }) {
  const { login, loading } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  console.log("🔍 LoginScreen render");

  const handleLogin = async () => {
    console.log("▶️ handleLogin presionado:", { email, password: "***" });
    if (!email || !password) {
      console.log("⚠️ handleLogin: faltan campos");
      return Toast.show({
        type: "error",
        text1: "Completa todos los campos",
      });
    }
    try {
      await login({ email, password });
      console.log("✅ handleLogin: éxito, navegando a Home");
      navigation.replace("Home");
    } catch (err) {
      console.error("❌ handleLogin:", err);
      Toast.show({ type: "error", text1: err.message });
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.wrapper}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.card}>
          <Text style={styles.title}>Iniciar sesión</Text>
          <CustomTextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <CustomTextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <CustomButton
            title="Ingresar"
            onPress={handleLogin}
            loading={loading}
          />
          <View style={styles.links}>
            <TouchableOpacity
              onPress={() => navigation.navigate("RecoverPassword")}
            >
              <Text style={styles.linkText}>
                ¿Olvidaste tu contraseña?
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("Register")}
              style={{ marginTop: 8 }}
            >
              <Text style={styles.linkText}>
                ¿No tenés cuenta? Registrate ahora
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
      <Toast />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.backgroundBeige },
  wrapper: { flex: 1, justifyContent: "center", paddingHorizontal: 20 },
  card: {
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  title: {
    ...typography.h1,
    textAlign: "center",
    marginBottom: 24,
  },
  links: { marginTop: 24, alignItems: "center" },
  linkText: { ...typography.link },
});
