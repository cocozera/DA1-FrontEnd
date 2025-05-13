import { useNavigation, useRoute } from '@react-navigation/native';
import { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import CustomButton from '../components/CustomButton';
import CustomTextInput from '../components/CustomTextInput';
import { changePassword } from '../services/authService';
import { colors, typography } from '../styles/globalStyles';

const ChangePasswordScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();

  // El correo se recibe desde la pantalla anterior
  const { email } = route.params;

  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChangePassword = async () => {
    if (!code || !newPassword || !confirmPassword) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return;
    }

    setLoading(true);
    const res = await changePassword({ email, code, newPassword });
    setLoading(false);

    if (res.success) {
      Alert.alert('Éxito', 'Contraseña cambiada correctamente');
      navigation.navigate('Login', { email }); // Redirige al login con el email
    } else {
      Alert.alert('Error', res.error?.message || 'No se pudo cambiar la contraseña');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.form}>
        <Text style={typography.h1}>Cambiar Contraseña</Text>

        <CustomTextInput
          placeholder="Código de verificación"
          value={code}
          onChangeText={setCode}
        />

        <CustomTextInput
          placeholder="Nueva contraseña"
          secureTextEntry
          value={newPassword}
          onChangeText={setNewPassword}
        />

        <CustomTextInput
          placeholder="Confirmar nueva contraseña"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        <CustomButton
          title="Cambiar contraseña"
          onPress={handleChangePassword}
          loading={loading}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundBeige,
    padding: 20,
    justifyContent: 'center',
  },
  form: {
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
});

export default ChangePasswordScreen;
