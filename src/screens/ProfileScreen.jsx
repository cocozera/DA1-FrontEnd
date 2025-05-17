import { useContext } from 'react';
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { AuthContext } from '../context/authContext';
import { baseStyles, colors, typography } from '../styles/globalStyles';

export default function ProfileScreen({ navigation }) {
  const { user, logout } = useContext(AuthContext);

  const handleBack = () => navigation.goBack();
  const handleLogout = () => logout();

  return (
    <SafeAreaView style={styles.container}>
      {/* Botón Back con estilo global */}
        <Pressable
          style={({ pressed }) => [
            baseStyles.backButton,
            pressed && baseStyles.backButtonPressed, // Estilo de interacción al presionar
          ]}
          onPress={handleBack}
        >
          <Icon name="arrow-left" size={24} color={colors.textPrimary} />
        </Pressable>

      {/* Header */}
      <View style={styles.headerContainer}>
        <Icon name="account-circle-outline" size={40} color={colors.primary} />
        <Text style={styles.headerText}>Perfil de Usuario</Text>
      </View>

      {/* Card de perfil */}
      <View style={styles.card}>
        <Text style={styles.attributeText}>Nombre:</Text>
        <Text style={styles.valueText}>{user?.name || 'Sin nombre'}</Text>

        <Text style={styles.attributeText}>Email:</Text>
        <Text style={styles.valueText}>{user?.email || 'Sin email'}</Text>

        <Text style={styles.attributeText}>Teléfono:</Text>
        <Text style={styles.valueText}>{user?.phoneNumber || 'Sin teléfono'}</Text>

        <TouchableOpacity style={baseStyles.button} onPress={handleLogout}>
          <Text style={baseStyles.buttonText}>Cerrar sesión</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundBeige,
    padding: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  headerText: {
    ...typography.h1,
    marginLeft: 15,
    color: colors.textPrimary,
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
    color: colors.primary, // Rojo para el nombre del atributo
    fontWeight: 'bold',   
    marginBottom: 5,
  },
  valueText: {
    ...typography.body,
    color: colors.black, // Negro para los valores de los atributos
    marginBottom: 15,
  },
});
