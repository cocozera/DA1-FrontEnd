import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
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
import Toast from 'react-native-toast-message';
import CustomButton from '../components/CustomButton';
import CustomTextInput from '../components/CustomTextInput';
import { recoverPassword } from '../services/authService';
import { colors, typography } from '../styles/globalStyles';

export default function RecoverPasswordScreen() {
  const [email, setEmail] = useState('');
  const navigation = useNavigation();

  const handleSendCode = async () => {
    try {
      const response = await recoverPassword({ email });
      if (response.success) {
        Toast.show({
        type: 'success',
        text1: '✅ Código enviado',
        text2: 'Revisá tu correo electrónico',
        position: 'top',
      });
      navigation.navigate('ChangePassword', { email });
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
          <Text style={styles.title}>Recuperar Contraseña</Text>

          <CustomTextInput
            placeholder="Correo electrónico"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            icon="mail"
          />

          <CustomButton title="Enviar código" onPress={handleSendCode} />


          <Text style={styles.infoText}>
            Nota: se le enviará un código a su casilla de mail
          </Text>
        </View>

        <TouchableOpacity onPress={goToLogin}>
          <Text style={styles.linkText}>
            ¿Ya tienes cuenta? Inicia sesión
          </Text>
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
