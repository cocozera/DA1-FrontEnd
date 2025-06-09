// src/screens/ProfileScreen.js
import { useContext, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  SafeAreaView,
  StyleSheet,
  View
} from 'react-native';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import CustomText from '../components/CustomText'; // ← importamos CustomText
import { AuthContext } from '../context/authContext';
import { getProfile } from '../services/userService';
import { baseStyles, colors, typography } from '../styles/globalStyles';

export default function ProfileScreen({ navigation }) {
  const { logout } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const { success, data, error } = await getProfile();
      if (!success) {
        Toast.show({ type: 'error', text1: error });
        navigation.goBack();
      } else {
        setProfile(data);
      }
      setLoading(false);
    })();
  }, []);

  const handleLogout = async () => {
    await logout();
    navigation.replace('Login');
  };

  const handleBack = () => navigation.goBack();

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator
          size="large"
          color={colors.primary}
          style={styles.loader}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Flecha de regreso */}
      <Pressable
        onPress={handleBack}
        style={({ pressed }) => [
          baseStyles.backButton,
          pressed && baseStyles.backButtonPressed,
        ]}
      >
        <Icon name="arrow-left" size={24} color={colors.textPrimary} />
      </Pressable>

      {/* Header */}
      <View style={styles.headerContainer}>
        <CustomText style={styles.headerText}>Perfil de Usuario</CustomText>
        <View style={styles.headerUnderline} />
      </View>

      {/* Card con datos */}
      <View style={styles.card}>
        <CustomText style={styles.attributeText}>Nombre:</CustomText>
        <CustomText style={styles.valueText}>
          {profile.name || 'Sin nombre'}
        </CustomText>

        <CustomText style={styles.attributeText}>Email:</CustomText>
        <CustomText style={styles.valueText}>
          {profile.email || 'Sin email'}
        </CustomText>

        <CustomText style={styles.attributeText}>Teléfono:</CustomText>
        <CustomText style={styles.valueText}>
          {profile.phoneNumber || 'Sin teléfono'}
        </CustomText>

        <Pressable style={baseStyles.button} onPress={handleLogout}>
          <CustomText style={baseStyles.buttonText}>Cerrar sesión</CustomText>
        </Pressable>
      </View>

      <Toast />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundBeige,
    padding: 16,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
  },
  headerContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  headerText: {
    ...typography.h1,           // Montserrat-Bold, tamaño 28
    textAlign: 'center',
    color: colors.textPrimary,
  },
  headerUnderline: {
    marginTop: 6,
    width: 100,
    height: 3,
    backgroundColor: colors.primary,
    borderRadius: 2,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
    marginBottom: 20,
  },
  attributeText: {
    ...typography.h2,           // Montserrat-Bold, tamaño 20
    color: colors.primary,
    marginBottom: 5,
  },
  valueText: {
    ...typography.body,         // Montserrat-Regular, tamaño 16
    color: '#000000',
    marginBottom: 15,
  },
});
