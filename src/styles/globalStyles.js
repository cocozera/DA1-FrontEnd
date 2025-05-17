import { StyleSheet } from 'react-native';

// Paleta global actualizada
export const colors = {
  primary: '#B20000',        // rojo fuerte para botón
  textPrimary: '#8A0000',    // rojo oscuro para títulos
  backgroundBeige: '#F1E0D6',// beige de fondo de pantalla
  white: '#FFFFFF',
  gray300: '#DEE2E6',
  gray500: '#ADB5BD',
};

// Tipografía global
export const typography = StyleSheet.create({
  h1: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  body: {
    fontSize: 16,
    color: colors.textPrimary,
  },
  link: {
    fontSize: 16,
    color: colors.primary,
    textDecorationLine: 'underline',
  },
});

// Estilos base
export const baseStyles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    ...typography.body,
    color: colors.white,
    fontWeight: 'bold',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: colors.gray300,
    borderRadius: 8,
    paddingHorizontal: 16,
    ...typography.body,
    backgroundColor: colors.white,
  },
  inputContainer: {
    marginBottom: 16,
  },
  backButton: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 24,
  },
  // Nuevo estilo para la flecha cuando se presiona
  backButtonPressed: {
    transform: [{ scale: 0.9 }], // Efecto de reducción al presionar
    backgroundColor: colors.gray300, // Color de fondo cuando se presiona
  },
});
