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
    searchText,
    tabs,
    selectedStatus,
  } = states;
  const {goBack, onPressType, onCloseRemarksModal, setSearchText, onSelectTab} = functions;
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
      searchText={searchText}
      tabs={tabs}
      selectedStatus={selectedStatus}
      setSearchText={setSearchText}
      onSelectTab={onSelectTab}
    />
  );
};

export default ClaimsHistory;
