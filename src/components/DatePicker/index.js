import React, {useState} from 'react';
import {Image, StyleSheet, View, TouchableOpacity} from 'react-native';
import {icons} from '../../assets';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import AileronRegular from '../AileronRegular';
import {COLORS} from '../../assets/theme/colors';
import {vh, vw} from '../../assets/theme/dimension';
import AileronBold from '../AileronBold';
import moment from 'moment';

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
          <AileronBold style={[styles.label, labelStyle]} name={label} />
        </View>
        <TouchableOpacity
          disabled={disabled}
          onPress={() => {
            setShowModal(!showModal);
          }}
          style={styles.innerContainer}>
          {/* <Image
            style={{width: vw * 10, height: vh * 4, borderWidth: 2}}
            source={icons.calender}
          /> */}
          <AileronRegular
            style={[
              styles.pickerText,
              disabled
                ? {color: COLORS.black + '55'}
                : value
                ? {color: COLORS.personalValue}
                : {color: COLORS.textGrayShade},
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
        mode={'date'}
        isVisible={showModal}
        date={selectedDate}
        onConfirm={date => {
          if (onSelectValue && typeof onSelectValue === 'function') {
            onSelectValue(moment(date).format('DD-MMM-YYYY'));
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
    height: vh * 3,
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
    // borderWidth: 1.5,
    borderRadius: vw * 2,
  },
  pickerText: {
    fontSize: vh * 1.7,
    textAlign: 'left',
    color: COLORS.black,
    width: '75%',
    // borderWidth: 2,
  },
  iconView: {
    width: '25%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  dropDownIcon: {
    width: vw * 7,
    height: vw * 7,
    resizeMode: 'contain',
  },
  label: {
    fontSize: vh * 1.55,
    color: COLORS.black,
  },
});
