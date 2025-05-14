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
});

// Estilos para la pantalla de perfil
export const profileStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundBeige,
    padding: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginLeft: 5,
  },
  headerText: {
    ...typography.h1,
    marginLeft: 12,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    marginTop: 8,
  },
  infoText: {
    ...typography.body,
    marginBottom: 16,
  },
});
