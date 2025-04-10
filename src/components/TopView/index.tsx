import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { COLORS } from '../../assets/theme/colors';
import AileronSemiBold from '../AileronSemiBold';
import { vh, vw } from '../../assets/theme/dimension';
import { icons } from '../../assets';


const TopView = ({
  title,
  icon,
  TopViewSideIcon,
  onPressBack
}: {
  title: string;
  onPressBack?: () => void,
  icon?: ImageSourcePropType | null;
  TopViewSideIcon?: ImageSourcePropType | null;
}) => {
  return (
    <LinearGradient
      style={styles.container}
      colors={COLORS.activeButtonGradient}>
      <View style={styles.row}>
        <TouchableOpacity onPress={onPressBack} style={styles.backIconContainer}>
          <Image style={styles.backIcon} source={icons.backArrow} />
        </TouchableOpacity>
        <AileronSemiBold style={styles.headerName} name={title} />
        {TopViewSideIcon && <Image style={styles.TopViewIcon} source={TopViewSideIcon} />}
      </View>
      <View style={styles.spacedView}>
        {icon && <Image style={styles.iconStyle} source={icon} />}
      </View>
    </LinearGradient>
  );
};
export default TopView;

const styles = StyleSheet.create({
  container: {
    paddingVertical: vh * 3,
    paddingHorizontal: vw * 3,
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
  },
  backIconContainer: {
    height: vh * 4.5,
    width: vw * 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: vw * 5,
    backgroundColor: COLORS.white,
  },
  backIcon: {
    width: '40%',
    height: '40%',
    resizeMode: 'contain',
  },
  headerName: {
    width: '70%',
    color: COLORS.white,
    fontSize: vh * 2,
  },
  spacedView: {
    marginVertical: vh * 3,
  },
  iconStyle: {
    height: vh * 16,
    width: vw * 50,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  TopViewIcon: {

  },
});
