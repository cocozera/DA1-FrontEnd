// src/styles/globalStyles.js
import { StyleSheet } from 'react-native';

const REGULAR = 'Montserrat-Regular';
const BOLD    = 'Montserrat-Bold';

export const colors = {
  primary:        '#B20000',
  textPrimary:    '#8A0000',
  backgroundBeige:'#F1E0D6',
  white:          '#FFFFFF',
  gray300:        '#DEE2E6',
  gray500:        '#ADB5BD',
};

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

export const baseStyles = StyleSheet.create({
  containerScreen: {
    flex: 1,
    backgroundColor: colors.backgroundBeige,
    padding: 16,
  },
  loaderCenter: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.backgroundBeige,
  },
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
  overlayCenter: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 20,
  },
  modalBox: {
    backgroundColor: colors.white,
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 30,
    right: 30,
  },
  sectionHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionUnderline: {
    marginTop: 6,
    width: 100,
    height: 3,
    backgroundColor: colors.primary,
    borderRadius: 2,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: colors.primary,
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
    zIndex: 10,
  },
  floatingButtonPressed: {
    opacity: 0.7,
  },
});
