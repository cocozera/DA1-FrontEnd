import { useNavigation, useRoute } from '@react-navigation/native';
import { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import CustomButton from '../components/CustomButton';
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
      const response = await verifyToken({ email: email.trim(), token: code.trim() });
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
          <Text style={styles.title}>Verificar Cuenta</Text>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Correo electrónico"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Código de verificación"
              value={code}
              onChangeText={setCode}
              keyboardType="number-pad"
            />
          </View>

          <CustomButton title="Verificar" onPress={handleVerify} />

          <Text style={styles.infoText}>
            Nota: Se te envió un código a tu correo. Revisá tu bandeja de entrada o spam.
          </Text>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.linkText}>¿Ya tienes cuenta? Inicia sesión</Text>
        </TouchableOpacity>
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
    ...typography.h1,
    textAlign: 'center',
    marginBottom: 24,
  },
  inputContainer: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: Platform.OS === 'ios' ? 14 : 10,
    marginBottom: 16,
  },
  input: {
    fontSize: 16,
    color: '#333',
  },
  infoText: {
    ...typography.body,
    color: '#4E342E',
    textAlign: 'center',
    marginTop: 16,
  },
  linkText: {
    ...typography.link,
    textAlign: 'center',
    marginTop: 24,
  },
});
