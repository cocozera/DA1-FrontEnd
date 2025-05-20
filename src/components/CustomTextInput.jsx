import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../styles/globalStyles';

const CustomTextInput = ({
  placeholder,
  secureTextEntry = false,
  value,
  onChangeText,
  keyboardType = 'default',
  iconRight,
  onPressIconRight,
}) => {
  return (
    <View style={styles.inputWrapper}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={colors.gray500}
        secureTextEntry={secureTextEntry}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        autoCapitalize="none"
      />
      {iconRight && (
        <TouchableOpacity onPress={onPressIconRight} style={styles.iconWrapper}>
          <Icon name={iconRight} size={22} color={colors.gray700} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.gray300,
    borderRadius: 8,
    backgroundColor: colors.white,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: colors.textPrimary,
  },
  iconWrapper: {
    paddingLeft: 8,
  },
});

export default CustomTextInput;
