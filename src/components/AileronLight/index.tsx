import React from 'react';
import {StyleSheet, Text, TextProps, StyleProp, TextStyle} from 'react-native';
import {fonts} from '../../assets/fonts';
import {vh, vw} from '../../assets/theme/dimension';
import {COLORS} from '../../assets/theme/colors';

interface AileronLightProps extends TextProps {
  name: string;
  style?: StyleProp<TextStyle>;
  numberOfLines?: number;
}

const AileronLight: React.FC<AileronLightProps> = ({
  name,
  numberOfLines,
  style,
  ...rest
}) => {
  return (
    <Text
      {...rest}
      numberOfLines={numberOfLines}
      allowFontScaling={false}
      style={[styles.textStyle, style]}>
      {name}
    </Text>
  );
};

export default AileronLight;

const styles = StyleSheet.create({
  textStyle: {
    fontFamily: fonts.Aileron.light,
    textAlign: 'center',
    color: COLORS.textColor,
    fontSize: vw * 1.3,
  },
});
