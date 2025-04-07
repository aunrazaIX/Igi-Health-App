import React, {ReactNode} from 'react';
import {StyleSheet, View} from 'react-native';
import {COLORS} from '../../assets/theme/colors';

const Container = ({children}: {children: ReactNode}) => {
  return <View style={styles.container}>{children}</View>;
};

export default Container;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
});
