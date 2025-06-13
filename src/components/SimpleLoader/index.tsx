import React from 'react';
import {
  ActivityIndicator,
  ActivityIndicatorProps,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import {vh} from '../../assets/theme/dimension';
import {COLORS} from '../../assets/theme/colors';

interface SimpleLoaderProps {
  color?: string;
  size?: ActivityIndicatorProps['size'];
  style?: ViewStyle;
}

const SimpleLoader: React.FC<SimpleLoaderProps> = ({color, size, style}) => {
  return (
    <ActivityIndicator
      style={[styles.container, style]}
      color={color ? color : COLORS.white}
      size={size ? size : 'large'}
    />
  );
};
export default SimpleLoader;

const styles = StyleSheet.create({
  container: {
    marginVertical: vh,
  },
});
