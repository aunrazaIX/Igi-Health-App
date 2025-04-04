import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {fonts} from '../../assets/fonts';
import {vh} from '../../assets/theme/dimension';
import {COLORS} from '../../assets/theme/colors';

type StyleObject = Record<string, string | number | boolean>;

const AileronSemiBold = ({
  name,
  numberOfLines,
  style,
}: {
  name: string;
  numberOfLines?: number;
  style?: StyleObject | StyleObject[];
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

export default AileronSemiBold;

const styles = StyleSheet.create({
  textStyle: {
    fontFamily: fonts.Aileron.semibold,
    textAlign: 'center',
    color: COLORS.textColor,
    fontSize: vh * 1.3,
  },
});
