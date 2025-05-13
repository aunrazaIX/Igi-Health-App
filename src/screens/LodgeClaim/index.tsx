import React from 'react';
import LodgeClaimView from '../../views/LodgeClaimView';
import useLodgeClaimViewModel from '../../viewmodels/useLodgeClaimViewModel';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';

type RootStackParamList = {
  LodgeClaim: {
    treatments?: any[];
    stepFromTreatment?: number;
  };
};

type LodgeClaimProps = {
  navigation: StackNavigationProp<RootStackParamList, 'LodgeClaim'>;
  route: RouteProp<RootStackParamList, 'LodgeClaim'>;
};

const LodgeClaim: React.FC<LodgeClaimProps> = ({navigation, route}) => {
  const {states, functions} = useLodgeClaimViewModel({navigation, route});

  const {
    steps,
    personalData,
    claimsDetails,
    patientOptions,
    dependants,
    currentStep,
    selectedPatient,
  } = states;

  const {
    goBack,
    navigateTreatment,
    onPressNext,
    onPressDelete,
    onPressStep,
    onSelectPatient,
  } = functions;

  return (
    <LodgeClaimView
      goBack={goBack}
      steps={steps}
      personalData={personalData}
      dependants={dependants}
      claimsDetails={claimsDetails}
      selectedPatient={selectedPatient}
      onPressStep={onPressStep}
      currentStep={currentStep}
      onPressDelete={onPressDelete}
      onPressNext={onPressNext}
      patientOptions={patientOptions}
      navigateTreatment={navigateTreatment}
      onSelectPatient={onSelectPatient}
    />
  );
};

export default LodgeClaim;
