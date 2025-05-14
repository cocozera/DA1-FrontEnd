import { useNavigation } from '@react-navigation/native';
import { useContext, useEffect, useState } from 'react';
import {
    Dimensions,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    // RefreshControl,
    TouchableOpacity,
    View
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { AuthContext } from '../context/authContext';
// import routeService from '../services/routeService';
import userService from '../services/userService';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const navigation = useNavigation();
  const { token, userId } = useContext(AuthContext);
  // const [refreshing, setRefreshing] = useState(false);
  const [userName, setUserName] = useState('');
  // const [hasInProgress, setHasInProgress] = useState(false);

  useEffect(() => {
    if (!token) {
      navigation.replace('Login');
      return;
    }
    fetchUser();
    // checkInProgress();
  }, [token]);

  const fetchUser = async () => {
    try {
      const { data } = await userService.getMe(userId);
      setUserName(data.name || '');
    } catch (err) {
      console.warn('Error fetching user:', err);
    }
  };

  // const checkInProgress = async () => {
  //   try {
  //     const { data } = await routeService.getInProgressRoutes(userId);
  //     setHasInProgress(Array.isArray(data) && data.length > 0);
  //   } catch (err) {
  //     console.warn('Error checking in-progress routes:', err);
  //     setHasInProgress(false);
  //   }
  // };

  // const onRefresh = async () => {
  //   setRefreshing(true);
  //   await checkInProgress();
  //   setRefreshing(false);
  // };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        // refreshControl={
        //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        // }
      >
        <View style={styles.topBar}>
          <View style={styles.logoContainer}>
            {/*<Image source={require('../assets/ic_deremate.png')} style={styles.logo} />*/}
            <Text style={styles.brand}>DeRemate.com</Text>
          </View>

          {/* Placeholder Usuario (sin funcionalidad) */}
          <TouchableOpacity>
            <Icon name="account-circle" size={40} color={colors.darkRed} />
          </TouchableOpacity>
        </View>

        <Text style={styles.title}>
          ¡Bienvenido{userName ? `, ${userName}` : ''}!
        </Text>

        {/* UI de Rutas Disponibles */}
        <TouchableOpacity
          style={styles.card}
          /* onPress deshabilitado */
        >
          <View style={styles.cardContent}>
            <Icon name="map-marker-path" size={40} color={colors.engineeringOrange} />
            <Text style={styles.cardText}>Rutas Disponibles</Text>
          </View>
        </TouchableOpacity>

        {/* UI de Historial de Rutas */}
        <TouchableOpacity
          style={[styles.card, { marginTop: 24 }]}
          /* onPress deshabilitado */
        >
          <View style={styles.cardContent}>
            <Icon name="history" size={40} color={colors.engineeringOrange} />
            <Text style={styles.cardText}>Historial de Rutas</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>

      {/* FAB de rutas en progreso: temporalmente oculto
      {hasInProgress && (
        <TouchableOpacity style={styles.fab}>
          <Icon name="progress-clock" size={28} color="#fff" />
        </TouchableOpacity>
      )} */}
    </SafeAreaView>
  );
}

const colors = {
  champagnePink: '#F7E7CE',
  darkRed: '#8B0000',
  engineeringOrange: '#FB8C00',
  coffee: '#6F4E37',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.champagnePink,
  },
  scroll: {
    padding: 16,
    alignItems: 'center',
  },
  topBar: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 24,
    height: 24,
    tintColor: colors.darkRed,
  },
  brand: {
    marginLeft: 6,
    fontSize: 16,
    fontFamily: 'Montserrat-Bold',
    color: colors.darkRed,
  },
  title: {
    width: '100%',
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.darkRed,
    marginTop: 32,
    alignSelf: 'flex-start',
  },
  card: {
    width: width - 32,
    height: 120,
    borderRadius: 20,
    backgroundColor: '#fff',
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    marginTop: 40,
    overflow: 'hidden',
  },
  cardContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  cardText: {
    marginLeft: 16,
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.coffee,
  },
  fab: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.engineeringOrange,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
});
