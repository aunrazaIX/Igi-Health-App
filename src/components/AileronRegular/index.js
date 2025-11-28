import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {fonts} from '../../assets/fonts';
import {vw} from '../../assets/theme/dimension';
import {COLORS} from '../../assets/theme/colors';

const AileronRegular = ({name, numberOfLines, style, ...rest}) => {
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

export default AileronRegular;

const styles = StyleSheet.create({
  textStyle: {
    fontFamily: fonts.inter.regular,
    textAlign: 'center',
    color: COLORS.textColor,
    fontSize: vw * 1.3,
  },
});
