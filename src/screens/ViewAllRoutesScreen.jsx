import { useContext, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { AuthContext } from '../context/authContext';
import { getAllRoutes } from '../services/routeService';
import { colors, typography } from '../styles/globalStyles';

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
      const data = await getAllRoutes();
      setRoutes(data);
    } catch (err) {
      console.error(err);
      ToastAndroid.show('Error al cargar rutas', ToastAndroid.SHORT);
    } finally {
      setLoading(false);
    }
  };

  // Maneja el retroceso: si puede, goBack(), si no, navega a Home
  const handleGoBack = () => {
    console.log('Back button pressed');
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate('Home');
    }
  };

  const renderSeparator = () => <View style={styles.separator} />;

const renderItem = ({ item }) => (
  <TouchableOpacity
    onPress={() => navigation.navigate('RouteDetail', { routeId: item.id })}
    style={styles.item}
    activeOpacity={0.7}
  >
    <Text style={styles.address}>{item.address}</Text>
    <Text>Zona: {item.zone}</Text>
    <Text>Estado: {item.status}</Text>
  </TouchableOpacity>
);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerWrapper}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={handleGoBack}
          activeOpacity={0.6}
        >
          <Icon name="arrow-left" size={24} color={colors.textPrimary} />
        </TouchableOpacity>

        <View style={styles.headerContainer}>
          <Icon name="map-marker-path" size={28} color={colors.primary} />
          <Text style={styles.headerText}>Rutas disponibles</Text>
        </View>
      </View>

      <View style={styles.card}>
        {loading ? (
          <View style={styles.center}>
            <ActivityIndicator size="large" color={colors.primary} />
          </View>
        ) : (
          <FlatList
            data={routes}
            keyExtractor={(r) => String(r.id)}
            renderItem={renderItem}
            ItemSeparatorComponent={renderSeparator}
            contentContainerStyle={styles.list}
            showsVerticalScrollIndicator
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundBeige,
  },
  headerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingTop: 12,
  },
  backButton: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 24,
    overflow: 'hidden',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginStart: 12,
  },
  headerText: {
    ...typography.h1,
    marginStart: 12,
  },
  card: {
    flex: 1,
    marginHorizontal: 16,
    marginVertical: 16,
    borderRadius: 24,
    backgroundColor: colors.white,
    elevation: 8,
    overflow: 'hidden',
  },
  list: {
    padding: 20,
  },
  separator: {
    height: 1,
    backgroundColor: colors.gray300,
  },
  item: {
    paddingVertical: 8,
  },
  address: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
