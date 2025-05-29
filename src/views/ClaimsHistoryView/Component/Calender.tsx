import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { Calendar } from 'react-native-calendars';
import { AileronBold } from '../../../components';
import { vh, vw } from '../../../assets/theme/dimension';
import { styles } from '../style';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS } from '../../../assets/theme/colors';

const Calender = ({
  onPressHeaderIcon,
  isCalendarVisible,
}: {
  onPressHeaderIcon: () => void;
  isCalendarVisible: boolean;
}) => {
  return (
    <Modal
      isVisible={isCalendarVisible}
      onBackdropPress={onPressHeaderIcon}
      style={style.modalStyle}
      animationIn="slideInUp"
      animationInTiming={3}
      animationOut="slideOutDown"
      backdropOpacity={0}>
      <View style={style.modalContent}>
        <Calendar
          onDayPress={day => console.log(day)}
          style={{
            height: vh * 70,
            paddingHorizontal: vw * 4,
            paddingBottom: vh * 2,
          }}
          dayComponent={({ date, state }) => {
            return (
              <>
                <View>
                  <AileronBold
                    style={style.daysSection}
                    name={date?.day?.toString() || ''}
                  />
                </View>
              </>
            );
          }}
        />

        <View style={styles.calendarButtonsContainer}>
          <TouchableOpacity
            style={style.cancelButton}
            onPress={onPressHeaderIcon}>
            <AileronBold name={'Cancel'} />
          </TouchableOpacity>

          <LinearGradient colors={COLORS.activeButtonGradient}>
            <TouchableOpacity
              style={style.applyButton}
              onPress={() => console.log('Apply pressed')}>
              <AileronBold name={'Select'} />
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </View>
    </Modal>
  );
};

export default Calender;

const style = StyleSheet.create({
  modalStyle: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: COLORS.white,
    paddingVertical: vh * 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalText: {
    textAlign: 'center',
  },
  daysSection: {
    fontSize: vh * 2,
    paddingVertical: vh * 2,
    paddingHorizontal: vw * 2,
  },
  cancelButton: {
    paddingVertical: vh * 1.5,
    backgroundColor: COLORS.buttonBackground,
    borderRadius: 10,
    marginRight: vw * 2,
    alignItems: 'center',
    width: '50%',
  },

  applyButton: {
    paddingVertical: vh * 1.5,
    width: '50%',
    borderRadius: 10,
    marginLeft: vw * 2,
    alignItems: 'center',
  },
});
