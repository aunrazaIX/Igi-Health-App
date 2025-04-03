import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {vh, vw} from '../../assets/theme/dimension';
import {Colors} from '../../assets/theme/colors';
import {fonts} from '../../assets/fonts';

const DMSansMedium = ({name, numberOfLines, style}) => {
  return (
    <>
      <Text
        numberOfLines={numberOfLines}
        style={[styles.textStyle, style]}
        allowFontScaling={false}>
        {name}
      </Text>
    </>
  );
};

export default DMSansMedium;

const styles = StyleSheet.create({
  textStyle: {
    fontFamily: fonts.DMSans.semibold,
    color: Colors.textColor,
    fontSize: vh * 1.3,
  },
});
