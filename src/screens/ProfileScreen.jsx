// src/screens/ProfileScreen.js
import { useContext, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { AuthContext } from '../context/authContext';
import { getProfile } from '../services/userService';
import { baseStyles, colors, typography } from '../styles/globalStyles';

export default function ProfileScreen({ navigation }) {
  const { logout } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      const { success, data, error } = await getProfile();
      if (!success) {
        Toast.show({ type: 'error', text1: error });
        navigation.goBack();
      } else {
        setProfile(data);
      }
      setLoading(false);
    };
    fetchProfile();
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
      <Pressable
        style={({ pressed }) => [
          baseStyles.backButton,
          pressed && baseStyles.backButtonPressed,
        ]}
        onPress={handleBack}
      >
        <Icon name="arrow-left" size={24} color={colors.textPrimary} />
      </Pressable>

      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Perfil de Usuario</Text>
        <View style={styles.headerUnderline} />
      </View>

      <View style={styles.card}>
        <Text style={styles.attributeText}>Nombre:</Text>
        <Text style={styles.valueText}>{profile.name || 'Sin nombre'}</Text>

        <Text style={styles.attributeText}>Email:</Text>
        <Text style={styles.valueText}>{profile.email || 'Sin email'}</Text>

        <Text style={styles.attributeText}>Teléfono:</Text>
        <Text style={styles.valueText}>{profile.phoneNumber || 'Sin teléfono'}</Text>

        <TouchableOpacity
          style={baseStyles.button}
          onPress={handleLogout}
        >
          <Text style={baseStyles.buttonText}>Cerrar sesión</Text>
        </TouchableOpacity>
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
    ...typography.h1,
    color: colors.textPrimary,
    fontWeight: '700',
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
    ...typography.body,
    color: colors.primary,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  valueText: {
    ...typography.body,
    color: colors.black,
    marginBottom: 15,
  },
});

