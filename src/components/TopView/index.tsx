import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {COLORS} from '../../assets/theme/colors';
import AileronSemiBold from '../AileronSemiBold';
import {vh, vw} from '../../assets/theme/dimension';
import {icons} from '../../assets';

type StyleObject = Record<string, string | number | boolean>;

const TopView = ({
  title,
  icon,
  TopViewSideIcon,
  onPressBack,
  AddModal,
  TopViewSecondIcon,
  containerStyle
}: {
  title: string;
  onPressBack?: () => void,
  icon?: ImageSourcePropType | null;
  TopViewSideIcon?: ImageSourcePropType | null;
  TopViewSecondIcon?: ImageSourcePropType | null;
  AddModal?: () => void,
  containerStyle?: StyleObject | StyleObject[];
}) => {
  return (
    <LinearGradient
      style={[styles.container]}
      colors={COLORS.activeButtonGradient}>
      <View style={[styles.row, , containerStyle]}>
        <TouchableOpacity
          onPress={onPressBack}
          style={styles.backIconContainer}>
          <Image style={styles.backIcon} source={icons.backArrow} />
        </TouchableOpacity>
        <AileronSemiBold style={styles.headerName} name={title} />
        <View style={styles.headerIcon}>


          {TopViewSecondIcon &&
            <TouchableOpacity>
              <Image style={styles.TopViewIcon} source={TopViewSecondIcon} />
            </TouchableOpacity>
          }

          {TopViewSideIcon &&
            <TouchableOpacity onPress={AddModal}>
              <Image style={styles.TopViewIcon} source={TopViewSideIcon} />
            </TouchableOpacity>
          }
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
    marginTop: vh * 5,
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
    width: '65%',
    color: COLORS.white,
    fontSize: vw * 4,
  },
  spacedView: {
    marginVertical: vh * 3,
  },
  iconStyle: {
    height: vh * 8,
    width: vw * 8,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  TopViewIcon: {

  },
  headerIcon: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: vh * 8,
    gap: vh * .5
  }
});
