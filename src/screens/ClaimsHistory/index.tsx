import {View, Text} from 'react-native';
import React from 'react';
import ClaimsHistoryView from '../../views/ClaimsHistoryView';
import useClaimsHistoryViewModel from '../../viewmodels/useClaimsHistoryViewModel';

const ClaimsHistory = () => {
  const {states, functions} = useClaimsHistoryViewModel();
  const {
    data,
    amountStatusTab,
    daysStatusTab,
    isCalendarVisible,
    claimDataLoading,
  } = states;
  const {
    onPressAmountStatusTab,
    onPressDaysStatusTab,
    onPressHeaderIcon,
    goBack,
  } = functions;

  return (
    <ClaimsHistoryView
      data={data}
      amountStatusTab={amountStatusTab}
      daysStatusTab={daysStatusTab}
      isCalendarVisible={isCalendarVisible}
      onPressHeaderIcon={onPressHeaderIcon}
      onPressDaysStatusTab={onPressDaysStatusTab}
      onPressAmountStatusTab={onPressAmountStatusTab}
      goBack={goBack}
      claimDataLoading={claimDataLoading}
    />
  );
};

export default ClaimsHistory;
