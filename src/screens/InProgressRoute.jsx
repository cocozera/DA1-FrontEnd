// src/screens/InProgressRoute.js
import { useNavigation, useRoute } from '@react-navigation/native';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import CustomText from '../components/CustomText'; // ← import CustomText
import { baseStyles, colors, typography } from '../styles/globalStyles';

export default function InProgressRoute() {
  const navigation = useNavigation();
  const route = useRoute();
  const { routeData } = route.params || {};

  const handleGoBack = () => {
    if (navigation.canGoBack()) navigation.goBack();
    else navigation.navigate('Home');
  };

  const formatDate = isoString => {
    if (!isoString) return '-';
    const date = new Date(isoString);
    return date.toLocaleString();
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

      {/* Header */}
      <View style={styles.headerContainer}>
        <CustomText style={styles.headerText}>Ruta en Progreso</CustomText>
        <View style={styles.headerUnderline} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Card icon="map-marker" label="Dirección" value={routeData.address} />
        <Card icon="map" label="Zona" value={routeData.zone} />
        <Card icon="account" label="Conductor asignado" value={routeData.assignedUser} />
        <Card
          icon="calendar-clock"
          label="Inicio"
          value={formatDate(routeData.startedAt)}
        />
      </ScrollView>
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
    ...typography.h1,            // Montserrat-Bold, 28
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
    ...typography.h2,            // Montserrat-Bold, 20
    color: colors.primary,
  },
  value: {
    ...typography.body,           // Montserrat-Regular, 16
    color: '#000000',
    marginLeft: 28,
    marginTop: 2,
  },
});
