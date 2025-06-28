import { useNavigation, useRoute } from '@react-navigation/native';
import { useState } from 'react';
import {
  Alert,
  Linking,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import CompleteRouteModal from '../components/CompleteRouteModal';
import CustomButton from '../components/CustomButton';
import CustomText from '../components/CustomText';
import { completeRoute } from '../services/routeService';
import { baseStyles, colors, typography } from '../styles/globalStyles';

export default function InProgressRoute() {
  const navigation = useNavigation();
  const route = useRoute();
  const { routeData } = route.params || {};

  const [modalVisible, setModalVisible] = useState(false);
  const [code, setCode] = useState('');

  const handleGoBack = () => {
    if (navigation.canGoBack()) navigation.goBack();
    else navigation.navigate('Home');
  };

  const formatDate = isoString => {
    if (!isoString) return '-';
    const date = new Date(isoString);
    return date.toLocaleString();
  };

  const handleConfirmCompletion = async () => {
    if (!code.trim()) {
      Alert.alert('Código requerido', 'Por favor ingresá el código de finalización.');
      return;
    }

    const res = await completeRoute(routeData.id, code.trim());
    if (res.success) {
      Alert.alert('Ruta finalizada', '¡Buen trabajo!');
      setModalVisible(false);
      navigation.navigate('Home');
    } else {
      Alert.alert('Error', res.error);
    }
  };

  const openGoogleMaps = (address) => {
    const encodedAddress = encodeURIComponent(address);
    const url = Platform.select({
      ios: `maps:0,0?q=${encodedAddress}`,
      android: `geo:0,0?q=${encodedAddress}`
    });

    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          return Linking.openURL(url);
        } else {
          const browserUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
          return Linking.openURL(browserUrl);
        }
      })
      .catch((err) => console.error('Error al abrir Google Maps:', err));
  };

  if (!routeData) {
    return (
      <SafeAreaView style={styles.container}>
        <CustomText style={typography.body}>
          No hay datos de la ruta en progreso.
        </CustomText>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Pressable
        onPress={handleGoBack}
        style={({ pressed }) => [
          baseStyles.backButton,
          pressed && baseStyles.backButtonPressed,
        ]}
      >
        <Icon name="arrow-left" size={24} color={colors.textPrimary} />
      </Pressable>

      <View style={styles.headerContainer}>
        <CustomText style={styles.headerText}>Ruta en Progreso</CustomText>
        <View style={styles.headerUnderline} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Card icon="map-marker" label="Dirección" value={routeData.address} />
        <Card icon="map" label="Zona" value={routeData.zone} />
        <Card icon="account" label="Conductor asignado" value={routeData.assignedUser} />
        <Card icon="calendar-clock" label="Inicio" value={formatDate(routeData.startedAt)} />

        <View style={styles.buttonContainer}>
          <CustomButton 
            title="Ver en Google Maps" 
            icon="map-marker" 
            onPress={() => openGoogleMaps(routeData.address)}
            style={styles.mapsButton}
          />

          <CustomButton 
            title="Finalizar Ruta" 
            onPress={() => setModalVisible(true)}
            style={styles.finishButton}
          />
        </View>
      </ScrollView>

      <CompleteRouteModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onConfirm={handleConfirmCompletion}
        code={code}
        setCode={setCode}
      />
    </SafeAreaView>
  );
}

function Card({ icon, label, value }) {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Icon name={icon} size={20} color={colors.primary} style={styles.icon} />
        <CustomText style={styles.label}>{label}:</CustomText>
      </View>
      <CustomText style={styles.value}>{value || '-'}</CustomText>
    </View>
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
    ...typography.h1,
    textAlign: 'center',
  },
  headerUnderline: {
    marginTop: 6,
    width: 100,
    height: 3,
    backgroundColor: colors.primary,
    borderRadius: 2,
  },
  content: {
    paddingBottom: 30,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  icon: {
    marginRight: 8,
  },
  label: {
    ...typography.h2,
    color: colors.primary,
  },
  value: {
    ...typography.body,
    color: '#000000',
    marginLeft: 28,
    marginTop: 2,
  },
  buttonContainer: {
    marginTop: 20,
  },
  finishButton: {
    width: '100%',
  },
  mapsButton: {
    backgroundColor: '#4CAF50',
    marginBottom: 12,
  },
});
