import React from 'react';
import {ActivityIndicator, StyleSheet} from 'react-native';
import {vh} from '../../assets/theme/dimension';
import {COLORS} from '../../assets/theme/colors';

const SimpleLoader = ({color, size, style}) => {
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
