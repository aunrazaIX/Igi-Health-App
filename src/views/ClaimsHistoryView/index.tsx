import {
  View,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Text,
} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import {styles} from './style';
import TopView from '../../components/TopView';
import {icons} from '../../assets';
import {AileronBold, CurvedView} from '../../components';
import {COLORS} from '../../assets/theme/colors';
import {vh, vw} from '../../assets/theme/dimension';
import DetailsContainer from '../../components/DetailsContainer';
import {Calendar} from 'react-native-calendars';
import {
  ClaimHistory,
  AmountStatus,
  daysStatus,
} from '../../viewmodels/useClaimsHistoryViewModel';
import LinearGradient from 'react-native-linear-gradient';

type HomeViewProps = {
  data: ClaimHistory[][];
  amountStatusTab: AmountStatus;
  daysStatusTab: daysStatus;
  isCalendarVisible: boolean;
  onPressDaysStatusTab: (tab: daysStatus) => void;
  onPressHeaderIcon: () => void;
  onPressAmountStatusTab: (tab: AmountStatus) => void;
};

const ClaimsHistoryView: React.FC<HomeViewProps> = ({
  data,
  amountStatusTab,
  daysStatusTab,
  onPressDaysStatusTab,
  onPressAmountStatusTab,
  isCalendarVisible,
  onPressHeaderIcon,
}) => {
  console.log(data, 'data');
  return (
    <View style={styles.claimHistoryContainer}>
      <View style={styles.header}>
        <TopView
          title="Claims History"
          HeaderSecondIcon={icons.search}
          HeaderIcon={icons.calender}
          onPressBack={() => console.log('Back Pressed')}
          onPressHeaderIcon={onPressHeaderIcon}
        />
      </View>

      <CurvedView>
        <View style={styles.infoContainer}>
          <View style={styles.infoContainerTop}>
            <TouchableOpacity
              onPress={() => onPressAmountStatusTab('paid Amount')}
              style={
                amountStatusTab === 'paid Amount'
                  ? styles.leftButtonActive
                  : styles.leftButton
              }>
              <Image
                source={
                  amountStatusTab === 'paid Amount'
                    ? icons.payment
                    : icons.paymentInactive
                }
              />

              <AileronBold
                name="Paid Amount"
                numberOfLines={1}
                style={
                  amountStatusTab === 'paid Amount'
                    ? style.buttonTextActive
                    : style.buttonText
                }
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => onPressAmountStatusTab('Pending Amount')}
              style={
                amountStatusTab === 'Pending Amount'
                  ? styles.rightButtonActive
                  : styles.leftButton
              }>
              <Image source={icons.creditCard} />
              <AileronBold
                name="Pending Amount"
                numberOfLines={1}
                style={
                  amountStatusTab === 'Pending Amount'
                    ? style.buttonTextActive
                    : style.buttonText
                }
              />
            </TouchableOpacity>
          </View>

          <View style={styles.infoContainerSecondTop}>
            <TouchableOpacity
              onPress={() => onPressDaysStatusTab('Daily')}
              style={
                daysStatusTab === 'Daily'
                  ? styles.activeButton
                  : styles.inActiveButton
              }>
              <AileronBold
                name="Daily"
                numberOfLines={1}
                style={
                  daysStatusTab === 'Daily'
                    ? style.buttonTextActive
                    : style.buttonText
                }
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={
                daysStatusTab === 'Monthly'
                  ? styles.activeButton
                  : styles.inActiveButton
              }
              onPress={() => onPressDaysStatusTab('Monthly')}>
              <AileronBold
                name="Monthly"
                numberOfLines={1}
                style={
                  daysStatusTab === 'Monthly'
                    ? style.buttonTextActive
                    : style.buttonText
                }
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={
                daysStatusTab === 'Yearly'
                  ? styles.activeButton
                  : styles.inActiveButton
              }
              onPress={() => onPressDaysStatusTab('Yearly')}>
              <AileronBold
                name="Yearly"
                numberOfLines={1}
                style={
                  daysStatusTab === 'Yearly'
                    ? style.buttonTextActive
                    : style.buttonText
                }
              />
            </TouchableOpacity>
          </View>

          <FlatList
            data={data}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({item}) => <DetailsContainer data={item} />}
          />
        </View>
      </CurvedView>

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
              height: vh * 70, // more screen coverage
              paddingHorizontal: vw * 4,
              paddingBottom: vh * 2,
            }}
            dayComponent={({date, state}) => {
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
              style={styles.cancelButton}
              onPress={onPressHeaderIcon}>
              <AileronBold name={'Cancel'}> </AileronBold>
            </TouchableOpacity>

            <LinearGradient colors={COLORS.activeButtonGradient}>
              {' '}
              <TouchableOpacity
                style={styles.applyButton}
                onPress={() => console.log('Apply pressed')}>
                <AileronBold name={'Select'}> </AileronBold>
              </TouchableOpacity>{' '}
            </LinearGradient>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ClaimsHistoryView;

const style = StyleSheet.create({
  buttonTextActive: {
    color: COLORS.white,
    fontSize: vh * 2,
  },
  buttonText: {
    color: COLORS.textGrayShade,
    fontSize: vh * 2,
  },
  cardText: {
    fontSize: vh * 2,
  },
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
    fontSize: 18,
    textAlign: 'center',
  },
  daysSection: {
    fontSize: vh * 2,
    paddingVertical: vh * 2,
    paddingHorizontal: vw * 2,
  },
});
