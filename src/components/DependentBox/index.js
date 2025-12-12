import {View, StyleSheet} from 'react-native';
import React from 'react';
import {COLORS} from '../../assets/theme/colors';
import {vh} from '../../assets/theme/dimension';

const DependentBox = ({children, containerStyle}) => {
  return <View style={[styles.detailBox, containerStyle]}>{children}</View>;
};

export default DependentBox;

const styles = StyleSheet.create({
  detailBox: {
    borderColor: COLORS.dependentBorder,
    borderWidth: 2,
    paddingHorizontal: vh * 2,
    paddingVertical: vh * 1,
    borderRadius: vh * 2,
    marginTop: vh * 1,
  },
});
