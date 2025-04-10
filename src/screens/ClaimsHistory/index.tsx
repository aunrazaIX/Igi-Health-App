import {View, Text} from 'react-native';
import React from 'react';
import ClaimsHistoryView from '../../views/ClaimsHistoryView';
import useClaimsHistoryViewModel from '../../viewmodels/useClaimsHistoryViewModel';

const ClaimsHistory = () => {
  const {states} = useClaimsHistoryViewModel();
  const {data} = states;

  return <ClaimsHistoryView data={data} />;
};

export default ClaimsHistory;
