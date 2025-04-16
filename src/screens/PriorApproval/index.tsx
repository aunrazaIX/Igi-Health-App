import React from 'react'
import PriorApprovalView from '../../views/PriorApprovalView'
import patientDetailsViewModal from '../../viewmodels/usePatientsDetailsViewModel';
import patientSelectViewModal from '../../viewmodels/usePatientSelectViewModel';



const PriorApproval = () => {
  const { states } = patientDetailsViewModal();
  const { state } = patientSelectViewModal()

  const { data } = states;
  const { selectData } = state
  return (
    <PriorApprovalView data={data} selectData={selectData} />
  )
}

export default PriorApproval