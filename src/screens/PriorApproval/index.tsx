import React from 'react';
import PriorApprovalView from '../../views/PriorApprovalView';
import patientDetailsViewModal from '../../viewmodels/usePatientsDetailsViewModel';
import patientSelectViewModal from '../../viewmodels/usePatientSelectViewModel';

const PriorApproval = () => {
  const {states , functions} = patientDetailsViewModal();
  const {state} = patientSelectViewModal();

  const {goBack} = functions
  const {data} = states;
  const {selectData} = state;
  return <PriorApprovalView goBack={goBack} data={data} selectData={selectData} />;
};

export default PriorApproval;
