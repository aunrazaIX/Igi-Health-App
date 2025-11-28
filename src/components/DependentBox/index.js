import {View, Text, StyleSheet} from 'react-native';
import React, {ReactNode} from 'react';
import {COLORS} from '../../assets/theme/colors';
import {vh, vw} from '../../assets/theme/dimension';

type StyleObject = Record<string, string | number | boolean>;

const DependentBox = ({
  children,
  containerStyle,
}: {
  children: ReactNode;
  containerStyle?: StyleObject | StyleObject[];
}) => {
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
