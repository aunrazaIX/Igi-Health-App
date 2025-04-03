import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { fonts } from '../../assets/fonts';
import { vh } from '../../assets/theme/dimension';
import { Colors } from '../../assets/theme/colors';

const DMSansBold = ({ name }: { name: string }) => {
  return <Text style={styles.textStyle}>{name}</Text>;
};

export default DMSansBold;

const styles = StyleSheet.create({
  textStyle: {
    fontFamily: fonts.DMSans.bold,
    textAlign: 'center',
    color: Colors.textColor,
    fontSize: vh * 1.3,
  },
});
