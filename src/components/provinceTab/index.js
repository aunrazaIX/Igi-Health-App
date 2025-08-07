import {View, TouchableOpacity, Image, StyleSheet} from 'react-native';
import React from 'react';
import AileronBold from '../AileronBold';
import {vh, vw} from '../../assets/theme/dimension';
import {icons} from '../../assets';
import {COLORS} from '../../assets/theme/colors';

const ProvinceTab = ({
  onPressMapTab,
  selectedMapTab,
  provinceName,
  icon,
  activeMapTab,
}) => {
  return (
    <TouchableOpacity
      onPress={() => onPressMapTab(provinceName)}
      style={[
        style.mapTab,
        selectedMapTab === provinceName && style.mapTabActive,
        activeMapTab,
      ]}>
      {icon && (
        <View>
          {selectedMapTab === provinceName ? (
            <Image style={style.mapTabIcon} source={icons.mapLoacationActive} />
          ) : (
            <Image
              style={style.mapTabIcon}
              source={icons.mapLoacationInActive}
            />
          )}
        </View>
      )}

      <View>
        {selectedMapTab === provinceName ? (
          <AileronBold style={style.mapTabTextActive} name={provinceName} />
        ) : (
          <AileronBold style={style.mapTabText} name={provinceName} />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default ProvinceTab;

const style = StyleSheet.create({
  mapTabActive: {
    backgroundColor: COLORS.cardBackgroundRed,
  },
  mapTab: {
    flexDirection: 'row',
    // width: vw * 25,
    backgroundColor: COLORS.buttonBorder,
    paddingHorizontal: vw * 3,
    borderRadius: vw * 5,
    gap: vw * 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: vh,
  },
  mapTextColor: {
    color: COLORS.cardBackgroundRed,
    fontSize: vw * 2.5,
  },
  mapTabText: {
    fontSize: vw * 3,
    color: COLORS.black,
  },
  mapTabTextActive: {
    fontSize: vw * 3,
    color: COLORS.white,
  },
  mapTabIcon: {
    height: vh * 3,
    width: vw * 6,
  },
});
