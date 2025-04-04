import {Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {vh} from '../../assets/theme/dimension';
import {icons} from '../../assets';
import {COLORS} from '../../assets/theme/colors';

const Button: React.FC<{name: string}> = ({name}) => {
  return (
    <TouchableOpacity style={styles.loginButton}>
      <Image source={icons.leftArrow} />
      <Text style={styles.buttonText}>{name}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  loginButton: {
    flexDirection: 'row',
    gap: 4,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 2 * vh,
  },
  buttonText: {
    color: COLORS.buttonText,
  },
});
