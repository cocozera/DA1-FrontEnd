import { useNavigation, useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Importa el ícono
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
  const boldText = (label, value) => (
    <Text style={styles.detailText}>
      <Text style={styles.bold}>{label}</Text>
      <Text style={styles.valueText}>{value}</Text>
    </Text>
  );

  return (
    <View style={styles.container}>
        <Pressable
          style={({ pressed }) => [
            baseStyles.backButton,
            pressed && baseStyles.backButtonPressed, // Estilo de interacción al presionar
          ]}
          onPress={handleGoBack}
        >
          <Icon name="arrow-left" size={24} color={colors.textPrimary} />
        </Pressable>

      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Detalle de la Ruta</Text>
      </View>

      <View style={styles.card}>
        {routeDetail ? (
          <>
            {boldText('ID de Ruta: ', routeDetail.id)}
            {boldText('Zona: ', routeDetail.zone)}
            {boldText('Estado: ', routeDetail.status)}
            {routeDetail.packageDTO &&
              boldText(
                'Ubicación del Paquete en el Depósito: ',
                routeDetail.packageDTO.depositSector
              )}
          </>
        ) : (
          <Text style={typography.body}>Cargando detalles...</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.backgroundBeige,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  detailText: {
    ...typography.body,
    marginBottom: 12,
  },
  bold: {
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  valueText: {
    color: 'black', // El valor estará en negro
  },
  headerContainer: {
    alignItems: 'center', // Alineamos el texto en el centro
    marginVertical: 16, // Margen superior e inferior
  },
  headerText: {
    ...typography.h1,
    color: colors.textPrimary, // Puedes ajustar el color si lo deseas
  },
});

export default RouteDetailScreen;
