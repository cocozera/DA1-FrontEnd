import { useContext } from 'react';
import {
    Pressable,
    SafeAreaView,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { AuthContext } from '../context/authContext';
import { baseStyles, colors, profileStyles } from '../styles/globalStyles';

export default function ProfileScreen({ navigation }) {
  const { user, logout } = useContext(AuthContext);

  const handleBack = () => navigation.goBack();
  const handleLogout = () => logout();

  return (
    <SafeAreaView style={profileStyles.container}>
      {/* Botón Back */}
      <Pressable onPress={handleBack} style={profileStyles.backButton}>
        <Icon name="arrow-left" size={28} color={colors.primary} />
      </Pressable>

      {/* Header */}
      <View style={profileStyles.headerContainer}>
        <Icon name="account-circle-outline" size={24} color={colors.primary} />
        <Text style={profileStyles.headerText}>Perfil de Usuario</Text>
      </View>

      {/* Card de perfil */}
      <View style={profileStyles.card}>
        <Text style={profileStyles.infoText}>Nombre: {user?.name || 'Sin nombre'}</Text>
        <Text style={profileStyles.infoText}>Email: {user?.email || 'Sin email'}</Text>
        <Text style={profileStyles.infoText}>Teléfono: {user?.phoneNumber || 'Sin teléfono'}</Text>

        <TouchableOpacity style={baseStyles.button} onPress={handleLogout}>
          <Text style={baseStyles.buttonText}>Cerrar sesión</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
