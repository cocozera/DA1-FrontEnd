import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors, typography } from '../styles/globalStyles';

export default function CustomTextInput({
  placeholder,
  secureTextEntry = false,
  value,
  onChangeText,
  keyboardType = 'default',
  iconRight,
  onPressIconRight,
  editable = true,
}) {
  return (
    <View style={styles.wrapper}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={colors.gray500}
        secureTextEntry={secureTextEntry}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        editable={editable}
        autoCapitalize="none"
      />
      {iconRight && (
        <Pressable
          onPress={onPressIconRight}
          style={({ pressed }) => [
            styles.iconContainer,
            pressed && styles.iconPressed,
          ]}
        >
          <Icon name={iconRight} size={22} color={colors.gray500} />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: colors.gray300,
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: colors.white,
    marginBottom: 16,
    position: 'relative',
  },
  input: {
    flex: 1,
    ...typography.body,
    paddingVertical: 12,
    paddingLeft: 12,
    paddingRight: 40, // espacio reservado para el ícono
    color: colors.textPrimary,
  },
  iconContainer: {
    position: 'absolute',
    right: 12,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
  },
  iconPressed: {
    opacity: 0.6,
  },
});
