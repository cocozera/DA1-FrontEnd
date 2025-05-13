import { TextInput, View } from 'react-native';
import { baseStyles, colors } from '../styles/globalStyles';

const CustomTextInput = ({
  placeholder,
  secureTextEntry = false,
  value,
  onChangeText,
  keyboardType = 'default'
}) => {
  return (
    <View style={baseStyles.inputContainer}>
      <TextInput
        style={baseStyles.input}
        placeholder={placeholder}
        placeholderTextColor={colors.gray500}
        secureTextEntry={secureTextEntry}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        autoCapitalize="none"
      />
    </View>
  );
};

export default CustomTextInput;
