// src/components/CustomText.jsx
import { Text } from 'react-native';
import { typography } from '../styles/globalStyles';

export default function CustomText({ style, children, ...rest }) {
  return (
    <Text
      style={[typography.body, style]}
      {...rest}
    >
      {children}
    </Text>
  );
}
