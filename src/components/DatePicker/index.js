import React, {useState} from 'react';
import {Image, StyleSheet, View, TouchableOpacity} from 'react-native';
import {icons} from '../../assets';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import AileronRegular from '../AileronRegular';
import {COLORS} from '../../assets/theme/colors';
import {vh, vw} from '../../assets/theme/dimension';

const DatePicker = ({
  label,
  disabled,
  value,
  labelStyle,
  placeholder,
  containerStyle,
  onSelectValue,
  mode,
  maximumDate,
  minimumDate,
  selectedDate,
}) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.subContainer}>
        <View style={styles.labelContainer}>
          <AileronRegular style={[styles.label, labelStyle]} name={label} />
        </View>
        <TouchableOpacity
          disabled={disabled}
          onPress={() => {
            setShowModal(!showModal);
          }}
          style={styles.innerContainer}>
          <AileronRegular
            style={[
              styles.pickerText,
              placeholder && {color: COLORS.black},
              disabled && {color: COLORS.black + '55'},
            ]}
            name={value ? value : placeholder}
          />
          <View style={styles.iconView}>
            <Image style={styles.dropDownIcon} source={icons.calender} />
          </View>
        </TouchableOpacity>
      </View>
      <DateTimePickerModal
        minimumDate={minimumDate ?? null}
        maximumDate={maximumDate ? maximumDate : new Date()}
        onCancel={() => setShowModal(false)}
        mode={mode ? mode : 'date'}
        isVisible={showModal}
        date={selectedDate}
        onConfirm={date => {
          if (onSelectValue && typeof onSelectValue === 'function') {
            onSelectValue(date);
          }
          setShowModal(false);
        }}
      />
    </View>
  );
};

export default DatePicker;
const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: vh * 3,
  },
  subContainer: {
    height: vh * 5,
    width: '100%',
  },
  labelContainer: {
    alignItems: 'flex-start',
    backgroundColor: COLORS.appBackground,
  },
  innerContainer: {
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: vw,
    width: '100%',
    height: '100%',
    borderColor: COLORS.black + '22',
    borderWidth: 1.5,
    borderRadius: vw * 2,
    paddingHorizontal: vw * 2,
  },
  pickerText: {
    fontSize: vh * 1.5,
    textAlign: 'left',
    color: COLORS.black,
    width: '75%',
  },
  iconView: {
    width: '25%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropDownIcon: {
    width: '100%',
    resizeMode: 'contain',
    height: '55%',
  },
  label: {
    fontSize: vh * 1.55,
    color: COLORS.black,
  },
});
