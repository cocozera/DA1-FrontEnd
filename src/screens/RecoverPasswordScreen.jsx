// src/screens/RecoverPasswordScreen.js
import { useNavigation } from '@react-navigation/native';
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
import Toast from 'react-native-toast-message';

import CustomButton from '../components/CustomButton';
import CustomText from '../components/CustomText';
import CustomTextInput from '../components/CustomTextInput';
import { recoverPassword } from '../services/authService';
import { colors, typography } from '../styles/globalStyles';

export default function RecoverPasswordScreen() {
  const [email, setEmail] = useState('');
  const navigation = useNavigation();

  const handleSendCode = async () => {
    const trimmedEmail = email.trim();

    // 1. Validar campo vacío
    if (trimmedEmail.length === 0) {
      Alert.alert('Error', 'Por favor ingresa tu correo electrónico');
      return;
    }

    // 2. Validar formato de correo
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      Alert.alert('Error', 'Por favor ingresa un correo electrónico válido');
      return;
    }

    // 3. Si pasa validaciones, llamo al servicio
    try {
      const response = await recoverPassword({ email: trimmedEmail });
      if (response.success) {
        Toast.show({
          type: 'success',
          text1: '✅ Código enviado',
          text2: 'Revisá tu correo electrónico',
          position: 'top',
        });
        navigation.navigate('ChangePassword', { email: trimmedEmail });
      } else {
        Alert.alert('Error', 'Correo no registrado');
      }
    } catch (error) {
      Alert.alert('Error de red', error.message);
    }
  };

  const goToLogin = () => {
    navigation.navigate('Login');
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
            Recuperar Contraseña
          </CustomText>

          <CustomTextInput
            placeholder="Correo electrónico"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />

          <CustomButton title="Enviar código" onPress={handleSendCode} />

          <CustomText style={styles.infoText}>
            Nota: se le enviará un código a su casilla de mail
          </CustomText>
        </View>

        <Pressable onPress={goToLogin}>
          {({ pressed }) => (
            <CustomText
              style={[styles.linkText, pressed && styles.pressedText]}
            >
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
  },
  pressedText: {
    opacity: 0.7,
    transform: [{ scale: 0.97 }],
  },
});
