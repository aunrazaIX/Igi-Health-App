import React, {useState} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {vh, vw} from '../../assets/theme/dimension';
import {COLORS} from '../../assets/theme/colors';
import AileronBold from '../AileronBold';
import {icons} from '../../assets';

type StyleObject = Record<string, string | number | boolean>;

interface CheckBoxProps {
  description: string;
  containerStyle?: StyleObject | StyleObject[];
}

const CheckBox: React.FC<CheckBoxProps> = ({description, containerStyle}) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  return (
    <View style={[styles.container, containerStyle]}>
      <TouchableOpacity
        onPress={() => setIsChecked(!isChecked)}
        style={styles.square}>
        {isChecked && <Image style={styles.tickIcon} source={icons.tickIcon} />}
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
    height: vh * 1.7,
    width: vw * 3.7,
  },
  descriptionText: {
    color: COLORS.textColorLight,
    marginLeft: vw * 2,
    fontSize: vw * 1.7,
  },
  tickIcon: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
});
