import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {fonts} from '../../assets/fonts';
import {vh} from '../../assets/theme/dimension';
import {COLORS} from '../../assets/theme/colors';

type styleObject = string | number | boolean;

const AileronLight = ({
  name,
  numberOfLines,
  style,
}: {
  name: string;
  numberOfLines: number;
  style: Record<string, styleObject>;
}) => {
  return (
    <Text
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
    fontSize: vh * 1.3,
  },
});
