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

export default function LoginScreen({ navigation }) {
  const { login, loading } = useContext(AuthContext);
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
    try {
      await login({ email, password });
      // al resolverse, el Navigator re-­renderizará y mostrará la pantalla auth-protegida
    } catch (err) {
      console.error(err);
      Alert.alert('Error', err.message || 'Fallo de login');
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
          <Text style={styles.title}>Inicio de Sesión</Text>

          <CustomTextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />

          <CustomTextInput
            placeholder="Contraseña"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <CustomButton
            title="INGRESAR"
            onPress={handleSubmit}
            loading={loading}
          />

          <View style={styles.links}>
            <TouchableOpacity onPress={() => navigation.navigate('RecoverPassword')}>
              <Text style={styles.linkText}>
                ¿Olvidaste tu contraseña?
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('Register')}
              style={{ marginTop: 8 }}
            >
              <Text style={styles.linkText}>
                ¿No tenés cuenta? Registrate ahora
              </Text>
            </TouchableOpacity>
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
  links: {
    marginTop: 24,
    alignItems: 'center',
  },
  linkText: {
    ...typography.link,
  },
});
