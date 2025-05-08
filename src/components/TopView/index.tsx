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

type StyleObject = Record<string, string | number | boolean>;

const TopView = ({
  title,
  icon,
  TopViewFirstIcon,
  onPressBack,
  FirstOpenModal,
  SecondOpenModal,
  TopViewSecondIcon,
  containerStyle,
  containerStyleIcon,
  goBack,
}: {
  title: string;
  onPressBack?: () => void;
  icon?: ImageSourcePropType | null;
  TopViewFirstIcon?: ImageSourcePropType | null;
  TopViewSecondIcon?: ImageSourcePropType | null;
  FirstOpenModal?: () => void;
  SecondOpenModal?: () => void;
  containerStyle?: StyleObject | StyleObject[];
  goBack?: () => void;
  containerStyleIcon?: StyleObject | StyleObject[];
}) => {
  return (
    <LinearGradient style={[styles.container]} colors={COLORS.PriorGradient}>
      <View style={[styles.row, , containerStyle]}>
        <TouchableOpacity
          onPress={onPressBack}
          style={styles.backIconContainer}>
          <Image style={styles.backIcon} source={icons.backArrow} />
        </TouchableOpacity>
        <AileronSemiBold style={styles.headerName} name={title} />
        <View style={styles.headerIcon}>
          {TopViewSecondIcon && (
            <TouchableOpacity onPress={SecondOpenModal}>
              <Image style={styles.TopViewIcon} source={TopViewSecondIcon} />
            </TouchableOpacity>
          )}

          {TopViewFirstIcon && (
            <TouchableOpacity onPress={FirstOpenModal}>
              <Image
                style={[styles.TopViewIcon, containerStyleIcon]}
                source={TopViewFirstIcon}
              />
            </TouchableOpacity>
          )}
        </View>
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
    paddingHorizontal: vw * 3,
    alignItems: 'center',
  },
  headerIcons: {
    flexDirection: 'row',
    gap: vw * 2,
  },
  row: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: vh * 2,
  },
  backIconContainer: {
    height: vh * 4.7,
    width: vw * 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: vw * 4.5,
    backgroundColor: COLORS.white,
  },
  backIcon: {
    width: '35%',
    height: '40%',
    resizeMode: 'contain',
  },
  headerName: {
    width: '65%',
    color: COLORS.white,
    fontSize: vw * 5,
  },
  spacedView: {
marginVertical: vh*3.5
  },
  iconStyle: {
    height: vw * 32,
    width: vw * 32,
     marginTop: vh * 2,
    marginBottom: vh * 5,
    resizeMode: 'contain',
  },
  TopViewIcon: {
    width: vw * 8,
    height: vw * 8,
  },
  headerIcon: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: vh * 8,
    gap: vh * 0.5,
  },
});
