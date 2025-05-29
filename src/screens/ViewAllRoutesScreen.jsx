import { useContext, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  ToastAndroid,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { AuthContext } from '../context/authContext';
import { getAllRoutes } from '../services/routeService';
import { baseStyles, colors, typography } from '../styles/globalStyles';

export default function ViewAllRoutesScreen({ navigation }) {
  const { token } = useContext(AuthContext);
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) fetchRoutes();
  }, [token]);

  const fetchRoutes = async () => {
    setLoading(true);
    try {
      const { success, data, error } = await getAllRoutes();
      if (!success) {
        // Mensaje amigable según el tipo de error
        const msg = error.includes('No static resource')
          ? 'No hay rutas disponibles.'
          : 'No se pudieron cargar las rutas. Inténtalo más tarde.';
        ToastAndroid.show(msg, ToastAndroid.SHORT);
        setRoutes([]);
      } else {
        setRoutes(Array.isArray(data) ? data : []);
      }
    } catch (err) {
      console.error('❌ Error inesperado en fetchRoutes:', err);
      ToastAndroid.show('Error de conexión', ToastAndroid.SHORT);
      setRoutes([]);
    } finally {
      setLoading(false);
    }
  };

  const handleGoBack = () => {
    navigation.canGoBack() ? navigation.goBack() : navigation.navigate('Home');
  };

  const renderSeparator = () => <View style={styles.separator} />;

  const getStatusStyle = status => {
    switch (status?.toLowerCase()) {
      case 'pendiente':
        return { backgroundColor: '#FFC107', color: 'black' };
      case 'completado':
        return { backgroundColor: '#28A745', color: 'white' };
      case 'cancelado':
        return { backgroundColor: '#DC3545', color: 'white' };
      default:
        return { backgroundColor: colors.gray300, color: 'black' };
    }
  };

  const renderItem = ({ item }) => (
    <Pressable
      onPress={() => navigation.navigate('RouteDetail', { routeId: item.id })}
      style={({ pressed }) => [styles.item, pressed && styles.itemPressed]}
    >
      <View style={styles.itemHeader}>
        <Icon name="map-marker" size={20} color={colors.primary} style={styles.icon} />
        <Text style={styles.address}>{item.address}</Text>
      </View>

      <Text style={styles.infoText}>
        <Text style={styles.bold}>Zona: </Text>
        <Text style={[styles.bold, { color: 'black' }]}>{item.zone}</Text>
      </Text>

      <Text style={styles.infoText}>
        Estado:{' '}
        <Text style={[styles.badge, getStatusStyle(item.status)]}>
          {item.status}
        </Text>
      </Text>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Pressable
        style={({ pressed }) => [baseStyles.backButton, pressed && baseStyles.backButtonPressed]}
        onPress={handleGoBack}
      >
        <Icon name="arrow-left" size={24} color={colors.textPrimary} />
      </Pressable>

      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Rutas Disponibles</Text>
        <View style={styles.headerUnderline} />
      </View>

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : routes.length === 0 ? (
        <Text style={styles.empty}>No hay rutas para mostrar.</Text>
      ) : (
        <FlatList
          data={routes}
          keyExtractor={r => String(r.id)}
          renderItem={renderItem}
          ItemSeparatorComponent={renderSeparator}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundBeige,
    padding: 16,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 12,
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
  list: {
    paddingVertical: 20,
  },
  separator: {
    height: 1,
    backgroundColor: colors.gray300,
    marginVertical: 8,
  },
  item: {
    padding: 16,
    backgroundColor: colors.white,
    borderRadius: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
  },
  itemPressed: {
    transform: [{ scale: 0.98 }],
    backgroundColor: colors.gray100,
  },
  itemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  icon: { marginRight: 8 },
  address: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary,
  },
  infoText: {
    ...typography.body,
    marginTop: 2,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    overflow: 'hidden',
    fontSize: 14,
    fontWeight: 'bold',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  empty: {
    ...typography.body,
    marginTop: 24,
    textAlign: 'center',
    color: colors.textSecondary,
  },
});