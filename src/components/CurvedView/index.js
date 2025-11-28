import React from 'react';
import {StyleSheet, View} from 'react-native';
import {vh, vw} from '../../assets/theme/dimension';
import {COLORS} from '../../assets/theme/colors';

const CurvedView = ({
  children,
  containerStyle,
  backColor,
}) => {
  return (
    <View style={[styles.container, backColor]}>
      <View style={[styles.subContainer, containerStyle]}>{children}</View>
    </View>
  );
};
export default CurvedView;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#48C3FF',
    flex: 1,
    width: '100%',
  },
  subContainer: {
    paddingVertical: vh * 2,
    paddingBottom: vh * 10,
    paddingHorizontal: vw * 5,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: vw * 8,
    borderTopRightRadius: vw * 8,
    height: '100%',
    width: '100%',
  },
});
