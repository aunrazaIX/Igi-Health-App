import {View, Text} from 'react-native';
import React from 'react';
import LodgeClaimView from '../../views/LodgeClaimView';
import useLodgeClaimViewModel from '../../viewmodels/useLodgeClaimViewModel';

const PriorApproval = () => {
  const {states, functions} = useLodgeClaimViewModel();
  const {steps, personalData, claimsDetails} = states;
  const {goBack} = functions;
  return (
    <LodgeClaimView
      goBack={goBack}
      steps={steps}
      personalData={personalData}
      claimsDetails={claimsDetails}
    />
  );
};

export default PriorApproval;
