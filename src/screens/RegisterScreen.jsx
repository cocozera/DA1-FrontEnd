import { useContext, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View
} from 'react-native';
import CustomButton from '../components/CustomButton';
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
    // 1) Validación de campos
    if (!name.trim()) {
      return Alert.alert('Error', 'Por favor ingresa tu nombre');
    }
    if (!email.trim()) {
      return Alert.alert('Error', 'Por favor ingresa tu email');
    }
    if (!password) {
      return Alert.alert('Error', 'Por favor ingresa tu contraseña');
    }
    if (!phone.trim()) {
      return Alert.alert('Error', 'Por favor ingresa tu teléfono');
    }

    try {
      await register({ name, email, password, phoneNumber: phone });
      // Si sale bien, vamos a verificación de token
      navigation.navigate('TokenVerification', { email });
    } catch (err) {
      // 2) Manejo de todo tipo de errores
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
          <Text style={styles.title}>Registro</Text>

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
            title={loading ? 'Registrando...' : 'REGISTRARSE'}
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
                <Text
                  style={[
                    styles.linkText,
                    pressed && styles.pressedText
                  ]}
                >
                  ¿Ya tenés cuenta? Inicia sesión
                </Text>
              )}
            </Pressable>
          </View>
        </View>
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
  bottomLink: {
    marginTop: 24,
    alignItems: 'center',
  },
  pressedText: {
    opacity: 0.7,
    transform: [{ scale: 0.97 }],
  },
  linkText: {
    ...typography.link,
    color: colors.primary,
  },
});
