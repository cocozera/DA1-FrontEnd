import { useNavigation, useRoute } from '@react-navigation/native';
import { useState } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    StatusBar,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import CustomButton from '../components/CustomButton';
import { verifyToken } from '../services/authService';
import { baseStyles, colors } from '../styles/globalStyles';

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
        Alert.alert('Cuenta verificada correctamente ✅');
        navigation.navigate('Login');
      } else {
        Alert.alert('Código inválido ❌');
      }
    } catch (err) {
      Alert.alert('Error de red', err.message);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor={colors.backgroundBeige} barStyle="dark-content" />
      <KeyboardAvoidingView
        style={styles.wrapper}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <Text style={styles.title}>Verificar Cuenta</Text>

        <View style={styles.card}>
          <View style={baseStyles.inputContainer}>
            <TextInput
              style={baseStyles.input}
              placeholder="Correo electrónico"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={baseStyles.inputContainer}>
            <TextInput
              style={baseStyles.input}
              placeholder="Código de verificación"
              value={code}
              onChangeText={setCode}
              keyboardType="number-pad"
            />
          </View>

          <CustomButton text="Verificar" onPress={handleVerify} />
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.linkText}>¿Ya tienes cuenta? Inicia sesión</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
