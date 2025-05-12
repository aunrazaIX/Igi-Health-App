import React from 'react';
import LodgeClaimView from '../../views/LodgeClaimView';
import useLodgeClaimViewModel from '../../viewmodels/useLodgeClaimViewModel';

const LodgeClaim = () => {
  const {states, functions} = useLodgeClaimViewModel();
  const {steps, personalData, claimsDetails, patientOptions, dependants} =
    states;
  const {goBack, navigateTreatment, pickFile} = functions;
  return (
    <LodgeClaimView
      goBack={goBack}
      steps={steps}
      personalData={personalData}
      dependants={dependants}
      claimsDetails={claimsDetails}
      patientOptions={patientOptions}
      navigateTreatment={navigateTreatment}
      pickFile={pickFile}
    />
  );
};

export default LodgeClaim;
