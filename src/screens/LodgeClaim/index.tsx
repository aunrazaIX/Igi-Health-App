import React from 'react';
import LodgeClaimView from '../../views/LodgeClaimView';
import useLodgeClaimViewModel from '../../viewmodels/useLodgeClaimViewModel';

const LodgeClaim = () => {
  const {states, functions} = useLodgeClaimViewModel();
  const {steps, personalData, claimsDetails, patientOptions} = states;
  const {goBack, navigateTreatment} = functions;
  return (
    <LodgeClaimView
      goBack={goBack}
      steps={steps}
      personalData={personalData}
      claimsDetails={claimsDetails}
      patientOptions={patientOptions}
      navigateTreatment={navigateTreatment}
    />
  );
};

export default LodgeClaim;
