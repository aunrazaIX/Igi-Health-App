import React from 'react';
import ClaimsHistoryView from '../../views/ClaimsHistoryView';
import useClaimsHistoryViewModel from '../../viewmodels/useClaimsHistoryViewModel';

const ClaimsHistory = () => {
  const {states, functions} = useClaimsHistoryViewModel();
  const {data, claimDataLoading, type} = states;
  const {goBack, onPressType} = functions;
  return (
    <ClaimsHistoryView
      data={data}
      goBack={goBack}
      onPressType={onPressType}
      type={type}
      claimDataLoading={claimDataLoading}
    />
  );
};

export default ClaimsHistory;
