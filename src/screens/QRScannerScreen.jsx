import { useNavigation } from '@react-navigation/native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useEffect, useRef, useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { ActivityIndicator, Button, Surface } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Toast from 'react-native-toast-message';
import { assignRoute } from '../services/routeService';
import { scannerStyles } from '../styles/globalStyles';

export default function QRScannerScreen() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const [scanned, setScanned] = useState(false);
  const [loading, setLoading] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();
  const didRedirect = useRef(false);

  useEffect(() => {
    requestPermission();

    return () => {
      didRedirect.current = false;
    };
  }, []);

  const redirectToHome = () => {
    if (!didRedirect.current) {
      didRedirect.current = true;
      setTimeout(() => {
        navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
      }, 300); // asegura ejecución después del cierre del Alert
    }
  };

  const handleBarCodeScanned = async ({ data }) => {
    if (scanned || loading) return;
    setScanned(true);
    setLoading(true);

    try {
      const { success, error } = await assignRoute(parseInt(data, 10));
      if (!success) throw new Error(error);

      Alert.alert('Usuario asignado a la ruta correctamente', '', [
        { text: 'Aceptar', onPress: redirectToHome },
      ]);
    } catch (error) {
      const message = (error.message || '').toLowerCase().includes('route in progress')
        ? 'El usuario ya tiene asignado una ruta'
        : 'Error al asignar la ruta';

      Alert.alert(message, '', [
        { text: 'Aceptar', onPress: redirectToHome },
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (!permission) {
    return (
      <View style={scannerStyles.loader}>
        <ActivityIndicator />
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={scannerStyles.loader}>
        <Text>No se otorgaron permisos para la cámara.</Text>
      </View>
    );
  }

  return (
    <Surface style={[scannerStyles.container, { paddingTop: insets.top }]}>
      <CameraView
        style={StyleSheet.absoluteFill}
        barcodeTypes={['qr']}
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
      />

      {/* Guía visual para escanear el QR */}
      <View style={scannerStyles.qrGuide}>
        <View style={scannerStyles.guideBorder} />
      </View>

      <View style={scannerStyles.buttonContainer}>
        <Button
          mode="contained"
          onPress={redirectToHome}
          style={scannerStyles.button}
        >
          Volver
        </Button>
      </View>

      <Toast />
    </Surface>
  );
}
