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
import {CommonActions, useNavigation, useRoute} from '@react-navigation/native';

type StyleObject = Record<string, string | number | boolean>;

const TopView = ({
  title,
  icon,
  TopViewFirstIcon,
  tintColrorForTopViewFirstIcon,
  onPressBack,
  FirstOpenModal,
  SecondOpenModal,
  TopViewSecondIcon,
  containerStyle,
  containerStyleIcon,
  goBack,
  resetStates,
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
  tintColrorForTopViewFirstIcon?: string;
  resetStates?: () => void;
}) => {
  const route = useRoute();
  const navigation = useNavigation();

  return (
    <LinearGradient style={[styles.container]} colors={COLORS.PriorGradient}>
      <View style={styles.wrapper}>
        <View style={[styles.row, , containerStyle]}>
          <TouchableOpacity
            onPress={() => {
              if (onPressBack) {
                onPressBack();
              }
              const stackRoutes = navigation?.getState()?.routes;
              const currentRouteIndex = stackRoutes?.findIndex(
                _route => _route.name === route.name,
              );

              if (currentRouteIndex === 0) {
                navigation?.dispatch(
                  CommonActions.reset({
                    index: 0,
                    routes: [{name: 'HomeStack'}],
                  }),
                );
                return;
              } else {
                navigation?.goBack();
              }
            }}
            style={styles.backIconContainer}>
            <Image style={styles.backIcon} source={icons.backArrow} />
          </TouchableOpacity>
          <AileronSemiBold style={styles.headerName} name={title} />
          {(TopViewSecondIcon || TopViewFirstIcon) && (
            <View style={styles.headerIcon}>
              <TouchableOpacity onPress={SecondOpenModal}>
                <Image style={styles.TopViewIcon} source={TopViewSecondIcon} />
              </TouchableOpacity>

              {TopViewFirstIcon && (
                <TouchableOpacity onPress={FirstOpenModal}>
                  <Image
                    style={[
                      styles.TopViewIcon,
                      containerStyleIcon,
                      tintColrorForTopViewFirstIcon && {
                        tintColor: tintColrorForTopViewFirstIcon,
                      },
                    ]}
                    source={TopViewFirstIcon}
                  />
                </TouchableOpacity>
              )}
            </View>
          )}
        </View>

        <View>{icon && <Image style={styles.iconStyle} source={icon} />}</View>
      </View>
    </LinearGradient>
  );
};
export default TopView;

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  wrapper: {
    paddingTop: vh * 6,
    paddingHorizontal: vw * 3,
    alignItems: 'center',
  },
  headerIcons: {
    flexDirection: 'row',
    gap: vw * 2,
  },
  row: {
    alignItems: 'center',

    flexDirection: 'row',
    marginBottom: vh * 3,
    width: '100%',
  },
  backIconContainer: {
    height: vh * 4.7,
    width: vw * 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: vw * 5,
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
    textAlign: 'center',
    marginLeft: vw * 2.2,
    // borderWidth: 2,
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
    gap: vh * 1,
  },
});
