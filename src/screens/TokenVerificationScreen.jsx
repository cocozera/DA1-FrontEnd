// src/screens/TokenVerificationScreen.js
import { useNavigation, useRoute } from '@react-navigation/native';
import { useState } from 'react';
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

import CustomButton from '../components/CustomButton';
import CustomText from '../components/CustomText'; // ← import CustomText
import CustomTextInput from '../components/CustomTextInput'; // ← import CustomTextInput
import { verifyToken } from '../services/authService';
import { colors, typography } from '../styles/globalStyles';

export default function TokenVerificationScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const initialEmail = route.params?.email || '';

  const [email, setEmail] = useState(initialEmail);
  const [code, setCode] = useState('');

  const handleVerify = async () => {
    try {
      const response = await verifyToken({
        email: email.trim(),
        token: code.trim(),
      });
      if (response.success) {
        Alert.alert('✅ Cuenta verificada', 'Ahora podés iniciar sesión');
        navigation.navigate('Login');
      } else {
        Alert.alert('❌ Código inválido');
      }
    } catch (err) {
      Alert.alert('Error de red', err.message);
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
          <CustomText style={styles.title}>
            Verificar Cuenta
          </CustomText>

          <CustomTextInput
            placeholder="Correo electrónico"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <CustomTextInput
            placeholder="Código de verificación"
            value={code}
            onChangeText={setCode}
            keyboardType="number-pad"
          />

          <CustomButton title="Verificar" onPress={handleVerify} />

          <CustomText style={styles.infoText}>
            Nota: Se te envió un código a tu correo. Revisá tu bandeja de entrada o spam.
          </CustomText>
        </View>

        <Pressable onPress={() => navigation.navigate('Login')}>
          {({ pressed }) => (
            <CustomText style={[styles.linkText, pressed && styles.pressedText]}>
              ¿Ya tienes cuenta? Inicia sesión
            </CustomText>
          )}
        </Pressable>
      </KeyboardAvoidingView>
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
    ...typography.h1,        // Montserrat-Bold, size 28
    textAlign: 'center',
    marginBottom: 24,
    color: colors.textPrimary,
  },
  infoText: {
    ...typography.body,      // Montserrat-Regular, size 16
    color: '#4E342E',
    textAlign: 'center',
    marginTop: 16,
  },
  linkText: {
    ...typography.link,      // Montserrat-Regular, size 16
    textAlign: 'center',
    marginTop: 24,
    color: colors.primary,
  },
  pressedText: {
    opacity: 0.7,
    transform: [{ scale: 0.97 }],
  },
});
