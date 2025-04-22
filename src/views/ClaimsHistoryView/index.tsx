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

import {
  ClaimHistory,
  AmountStatus,
  daysStatus,
} from '../../viewmodels/useClaimsHistoryViewModel';
import LinearGradient from 'react-native-linear-gradient';
import Calender from './Component/Calender';

type claimsHistoryViewProps = {
  data: ClaimHistory[][];
  amountStatusTab: AmountStatus;
  daysStatusTab: daysStatus;
  isCalendarVisible: boolean;
  onPressDaysStatusTab: (tab: daysStatus) => void;
  onPressHeaderIcon: () => void;
  onPressAmountStatusTab: (tab: AmountStatus) => void;
};

const ClaimsHistoryView: React.FC<claimsHistoryViewProps> = ({
  data,
  amountStatusTab,
  daysStatusTab,
  onPressDaysStatusTab,
  onPressAmountStatusTab,
  isCalendarVisible,
  onPressHeaderIcon,
}) => {
  return (
    <View style={styles.claimHistoryContainer}>
      <View style={styles.header}>
        <TopView
          title="Claims History"
          containerStyle={styles.containerStyle}
          HeaderSecondIcon={icons.searchWhite}
          HeaderIcon={icons.calender}
          onPressBack={() => console.log('Back Pressed')}
          onPressHeaderIcon={onPressHeaderIcon}
        />
      </View>

      <CurvedView>
        <View style={styles.infoContainer}>
          <View style={styles.infoContainerTop}>
            <TouchableOpacity
              onPress={() => onPressAmountStatusTab('paidAmount')}
              style={
                amountStatusTab === 'paidAmount'
                  ? styles.buttonActive
                  : styles.button
              }>
              <Image
                source={
                  amountStatusTab === 'paidAmount'
                    ? icons.payment
                    : icons.paymentInactive
                }
              />

              <AileronBold
                name="Paid Amount"
                numberOfLines={1}
                style={
                  amountStatusTab === 'paidAmount'
                    ? styles.buttonTextActive
                    : styles.buttonText
                }
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => onPressAmountStatusTab('PendingAmount')}
              style={
                amountStatusTab === 'PendingAmount'
                  ? styles.buttonActive
                  : styles.button
              }>
              <Image source={icons.creditCard} />
              <AileronBold
                name="Pending Amount"
                numberOfLines={1}
                style={
                  amountStatusTab === 'PendingAmount'
                    ? styles.buttonTextActive
                    : styles.buttonText
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
                    ? styles.buttonTextActive
                    : styles.infoContainerSecondTopButtonText
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
                    ? styles.buttonTextActive
                    : styles.infoContainerSecondTopButtonText
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
                    ? styles.buttonTextActive
                    : styles.infoContainerSecondTopButtonText
                }
              />
            </TouchableOpacity>
          </View>

          {}
          <FlatList
            data={data}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({item}) => <DetailsContainer data={item} />}
          />
        </View>
      </CurvedView>

      {isCalendarVisible && (
        <Calender
          onPressHeaderIcon={onPressHeaderIcon}
          isCalendarVisible={isCalendarVisible}
        />
      )}
    </View>
  );
};

export default ClaimsHistoryView;
