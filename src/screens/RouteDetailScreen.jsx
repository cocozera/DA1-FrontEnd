// src/screens/RouteDetailScreen.js
import { useNavigation, useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { getRouteDetails } from '../services/routeService';
import { baseStyles, colors, typography } from '../styles/globalStyles';

export default function RouteDetailScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { routeId } = route.params;

  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDetail = async () => {
      setLoading(true);
      try {
        const { success, data, error } = await getRouteDetails(routeId);
        if (!success) {
          Toast.show({ type: 'error', text1: error });
          navigation.goBack();
          return;
        }
        setDetail(data);
      } catch (e) {
        Toast.show({ type: 'error', text1: 'Error de conexión' });
        navigation.goBack();
      } finally {
        setLoading(false);
      }
    };
    loadDetail();
  }, [routeId]);

  const handleGoBack = () => {
    if (navigation.canGoBack()) navigation.goBack();
    else navigation.navigate('Home');
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color={colors.primary} style={styles.loader} />
      </SafeAreaView>
    );
  }

  if (!detail) return null;

  return (
    <SafeAreaView style={styles.container}>
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

      <View style={styles.detailContainer}>
        <Text style={styles.label}>ID de Ruta:</Text>
        <Text style={styles.value}>{detail.id}</Text>

        <Text style={styles.label}>Zona:</Text>
        <Text style={styles.value}>{detail.zone}</Text>

        <Text style={styles.label}>Estado:</Text>
        <Text style={[styles.value, { color: getStatusColor(detail.status) }]}>
          {detail.status}
        </Text>

        {detail.packageDTO && (
          <>
            <Text style={styles.label}>Sector en Depósito:</Text>
            <Text style={styles.value}>{detail.packageDTO.depositSector}</Text>
          </>
        )}
      </View>

      <Pressable
        onPress={() => console.log('Botón QR presionado')}
        style={({ pressed }) => [
          styles.floatingButton,
          pressed && styles.floatingButtonPressed,
        ]}
      >
        <Icon name="qrcode-scan" size={28} color="#fff" />
      </Pressable>

      <Toast />
    </SafeAreaView>
  );
}

const getStatusColor = status => {
  switch ((status || '').toLowerCase()) {
    case 'pendiente': return '#FFC107';
    case 'completado': return '#28A745';
    case 'cancelado': return '#DC3545';
    default: return colors.textPrimary;
  }
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.backgroundBeige, padding: 16 },
  loader: { flex: 1, justifyContent: 'center' },
  headerContainer: { alignItems: 'center', marginBottom: 20 },
  headerText: { ...typography.h1, color: colors.textPrimary, fontWeight: '700' },
  headerUnderline: { marginTop: 6, width: 100, height: 3, backgroundColor: colors.primary, borderRadius: 2 },
  detailContainer: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  label: { color: colors.primary, fontWeight: '700', fontSize: 16, marginTop: 10 },
  value: { fontSize: 16, color: 'black', marginBottom: 8 },
  floatingButton: {
    position: 'absolute', bottom: 30, right: 30,
    backgroundColor: colors.primary, width: 60, height: 60,
    borderRadius: 30, alignItems: 'center', justifyContent: 'center', elevation: 10, zIndex: 10,
  },
  floatingButtonPressed: { opacity: 0.7 },
});