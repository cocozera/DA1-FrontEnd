import { useContext, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
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

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleRegister = async () => {
    try {
      await register({
        name,
        email,
        password,
        phoneNumber: phone
      });

      // Tras registro exitoso, navegar a la pantalla de verificación
      navigation.navigate('TokenVerification', { email });
    } catch (err) {
      console.error(err);
      Alert.alert('Error', err.message || 'Fallo de registro');
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
          />

          <CustomTextInput
            placeholder="Email"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />

          <CustomTextInput
            placeholder="Contraseña"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
            iconRight={showPassword ? 'eye-off' : 'eye'}
            onPressIconRight={toggleShowPassword}
          />

          <CustomTextInput
            placeholder="Teléfono"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
          />

          <CustomButton
            title="REGISTRARSE"
            onPress={handleRegister}
            loading={loading}
          />

          <TouchableOpacity
            style={styles.bottomLink}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.bottomLinkText}>
              ¿Ya tenés cuenta? Inicia sesión
            </Text>
          </TouchableOpacity>
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
  bottomLinkText: {
    ...typography.link,
  },
});
