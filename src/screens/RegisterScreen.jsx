// src/screens/RegisterScreen.js
import { useContext, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import Toast from 'react-native-toast-message';

import CustomButton from '../components/CustomButton';
import CustomText from '../components/CustomText'; // ← import CustomText
import CustomTextInput from '../components/CustomTextInput';
import { AuthContext } from '../context/authContext';
import { colors, typography } from '../styles/globalStyles';

export default function RegisterScreen({ navigation }) {
  const { register, loading } = useContext(AuthContext);
  const [name, setName]         = useState('');
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone]       = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => setShowPassword(prev => !prev);

  const handleRegister = async () => {
    if (!name.trim()) {
      return Alert.alert('Error', 'Por favor ingresa tu nombre');
    }
    if (!email.trim()) {
      return Alert.alert('Error', 'Por favor ingresa tu email');
    }
    // Validar formato de correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return Alert.alert('Error', 'Por favor ingresa un email válido');
    }
    if (!password) {
      return Alert.alert('Error', 'Por favor ingresa tu contraseña');
    }
    if (!phone.trim()) {
      return Alert.alert('Error', 'Por favor ingresa tu teléfono');
    }

    try {
      await register({ name, email, password, phoneNumber: phone });
      navigation.navigate('TokenVerification', { email });
    } catch (err) {
      let msg = err.message || 'Fallo de registro';
      if (msg.toLowerCase().includes('servidor no disponible')) {
        msg = 'No se pudo conectar con el servidor. Inténtalo más tarde.';
      }
      Alert.alert('Error', msg);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={colors.backgroundBeige}
      />
      <KeyboardAvoidingView
        style={styles.wrapper}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.card}>
          {/* Título */}
          <CustomText style={styles.title}>Registro</CustomText>

          <CustomTextInput
            placeholder="Nombre"
            value={name}
            onChangeText={setName}
            editable={!loading}
          />

          <CustomTextInput
            placeholder="Email"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            editable={!loading}
          />

          <CustomTextInput
            placeholder="Contraseña"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
            iconRight={showPassword ? 'eye-off' : 'eye'}
            onPressIconRight={toggleShowPassword}
            editable={!loading}
          />

          <CustomTextInput
            placeholder="Teléfono"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
            editable={!loading}
          />

          <CustomButton
            title={loading ? 'Registrando...' : 'Registrarse'}
            onPress={handleRegister}
            disabled={loading}
            loading={loading}
          />

          <View style={styles.bottomLink}>
            <Pressable
              onPress={() => navigation.navigate('Login')}
              disabled={loading}
            >
              {({ pressed }) => (
                <CustomText
                  style={[styles.linkText, pressed && styles.pressedText]}
                >
                  ¿Ya tenés cuenta? Inicia sesión
                </CustomText>
              )}
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
    ...typography.h1,   // Montserrat-Bold, size 28
    textAlign: 'center',
    marginBottom: 24,
    color: colors.textPrimary,
  },
  bottomLink: {
    marginTop: 24,
    alignItems: 'center',
  },
  linkText: {
    ...typography.link, // Montserrat-Regular, size 16
    color: colors.primary,
  },
  pressedText: {
    opacity: 0.7,
    transform: [{ scale: 0.97 }],
  },
});
