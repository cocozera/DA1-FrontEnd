import { useNavigation, useRoute } from '@react-navigation/native';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { baseStyles, colors, typography } from '../styles/globalStyles';

export default function InProgressRoute() {
  const navigation = useNavigation();
  const route = useRoute();
  const { routeData } = route.params || {};

  const formatDate = (isoString) => {
    if (!isoString) return '-';
    const date = new Date(isoString);
    return date.toLocaleString();
  };

  if (!routeData) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={typography.body}>No hay datos de la ruta en progreso.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={({ pressed }) => [
            baseStyles.backButton,
            pressed && baseStyles.backButtonPressed, 
          ]}
        >
          <Icon name="arrow-left" size={24} color={colors.textPrimary} />
        </Pressable>

        <Text style={styles.title}>Ruta en Progreso</Text>

        <Card icon="map-marker" label="Dirección" value={routeData.address} />
        <Card icon="map" label="Zona" value={routeData.zone} />
        <Card icon="account" label="Conductor asignado" value={routeData.assignedUser} />
        <Card icon="calendar-clock" label="Inicio" value={formatDate(routeData.startedAt)} />
      </ScrollView>
    </SafeAreaView>
  );
}

function Card({ icon, label, value }) {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Icon name={icon} size={20} color={colors.primary} style={{ marginRight: 8 }} />
        <Text style={styles.label}>{label}:</Text>
      </View>
      <Text style={styles.value}>{value || '-'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundBeige,
  },
  content: {
    padding: 16,
    paddingBottom: 30,
  },
  title: {
    ...typography.h1,
    marginBottom: 24,
    marginTop: 8,
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
    marginBottom: 4,
  },
  label: {
    fontWeight: 'bold',
    color: colors.textPrimary,
    fontSize: 16,
  },
  value: {
    fontSize: 16,
    color: colors.textPrimary,
    marginLeft: 28,
    marginTop: 2,
  },
});
