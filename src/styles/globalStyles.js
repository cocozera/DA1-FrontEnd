// src/styles/globalStyles.js
import { StyleSheet } from 'react-native';

// Nombres de fuente tal como los cargaste en App.js
const REGULAR = 'Montserrat-Regular';
const BOLD    = 'Montserrat-Bold';

// Paleta de colores
export const colors = {
  primary:        '#B20000',   // rojo fuerte para botones
  textPrimary:    '#8A0000',   // rojo oscuro para títulos y texto
  backgroundBeige:'#F1E0D6',   // beige de fondo de pantalla
  white:          '#FFFFFF',
  gray300:        '#DEE2E6',
  gray500:        '#ADB5BD',
};

// Tipografía global
export const typography = StyleSheet.create({
  h1: {
    fontFamily: BOLD,
    fontSize:   28,
    color:      colors.textPrimary,
  },
  h2: {
    fontFamily: BOLD,
    fontSize:   20,
    color:      colors.textPrimary,
  },
  body: {
    fontFamily: REGULAR,
    fontSize:   16,
    color:      colors.textPrimary,
  },
  link: {
    fontFamily: REGULAR,
    fontSize:   16,
    color:      colors.primary,
    textDecorationLine: 'underline',
  },
});

// Estilos base reutilizables
export const baseStyles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: BOLD,
    fontSize:   16,
    color:      colors.white,
  },
  input: {
    height:            50,
    borderWidth:       1,
    borderColor:       colors.gray300,
    borderRadius:      8,
    paddingHorizontal: 16,
    fontFamily:        REGULAR,
    fontSize:          16,
    backgroundColor:   colors.white,
  },
  inputContainer: {
    marginBottom: 16,
  },
  backButton: {
    width:            48,
    height:           48,
    justifyContent:   'center',
    alignItems:       'center',
    borderRadius:     24,
    marginLeft:       12,
    marginTop:        8,
  },
  backButtonPressed: {
    transform:       [{ scale: 0.9 }],
    backgroundColor: colors.gray300,
  },
});
