import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import {vh, vw} from '../../assets/theme/dimension';
import {icons} from '../../assets';
import AileronSemiBold from '../AileronSemiBold';
import {COLORS} from '../../assets/theme/colors';

const HeaderView = ({
  title,
  icon,
}: {
  title: string;
  icon: ImageSourcePropType | null;
}) => {
  return (
    <LinearGradient
      style={styles.container}
      colors={COLORS.activeButtonGradient}>
      <View style={styles.row}>
        <TouchableOpacity style={styles.backIconContainer}>
          <Image style={styles.backIcon} source={icons.backArrow} />
        </TouchableOpacity>
        <AileronSemiBold style={styles.headerName} name={title} />
      </View>
      <View style={styles.spacedView}>
        {icon && <Image style={styles.iconStyle} source={icon} />}
      </View>
    </LinearGradient>
  );
};
export default HeaderView;

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
});
