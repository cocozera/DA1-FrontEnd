import { useNavigation, useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { getRouteDetails } from '../services/routeService';
import { baseStyles, colors, typography } from '../styles/globalStyles';

const RouteDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { routeId } = route.params;

  const [routeDetail, setRouteDetail] = useState(null);

  useEffect(() => {
    const fetchRouteDetails = async () => {
      try {
        const data = await getRouteDetails(routeId);
        setRouteDetail(data);
        console.log('Detalle cargado:', data);
      } catch (error) {
        console.error('Error al cargar detalles:', error);
        Alert.alert('Error', 'No se pudo obtener el detalle de la ruta');
      }
    };

    fetchRouteDetails();
  }, [routeId]);

  const handleGoBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate('Home');
    }
  };

  return (
    <View style={styles.container}>
      <Pressable
        style={({ pressed }) => [
          baseStyles.backButton,
          pressed && baseStyles.backButtonPressed,
        ]}
        onPress={handleGoBack}
      >
        <Icon name="arrow-left" size={24} color={colors.textPrimary} />
      </Pressable>

      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Detalle de la Ruta</Text>
        <View style={styles.headerUnderline} />
      </View>

      {/* Tarjeta con detalles justo abajo del título */}
      {routeDetail ? (
        <View style={styles.detailContainer}>
          <Text style={styles.label}>ID de Ruta:</Text>
          <Text style={styles.value}>{routeDetail.id}</Text>

          <Text style={styles.label}>Zona:</Text>
          <Text style={styles.value}>{routeDetail.zone}</Text>

          <Text style={styles.label}>Estado:</Text>
          <Text style={styles.value}>{routeDetail.status}</Text>

          {routeDetail.packageDTO && (
            <>
              <Text style={styles.label}>Ubicación del Paquete en el Depósito:</Text>
              <Text style={styles.value}>{routeDetail.packageDTO.depositSector}</Text>
            </>
          )}

        </View>
      ) : (
        <Text style={typography.body}>Cargando detalles...</Text>
      )}

      <Pressable
        onPress={() => {
          console.log('Botón QR presionado');
        }}
        style={({ pressed }) => [
          styles.floatingButton,
          pressed && styles.floatingButtonPressed,
        ]}
      >
        <Icon name="qrcode-scan" size={28} color="#fff" />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.backgroundBeige,
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
  detailContainer: {
    backgroundColor: colors.white,
    borderRadius: 12,
    paddingVertical: 20,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  label: {
    color: colors.primary,  // rojo igual que el ícono QR
    fontWeight: '700',
    fontSize: 16,
    marginTop: 10,
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    color: 'black',
    marginBottom: 8,
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
  floatingButtonPressed: {
    opacity: 0.7,
  },
});

export default RouteDetailScreen;
