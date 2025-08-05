import React from 'react';
import ClaimsHistoryView from '../../views/ClaimsHistoryView';
import useClaimsHistoryViewModel from '../../viewmodels/useClaimsHistoryViewModel';

const ClaimsHistory = () => {
  const {states, functions} = useClaimsHistoryViewModel();
  const {
    data,
    claimDataLoading,
    type,
    showRemarks,
    remarks,
    getHeadingSubHeading,
  } = states;
  const {goBack, onPressType, onCloseRemarksModal} = functions;
  return (
    <ClaimsHistoryView
      data={data}
      goBack={goBack}
      onPressType={onPressType}
      onCloseRemarksModal={onCloseRemarksModal}
      type={type}
      showRemarks={showRemarks}
      remarks={remarks}
      getHeadingSubHeading={getHeadingSubHeading}
      claimDataLoading={claimDataLoading}
    />
  );
};

export default ClaimsHistory;
