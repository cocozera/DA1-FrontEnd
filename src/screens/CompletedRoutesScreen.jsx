import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { getRouteHistory } from '../services/routeService';
import {
    baseStyles,
    colors,
    typography,
} from '../styles/globalStyles';

export default function CompletedRoutesScreen() {
  const navigation = useNavigation();
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRoutes();
  }, []);

  const fetchRoutes = async () => {
    try {
      const data = await getRouteHistory();
      setRoutes(data || []);
    } catch (err) {
      console.warn('Error fetching route history:', err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch ((status || '').toUpperCase()) {
      case 'COMPLETED':
        return '#2ECC71';
      case 'PENDING':
        return '#E67E22';
      default:
        return colors.textPrimary;
    }
  };

  const renderRoute = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.address}>{item.address}</Text>
      <Text style={styles.detail}>Inicio: {item.startedAt}</Text>
      <Text style={styles.detail}>Fin: {item.finishedAt}</Text>
      <Text style={styles.detail}>Zona: {item.zone}</Text>
      <Text style={styles.detail}>
        Cliente: {item.packageDTO?.receptor ?? 'No disponible'}
      </Text>
      <View style={styles.divider} />
      <Text style={[styles.status, { color: getStatusColor(item.status) }]}>
        Estado: {item.status}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={[baseStyles.backButton, styles.backButtonContainer]}
        onPress={() => navigation.goBack()}
      >
        <Icon name="arrow-left" size={24} color={colors.textPrimary} />
      </TouchableOpacity>

      <View style={styles.header}>
        <Icon name="map-marker" size={24} color={colors.primary} />
        <Text style={styles.headerTitle}>Historial de Rutas Completadas</Text>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color={colors.primary} />
      ) : routes.length === 0 ? (
        <Text style={styles.empty}>No hay rutas completadas.</Text>
      ) : (
        <FlatList
          data={routes}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderRoute}
          contentContainerStyle={styles.list}
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
  backButtonContainer: {
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerTitle: {
    ...typography.h1,
    fontSize: 20,
    marginLeft: 8,
  },
  list: {
    paddingBottom: 16,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 4,
  },
  address: {
    ...typography.body,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  detail: {
    ...typography.body,
    marginBottom: 2,
  },
  status: {
    ...typography.body,
    marginTop: 8,
    fontWeight: 'bold',
  },
  divider: {
    height: 1,
    backgroundColor: colors.gray300,
    marginTop: 8,
  },
  empty: {
    ...typography.body,
    marginTop: 24,
    textAlign: 'center',
  },
});
