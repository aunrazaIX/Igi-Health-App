import React, {ReactNode} from 'react';
import {StyleSheet, View} from 'react-native';
import {vh, vw} from '../../assets/theme/dimension';
import {COLORS} from '../../assets/theme/colors';

type StyleObject = Record<string, string | number | boolean>;

const CurvedView = ({
  children,
  containerStyle,
}: {
  children: ReactNode;
  containerStyle?: StyleObject | StyleObject[];
}) => {
  return <View style={[styles.container, containerStyle]}>{children}</View>;
};
export default CurvedView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: vh * 2,
    paddingHorizontal: vw * 5,
    backgroundColor: COLORS.white,
    bottom: vh * 4,
    borderTopLeftRadius: vw * 8,
    borderTopRightRadius: vw * 8,
  },
});
