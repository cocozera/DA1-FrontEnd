// src/components/CustomTextInput.js
import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { baseStyles, colors, typography } from '../styles/globalStyles';

export default function CustomTextInput({
  placeholder,
  secureTextEntry = false,
  value,
  onChangeText,
  keyboardType = 'default',
  iconRight,
  onPressIconRight,
}) {
  return (
    <View style={styles.wrapper}>
      <TextInput
        style={[baseStyles.input, typography.body, styles.input]}
        placeholder={placeholder}
        placeholderTextColor={colors.gray500}
        secureTextEntry={secureTextEntry}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
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
    marginBottom: 16,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    color: colors.textPrimary,
    backgroundColor: colors.white,
  },
  iconContainer: {
    paddingLeft: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconPressed: {
    opacity: 0.6,
  },
});
