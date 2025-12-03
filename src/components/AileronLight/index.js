import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {fonts} from '../../assets/fonts';
import {vw} from '../../assets/theme/dimension';
import {COLORS} from '../../assets/theme/colors';

const AileronLight = ({name, numberOfLines, style, ...rest}) => {
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
    fontFamily: fonts.inter.light,
    textAlign: 'center',
    color: COLORS.textColor,
    fontSize: vw * 1.3,
  },
});
