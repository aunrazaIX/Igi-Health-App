import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {vh, vw} from '../../assets/theme/dimension';
import {COLORS} from '../../assets/theme/colors';
import AileronBold from '../AileronBold';

type StyleObject = Record<string, string | number | boolean>;

interface CheckBoxProps {
  description: string;
  checked: boolean;
  containerStyle?: StyleObject | StyleObject[];
}

const CheckBox: React.FC<CheckBoxProps> = ({
  checked,
  description,
  containerStyle,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <TouchableOpacity style={styles.square}>
      </TouchableOpacity>
      <AileronBold style={styles.descriptionText} name={description} />
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
    borderColor: COLORS.black + '33',
    height: vh * 1.5,
    width: vw * 3.5,
  },
  descriptionText: {
    color: COLORS.textColorLight,
    marginLeft: vw * 2,
    fontSize: vh * 1.7,
  },
});
