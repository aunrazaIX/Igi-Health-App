import React from 'react';
import {StyleSheet, Text, TextProps, StyleProp, TextStyle} from 'react-native';
import {fonts} from '../../assets/fonts';
import {vh, vw} from '../../assets/theme/dimension';
import {COLORS} from '../../assets/theme/colors';

interface AileronBoldProps extends TextProps {
  name: string | number;
  style?: StyleProp<TextStyle>;
  numberOfLines?: number;
}

const AileronBold: React.FC<AileronBoldProps> = ({
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

export default AileronBold;

const styles = StyleSheet.create({
  textStyle: {
    fontFamily: fonts.Aileron.bold,
    textAlign: 'center',
    color: COLORS.textColor,
    fontSize: vw * 1.3,
  },
});
