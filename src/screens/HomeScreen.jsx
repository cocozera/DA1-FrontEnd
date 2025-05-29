// src/screens/HomeScreen.js

import { useNavigation } from '@react-navigation/native';
import { useContext, useEffect, useState } from 'react';
import {
  Dimensions,
  Pressable,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { AuthContext } from '../context/authContext';
import { getInProgressRoutes } from '../services/routeService';
import { getProfile } from '../services/userService';
import { colors, typography } from '../styles/globalStyles';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const navigation = useNavigation();
  const { token } = useContext(AuthContext);
  
  const [userName, setUserName] = useState('');
  const [inProgressRoute, setInProgressRoute] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (!token) {
      navigation.replace('Login');
      return;
    }
    loadData();
  }, [token]);

  const loadData = () => {
    fetchUser();
    fetchInProgressRoute();
  };

  const fetchUser = async () => {
    try {
      const { success, data, error } = await getProfile();
      if (!success) {
        Toast.show({ type: 'error', text1: error });
        return;
      }
      // Si data.name viene vacío o null, mostramos un mensaje informativo
      if (!data.name?.trim()) {
        Toast.show({
          type: 'info',
          text1: 'Bienvenido!',
          text2: 'Tu perfil no tiene nombre configurado.',
        });
      }
      setUserName(data.name || '');
    } catch (err) {
      Toast.show({
        type: 'error',
        text1: 'Error inesperado',
        text2: 'No se pudo cargar los datos del usuario.',
      });
    }
  };

  const fetchInProgressRoute = async () => {
    try {
      const { success, data: routes, error } = await getInProgressRoutes();
      if (!success) {
        Toast.show({ type: 'error', text1: error });
        return;
      }
      if (Array.isArray(routes) && routes.length > 0) {
        setInProgressRoute(routes[0]);
      } else {
        setInProgressRoute(null);
      }
    } catch (err) {
      Toast.show({
        type: 'error',
        text1: 'Error inesperado',
        text2: 'No se pudo cargar la ruta en progreso.',
      });
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await Promise.all([fetchUser(), fetchInProgressRoute()]);
    setRefreshing(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.topBar}>
          <View style={styles.logoContainer}>
            <Icon name="truck-fast" size={24} color={colors.textPrimary} />
            <Text style={styles.brand}>DeRemate.com</Text>
          </View>
          <Pressable onPress={() => navigation.navigate('Profile')}>
            <Icon name="account-circle" size={48} color={colors.textPrimary} />
          </Pressable>
        </View>

        <Text style={styles.title}>
          ¡Bienvenido{userName ? `, ${userName}` : ''}!
        </Text>

        <Pressable
          style={styles.card}
          onPress={() => navigation.navigate('ViewAllRoutes')}
        >
          <View style={styles.cardContent}>
            <Icon name="map-marker-path" size={40} color={colors.primary} />
            <Text style={styles.cardText}>Rutas Disponibles</Text>
          </View>
        </Pressable>

        <Pressable
          style={[styles.card, { marginTop: 24 }]}
          onPress={() => navigation.navigate('CompletedRoutes')}
        >
          <View style={styles.cardContent}>
            <Icon name="history" size={40} color={colors.primary} />
            <Text style={styles.cardText}>Historial de Rutas</Text>
          </View>
        </Pressable>
      </ScrollView>

      {inProgressRoute && (
        <Pressable
          style={styles.floatingButton}
          onPress={() =>
            navigation.navigate('InProgressRouteDetail', {
              routeData: inProgressRoute,
            })
          }
        >
          <Icon name="truck-check" size={30} color="#fff" />
        </Pressable>
      )}

      <Toast />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundBeige,
  },
  scroll: {
    padding: 16,
    alignItems: 'center',
    paddingBottom: 80,
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
  brand: {
    marginLeft: 6,
    fontSize: 16,
    fontFamily: 'Montserrat-Bold',
    color: colors.textPrimary,
  },
  title: {
    width: '100%',
    marginTop: 32,
    alignSelf: 'flex-start',
    ...typography.h1,
  },
  card: {
    width: width - 32,
    height: 120,
    borderRadius: 20,
    backgroundColor: colors.white,
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
    color: colors.textPrimary,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: colors.primary,
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
    zIndex: 10,
  },
});
