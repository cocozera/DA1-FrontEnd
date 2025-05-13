import { useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { colors, typography } from '../styles/globalStyles';
import CustomButton from './CustomButton';
import CustomTextInput from './CustomTextInput';

const LoginForm = ({ onSubmit, onForgotPassword, onRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await onSubmit({ email, password});
    } finally {
      setLoading(false);
    }
  };

  return (
    <View>
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
        <TouchableOpacity onPress={onForgotPassword}>
          <Text style={styles.linkText}>¿Olvidaste tu contraseña?</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onRegister} style={{ marginTop: 8 }}>
          <Text style={styles.linkText}>¿No tenés cuenta? Registrate ahora</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginForm;

const styles = StyleSheet.create({
  rememberMe: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 20,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 4,
    marginRight: 10,
  },
  checkboxChecked: {
    backgroundColor: colors.primary,
  },
  rememberText: {
    ...typography.body,
  },
  links: {
    alignItems: 'center',
    marginTop: 24,
  },
  linkText: {
    ...typography.link,
  },
});
