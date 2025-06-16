// src/screens/QRScannerScreen.jsx
import { useNavigation } from '@react-navigation/native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { ActivityIndicator, Button, Surface } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Toast from 'react-native-toast-message';
import { assignRoute } from '../services/routeService';

export default function QRScannerScreen() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const [scanned, setScanned] = useState(false);
  const [loading, setLoading] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();

  useEffect(() => {
    requestPermission();
  }, []);

  const handleBarCodeScanned = async ({ type, data }) => {
    if (scanned) return;
    setScanned(true);
    setLoading(true);

    try {
      const { success, error } = await assignRoute(parseInt(data, 10));

      if (!success) throw new Error(error);

      Alert.alert(
        'Usuario asignado a la ruta correctamente',
        '',
        [{
          text: 'Aceptar',
          onPress: () => navigation.reset({ index: 0, routes: [{ name: 'Home' }] }),
        }]
      );
    } catch (error) {
      const message =
        (error.message || '').toLowerCase().includes('route in progress')
          ? 'El usuario ya tiene asignado una ruta'
          : 'Error al asignar la ruta';

      Alert.alert(
        message,
        '',
        [{
          text: 'Aceptar',
          onPress: () => navigation.reset({ index: 0, routes: [{ name: 'Home' }] }),
        }]
      );
    } finally {
      setLoading(false);
    }
  };

  if (!permission) {
    return <View style={styles.loader}><ActivityIndicator /></View>;
  }

  if (!permission.granted) {
    return (
      <View style={styles.loader}>
        <Text>No se otorgaron permisos para la cámara.</Text>
      </View>
    );
  }

  return (
    <Surface style={[styles.container, { paddingTop: insets.top }]}>
      <CameraView
        style={StyleSheet.absoluteFill}
        barcodeTypes={['qr']}
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
      />

      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={() => navigation.goBack()}
          style={[styles.button, { marginTop: 10 }]}
        >
          Volver
        </Button>
      </View>
      <Toast />
    </Surface>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  button: {
    width: 120,
  },
});
