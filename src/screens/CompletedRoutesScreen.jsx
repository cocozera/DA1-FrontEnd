// src/screens/CompletedRoutesScreen.js
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  ToastAndroid,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import CustomText from '../components/CustomText'; // ← importamos CustomText
import { getRouteHistory } from '../services/routeService';
import { baseStyles, colors, typography } from '../styles/globalStyles';

export default function CompletedRoutesScreen() {
  const navigation = useNavigation();
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRoutes();
  }, []);

  const fetchRoutes = async () => {
    setLoading(true);
    try {
      const { success, data, error } = await getRouteHistory();
      if (!success) {
        ToastAndroid.show(error, ToastAndroid.SHORT);
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
    if (navigation.canGoBack()) navigation.goBack();
    else navigation.navigate('Home');
  };

  const getStatusColor = status => {
    switch ((status || '').toUpperCase()) {
      case 'COMPLETED': return '#2ECC71';
      case 'PENDING':   return '#E67E22';
      default:          return colors.textPrimary;
    }
  };

  const renderRoute = ({ item }) => (
    <View style={styles.card}>
      <CustomText style={styles.address}>{item.address}</CustomText>
      <CustomText style={styles.detail}>Inicio: {item.startedAt}</CustomText>
      <CustomText style={styles.detail}>Fin: {item.finishedAt}</CustomText>
      <CustomText style={styles.detail}>Zona: {item.zone}</CustomText>
      <CustomText style={styles.detail}>
        Cliente: {item.packageDTO?.receptor ?? 'No disponible'}
      </CustomText>
      <View style={styles.divider} />
      <CustomText style={[styles.status, { color: getStatusColor(item.status) }]}>
        Estado: {item.status}
      </CustomText>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Flecha de regreso */}
      <Pressable
        onPress={handleGoBack}
        style={({ pressed }) => [
          baseStyles.backButton,
          pressed && baseStyles.backButtonPressed,
        ]}
      >
        <Icon name="arrow-left" size={24} color={colors.textPrimary} />
      </Pressable>

      {/* Título centrado + línea de subrayado */}
      <View style={styles.headerContainer}>
        <CustomText style={styles.headerText}>
          Historial de Rutas{'\n'}Completadas
        </CustomText>
        <View style={styles.headerUnderline} />
      </View>

      {loading ? (
        <ActivityIndicator
          size="large"
          color={colors.primary}
          style={styles.loader}
        />
      ) : routes.length === 0 ? (
        <CustomText style={styles.empty}>
          No hay rutas completadas.
        </CustomText>
      ) : (
        <FlatList
          data={routes}
          keyExtractor={item => String(item.id)}
          renderItem={renderRoute}
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
    marginBottom: 20,
  },
  headerText: {
    ...typography.h1,        // Montserrat-Bold, tamaño 28
    textAlign: 'center',
  },
  headerUnderline: {
    marginTop: 6,
    width: 100,
    height: 3,
    backgroundColor: colors.primary,
    borderRadius: 2,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
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
    ...typography.h2,        // Montserrat-Bold, tamaño 20
    marginBottom: 6,
    color: colors.textPrimary,
  },
  detail: {
    ...typography.body,      // Montserrat-Regular, tamaño 16
    marginBottom: 2,
    color: colors.textPrimary,
  },
  divider: {
    height: 1,
    backgroundColor: colors.gray300,
    marginVertical: 8,
  },
  status: {
    ...typography.body,      // Montserrat-Regular
    fontWeight: '700',       // negrita
    marginTop: 8,
  },
  empty: {
    ...typography.body,      // Montserrat-Regular
    marginTop: 24,
    textAlign: 'center',
    color: colors.gray500,   // gris más suave
  },
});
