// src/screens/RouteDetailScreen.js
import { useNavigation, useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  SafeAreaView,
  View,
} from 'react-native';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import CustomText from '../components/CustomText';
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
      } catch {
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

  const handleOpenScanner = () => {
    navigation.navigate('QRScanner');
  };

  if (loading) {
    return (
      <SafeAreaView style={baseStyles.loaderCenter}>
        <ActivityIndicator size="large" color={colors.primary} />
      </SafeAreaView>
    );
  }

  if (!detail) return null;

  return (
    <SafeAreaView style={baseStyles.containerScreen}>
      <Pressable
        onPress={handleGoBack}
        style={({ pressed }) => [
          baseStyles.backButton,
          pressed && baseStyles.backButtonPressed,
        ]}
      >
        <Icon name="arrow-left" size={24} color={colors.textPrimary} />
      </Pressable>

      <View style={baseStyles.sectionHeader}>
        <CustomText style={[typography.h1, { textAlign: 'center' }]}>
          Detalle de la Ruta
        </CustomText>
        <View style={baseStyles.sectionUnderline} />
      </View>

      <View style={baseStyles.card}>
        <CustomText style={[typography.h2, { fontSize: 16, marginTop: 10 }]}>ID de Ruta:</CustomText>
        <CustomText style={[typography.body, { marginBottom: 8, color: '#000' }]}>{detail.id}</CustomText>

        <CustomText style={[typography.h2, { fontSize: 16, marginTop: 10 }]}>Zona:</CustomText>
        <CustomText style={[typography.body, { marginBottom: 8, color: '#000' }]}>{detail.zone}</CustomText>

        <CustomText style={[typography.h2, { fontSize: 16, marginTop: 10 }]}>Estado:</CustomText>
        <CustomText style={[typography.body, { marginBottom: 8, color: '#000', fontWeight: 'bold' }]}>
          {detail.status}
        </CustomText>

        {detail.packageDTO && (
          <>
            <CustomText style={[typography.h2, { fontSize: 16, marginTop: 10 }]}>Sector en Depósito:</CustomText>
            <CustomText style={[typography.body, { marginBottom: 8, color: '#000' }]}>
              {detail.packageDTO.depositSector}
            </CustomText>
          </>
        )}
      </View>

      <Pressable
        onPress={handleOpenScanner}
        style={({ pressed }) => [
          baseStyles.floatingButton,
          pressed && baseStyles.floatingButtonPressed,
        ]}
      >
        <Icon name="qrcode-scan" size={28} color="#fff" />
      </Pressable>

      <Toast />
    </SafeAreaView>
  );
}
