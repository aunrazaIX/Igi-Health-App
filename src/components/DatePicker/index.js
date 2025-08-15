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
      <TouchableOpacity
        disabled={disabled}
        onPress={() => {
          setShowModal(!showModal);
        }}
        style={styles.subContainer}>
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
          }}>
          <View style={styles.labelContainer}>
            <AileronBold style={[styles.label, labelStyle]} name={label} />
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
          </View>
          <View style={styles.iconView}>
            <Image style={styles.dropDownIcon} source={icons.calender} />
          </View>
        </View>
      </TouchableOpacity>
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
    // borderWidth: 2,
    marginTop: vh * -0.6,
    marginLeft: vw * -1,
  },
  subContainer: {
    height: vh * 3,
    width: '100%',
  },
  labelContainer: {
    alignItems: 'flex-start',
    backgroundColor: COLORS.appBackground,
  },
  pickerText: {
    fontSize: vw * 3.4,
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
    marginBottom: vh * 0.3,
    // paddingTop: vh * -2,
  },
});
