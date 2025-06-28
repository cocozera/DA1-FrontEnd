// src/components/CompleteRouteModal.jsx
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  StyleSheet,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors, typography } from '../styles/globalStyles';
import CustomButton from './CustomButton';
import CustomText from './CustomText';
import CustomTextInput from './CustomTextInput';

export default function CompleteRouteModal({ visible, onClose, onConfirm, code, setCode }) {
  return (
    <Modal
      animationType="fade"
      transparent
      visible={visible}
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.modalOverlay}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Icon name="flag-checkered" size={32} color={colors.primary} />
            <CustomText style={styles.modalTitle}>Finalizar Ruta</CustomText>
            <CustomText style={styles.modalSubtitle}>
              Ingresá el código de finalización para completar la ruta
            </CustomText>
          </View>
          
          <View style={styles.inputContainer}>
            <CustomText style={styles.inputLabel}>Código de Finalización</CustomText>
            <CustomTextInput
              placeholder="Ingresá el código"
              value={code}
              onChangeText={setCode}
              style={styles.codeInput}
            />
          </View>

          <View style={styles.modalButtons}>
            <CustomButton 
              title="Cancelar" 
              onPress={onClose}
              style={styles.cancelButton}
            />
            <CustomButton 
              title="Confirmar" 
              onPress={onConfirm}
              style={styles.confirmButton}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContainer: {
    width: '100%',
    maxWidth: 350,
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  modalHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  modalTitle: {
    ...typography.h2,
    marginTop: 12,
    marginBottom: 8,
    textAlign: 'center',
    color: colors.textPrimary,
  },
  modalSubtitle: {
    ...typography.body,
    textAlign: 'center',
    color: colors.gray500,
    lineHeight: 22,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 24,
  },
  inputLabel: {
    ...typography.h2,
    marginBottom: 8,
    color: colors.textPrimary,
  },
  codeInput: {
    height: 56,
    fontSize: 18,
    textAlign: 'center',
    letterSpacing: 2,
    fontFamily: 'Montserrat-Bold',
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: colors.gray300,
  },
  confirmButton: {
    flex: 1,
  },
});
