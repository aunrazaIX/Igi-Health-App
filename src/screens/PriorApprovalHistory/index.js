import React from 'react';
import usePriorApprovalHistoryViewModel from '../../viewmodels/usePriorApprovalHistoryViewModel';
import PriorApprovalHistoryView from '../../views/PriorApprovalHistoryVIew';

const PriorApprovalHistory = () => {
  const {states, functions} = usePriorApprovalHistoryViewModel();
  const {data, claimDataLoading, type, showRemarks, remarks, searchText} =
    states;
  const {goBack, onCloseRemarksModal, setSearchText} = functions;
  return (
    <PriorApprovalHistoryView
      data={data}
      goBack={goBack}
      onCloseRemarksModal={onCloseRemarksModal}
      type={type}
      showRemarks={showRemarks}
      remarks={remarks}
      claimDataLoading={claimDataLoading}
      searchText={searchText}
      setSearchText={setSearchText}
    />
  );
};

export default PriorApprovalHistory;
