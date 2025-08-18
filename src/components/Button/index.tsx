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
import SimpleLoader from '../SimpleLoader';
import useForgotPasswordViewModel from '../../viewmodels/useForgotPasswordViewModel';
import AileronBold from '../AileronBold';

interface ButtonProps extends TouchableOpacityProps {
  name: string;
  containerStyle?: Record<string, string | number | boolean>;
  inputStyle?: Record<string, string | number | boolean>;
  showIcon?: boolean;
  gradientColors?: string[];
  loading?: boolean;
  disabled?: boolean;
  ForgotPasswordLoading?: boolean;
  route?: any;
  showIconRight: any;
}

const Button: React.FC<ButtonProps> = ({
  name,
  containerStyle,
  inputStyle,
  showIcon,
  onPress,
  gradientColors,
  loading,
  disabled,
  showIconRight,
}) => {
  return (
    <LinearGradient
      style={[styles.container, containerStyle]}
      colors={
        disabled && !loading
          ? [COLORS.disabled, COLORS.disabled]
          : gradientColors || COLORS.activeButtonGradient
      }>
      <TouchableOpacity
        disabled={disabled}
        style={styles.buttonContent}
        onPress={onPress}>
        {showIcon && <Image style={styles.buttonIcon} source={showIcon} />}
        {loading ? (
          <SimpleLoader size={'small'} />
        ) : (
          <AileronBold name={name} style={[styles.buttonText, inputStyle]} />
        )}
        {showIconRight && (
          <Image style={styles.buttonIcon} source={showIconRight} />
        )}
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: vw * 4,
    justifyContent: 'center',
    height: vh * 6,
  },

  buttonText: {
    color: COLORS.buttonText,
    fontSize: vw * 3.5,
    justifyContent: 'center',
    alignItems: 'center',
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
