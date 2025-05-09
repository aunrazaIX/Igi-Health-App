import {
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TouchableOpacityProps,
} from 'react-native';
import React from 'react';
import {vh, vw} from '../../assets/theme/dimension';
import {COLORS} from '../../assets/theme/colors';
import LinearGradient from 'react-native-linear-gradient';

interface ButtonProps extends TouchableOpacityProps {
  name: string;
  containerStyle?: Record<string, string | number | boolean>;
  inputStyle?: Record<string, string | number | boolean>;
  showIcon?: boolean;
  gradientColors?: string[];
}

const Button: React.FC<ButtonProps> = ({
  name,
  containerStyle,
  inputStyle,
  showIcon,
  onPress,
  gradientColors,
}) => {
  return (
    <LinearGradient
      style={[styles.container, containerStyle]}
      // colors={COLORS.activeButtonGradient}
      colors={gradientColors || COLORS.activeButtonGradient}>
      <TouchableOpacity style={styles.buttonContent} onPress={onPress}>
        {showIcon && <Image style={styles.buttonIcon} source={showIcon} />}
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
  },

  buttonText: {
    color: COLORS.buttonText,
    fontWeight: 'bold',
    fontSize: vw * 4.5,
  },
  buttonContent: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: vh * 2,
    flexDirection: 'row',
    gap: vw * 3,
  },
  buttonIcon: {
    width: vw * 7,
    height: vw * 7,
  },
});
