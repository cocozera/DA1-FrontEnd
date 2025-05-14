import { useNavigation, useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import {
    Alert,
    Animated,
    Easing,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Importa el ícono
import { getRouteDetails } from '../services/routeService';
import { colors, profileStyles, typography } from '../styles/globalStyles';

const RouteDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { routeId } = route.params;

  const [routeDetail, setRouteDetail] = useState(null);
  const [scale] = useState(new Animated.Value(1));

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

  const handleBackPress = () => {
    Animated.timing(scale, {
      toValue: 0.85,
      duration: 100,
      useNativeDriver: true,
      easing: Easing.out(Easing.quad),
    }).start(() => {
      scale.setValue(1);
      navigation.goBack();
    });
  };

  const boldText = (label, value) => (
    <Text style={styles.detailText}>
      <Text style={styles.bold}>{label}</Text>
      <Text style={styles.valueText}>{value}</Text>
    </Text>
  );

  return (
    <View style={profileStyles.container}>
      <Animated.View style={{ transform: [{ scale }] }}>
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          {/* Usamos el mismo ícono de MaterialCommunityIcons */}
          <Icon name="arrow-left" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
      </Animated.View>

      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Detalle de la Ruta</Text>
      </View>

      <View style={profileStyles.card}>
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
  backButton: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 24,
    overflow: 'hidden',
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
