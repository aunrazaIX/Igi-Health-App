import React from 'react';
import usePriorApprovalHistoryViewModel from '../../viewmodels/usePriorApprovalHistoryViewModel';
import PriorApprovalHistoryView from '../../views/PriorApprovalHistoryVIew';

const PriorApprovalHistory = () => {
  const {states, functions} = usePriorApprovalHistoryViewModel();
  const {
    data,
    claimDataLoading,
    type,
    showRemarks,
    remarks,
    getHeadingSubHeading,
    isInProcessAllowed,
  } = states;
  const {goBack, onPressType, onCloseRemarksModal} = functions;
  return (
    <PriorApprovalHistoryView
      data={data}
      goBack={goBack}
      onPressType={onPressType}
      onCloseRemarksModal={onCloseRemarksModal}
      type={type}
      showRemarks={showRemarks}
      remarks={remarks}
      getHeadingSubHeading={getHeadingSubHeading}
      claimDataLoading={claimDataLoading}
      isInProcessAllowed={isInProcessAllowed}
    />
  );
};

export default PriorApprovalHistory;
