import {
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TouchableOpacityProps,
} from 'react-native';
import React from 'react';
import {vh, vw} from '../../assets/theme/dimension';
import {icons} from '../../assets';
import {COLORS} from '../../assets/theme/colors';
import LinearGradient from 'react-native-linear-gradient';

interface ButtonProps extends TouchableOpacityProps {
  name?: string;
  containerStyle?: Record<string, string | number | boolean>;
  inputStyle?: Record<string, string | number | boolean>;
  showIcon?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  name,
  containerStyle,
  inputStyle,
  showIcon,
  onPress,
}) => {
  return (
    <LinearGradient
      style={[styles.container, containerStyle]}
      colors={COLORS.activeButtonGradient}>
      <TouchableOpacity onPress={onPress}>
        {showIcon && <Image source={icons.eyeClosed} />}
        <Text style={[styles.buttonText, inputStyle]}>{name}</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: vw * 4,
    paddingVertical: vh * 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    color: COLORS.buttonText,
  },
});
