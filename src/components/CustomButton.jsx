import { ActivityIndicator, Pressable, Text } from 'react-native';
import { baseStyles, colors } from '../styles/globalStyles';

const CustomButton = ({ title, onPress, loading = false, style, textStyle }) => {
  return (
    <Pressable
      style={({ pressed }) => [
        baseStyles.button,
        style,
        pressed && { opacity: 0.7 }
      ]}
      onPress={onPress}
      disabled={loading}
    >
      {loading
        ? <ActivityIndicator color={colors.white} />
        : <Text style={[baseStyles.buttonText, textStyle]}>{title}</Text>
      }
    </Pressable>
  );
};

export default CustomButton;
