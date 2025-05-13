import { ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import { baseStyles, colors } from '../styles/globalStyles';

const CustomButton = ({ title, onPress, loading = false }) => {
  return (
    <TouchableOpacity
      style={baseStyles.button}
      onPress={onPress}
      disabled={loading}
    >
      {loading
        ? <ActivityIndicator color={colors.white} />
        : <Text style={baseStyles.buttonText}>{title}</Text>
      }
    </TouchableOpacity>
  );
};

export default CustomButton;
