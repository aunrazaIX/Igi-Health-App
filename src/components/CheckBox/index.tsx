import React, { useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { vh, vw } from '../../assets/theme/dimension';
import { COLORS } from '../../assets/theme/colors';
import AileronBold from '../AileronBold';
import { icons } from '../../assets';
import AileronRegular from '../AileronRegular';
import AileronSemiBold from '../AileronSemiBold';

type StyleObject = Record<string, string | number | boolean>;

interface CheckBoxProps {
  description: string;
  isChecked: boolean;
  containerStyle?: StyleObject | StyleObject[];
  onPressCheckBox: any
}

const CheckBox: React.FC<CheckBoxProps> = ({ onPressCheckBox, isChecked, description, containerStyle }) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <TouchableOpacity
        onPress={() => {
          if (onPressCheckBox) {
            onPressCheckBox()
          }
        }}
        style={styles.square}>
        {isChecked && <Image style={styles.tickIcon} source={icons.tickIcon} />}
      </TouchableOpacity>
      <AileronSemiBold style={styles.descriptionText} name={description} />
    </View>
  );
};
export default CheckBox;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  square: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: vw * 1,
    borderColor: COLORS.black,
    height: vh * 1.9,
    width: vw * 3.9,

  },
  descriptionText: {
    color: COLORS.textColor,
    marginLeft: vw * 2,
    fontSize: vw * 3.5,
  },
  tickIcon: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
});
