import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {fonts} from '../../assets/fonts';
import {vh} from '../../assets/theme/dimension';
import {COLORS} from '../../assets/theme/colors';

type styleObject = string | number | boolean;

const AileronRegular = ({
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

export default AileronRegular;

const styles = StyleSheet.create({
  textStyle: {
    fontFamily: fonts.Aileron.regular,
    textAlign: 'center',
    color: COLORS.textColor,
    fontSize: vh * 1.3,
  },
});
