// src/screens/LoginScreen.js
import { useContext, useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import CustomButton from '../components/CustomButton';
import CustomText from '../components/CustomText'; // ← import CustomText
import CustomTextInput from '../components/CustomTextInput';
import { AuthContext } from '../context/authContext';
import { colors, typography } from '../styles/globalStyles';

export default function LoginScreen({ navigation }) {
  const { login, loading } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password) {
      Toast.show({ type: 'error', text1: 'Completa todos los campos' });
      return;
    }
    try {
      await login({ email, password });
      navigation.replace('Home');
    } catch (err) {
      const msg = err.message.includes('Servidor no disponible')
        ? 'No se pudo conectar con el servidor. Inténtalo más tarde.'
        : err.message;
      Toast.show({ type: 'error', text1: msg });
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.wrapper}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <Icon name="truck-fast" size={40} color={colors.primary} />
          <CustomText style={styles.headerText}>DeRemate.com</CustomText>
        </View>

        {/* CARD */}
        <View style={styles.card}>
          <CustomText style={styles.title}>Iniciar sesión</CustomText>

          <CustomTextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            editable={!loading}
          />

          <CustomTextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            iconRight={showPassword ? 'eye-off' : 'eye'}
            onPressIconRight={() => setShowPassword(v => !v)}
            editable={!loading}
          />

          <CustomButton
            title={loading ? 'Ingresando...' : 'Ingresar'}
            onPress={handleLogin}
            loading={loading}
            disabled={loading}
          />

          {loading && (
            <ActivityIndicator
              style={{ marginTop: 16 }}
              size="small"
              color={colors.primary}
            />
          )}

          <View style={styles.links}>
            <Pressable
              onPress={() => navigation.navigate('RecoverPassword')}
              disabled={loading}
            >
              <CustomText style={styles.linkText}>
                ¿Olvidaste tu contraseña?
              </CustomText>
            </Pressable>
            <Pressable
              onPress={() => navigation.navigate('Register')}
              style={{ marginTop: 8 }}
              disabled={loading}
            >
              <CustomText style={styles.linkText}>
                ¿No tenés cuenta? Registrate ahora
              </CustomText>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
      <Toast />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.backgroundBeige,
  },
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 24,
    gap: 8,
  },
  headerText: {
    ...typography.h2,             // Montserrat-Bold tamaño 20
    color: colors.textPrimary,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  title: {
    ...typography.h1,             // Montserrat-Bold tamaño 28
    textAlign: 'center',
    marginBottom: 24,
    color: colors.textPrimary,
  },
  links: {
    marginTop: 24,
    alignItems: 'center',
  },
  linkText: {
    ...typography.link,           // Montserrat-Regular tamaño 16
    color: colors.primary,
  },
});
