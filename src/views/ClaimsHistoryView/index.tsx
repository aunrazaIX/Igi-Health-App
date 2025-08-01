import {View, Image, FlatList, TouchableOpacity} from 'react-native';
import React from 'react';
import {styles} from './style';
import TopView from '../../components/TopView';
import {icons} from '../../assets';
import {AileronBold, CurvedView} from '../../components';
import DetailsContainer from '../../components/DetailsContainer';

import {
  ClaimHistory,
  AmountStatus,
  daysStatus,
  ClaimHistoryGroup,
} from '../../viewmodels/useClaimsHistoryViewModel';
import Calender from './Component/Calender';
import NoDataView from '../../components/NoDataView';
import ModalLoading from '../../components/ModalLoading';
import SimpleLoader from '../../components/SimpleLoader';
import {COLORS} from '../../assets/theme/colors';
import {vh} from '../../assets/theme/dimension';

type claimsHistoryViewProps = {
  data: ClaimHistoryGroup[];
  amountStatusTab: AmountStatus;
  daysStatusTab: daysStatus;
  isCalendarVisible: boolean;
  onPressDaysStatusTab: (tab: daysStatus) => void;
  onPressHeaderIcon: () => void;
  onPressAmountStatusTab: (tab: AmountStatus) => void;
  goBack: () => void;
  claimDataLoading: boolean;
};

const ClaimsHistoryView: React.FC<claimsHistoryViewProps> = ({
  data,
  amountStatusTab,
  daysStatusTab,
  onPressDaysStatusTab,
  onPressAmountStatusTab,
  isCalendarVisible,
  onPressHeaderIcon,
  claimDataLoading,
  goBack,
}) => {
  return (
    <>
      <TopView title="Claims History" SecondOpenModal={onPressHeaderIcon} />
      <CurvedView>
        <View>
          {/* <View style={styles.infoContainerTop}>
            <TouchableOpacity
              onPress={() => onPressAmountStatusTab('paidAmount')}
              style={
                amountStatusTab === 'paidAmount'
                  ? styles.buttonActive
                  : styles.button
              }>
              <Image
                style={styles.paidAmountIcon}
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
              <Image style={styles.paidAmountIcon} source={icons.creditCard} />
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
          </View> */}
          {/* <View style={styles.infoContainerSecondTop}>
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
          </View> */}

          {(data && data.length > 0) || claimDataLoading ? (
            <FlatList
              contentContainerStyle={{
                paddingBottom: vh * 15,
                paddingTop: vh * 2,
              }}
              data={data}
              keyExtractor={(_, index) => index.toString()}
              renderItem={({item, index}) => (
                <DetailsContainer
                  key={index}
                  headerIcon={
                    item?.ClaimStatus === '8'
                      ? icons.claimPaid
                      : item?.ClaimStatus === '3'
                      ? icons.rejected
                      : icons.pending
                  }
                  patientName={item.RelationName}
                  data={item}
                />
              )}
            />
          ) : (
            <NoDataView name="No Claim Found" />
          )}
        </View>

        {/* <ModalLoading loading={claimDataLoading} />
         */}

        {claimDataLoading && <SimpleLoader color={COLORS.cardBackgroundRed} />}
      </CurvedView>

      {/* {isCalendarVisible && (
        <Calender
          onPressHeaderIcon={onPressHeaderIcon}
          isCalendarVisible={isCalendarVisible}
        />
      )} */}
    </>
  );
};

export default ClaimsHistoryView;
