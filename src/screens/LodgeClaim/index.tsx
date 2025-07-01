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
    selectedDocuments,
    dependantLoading,
    dependantsData,
    uploadLoading,
    confirmationModal,
    claimData,
    claimLoading,
    type,
    personalDetails,
    personalDetailsLoading,
    selectedType,
    hospitalList,
    selectedHospital,
    confirmationType,
    deletedIndex,
    deletedFileIndex,
  } = states;

  const {
    goBack,
    navigateTreatment,
    onPressNext,
    onPressDelete,
    onPressEdit,
    onPressStep,
    onSelectPatient,
    onSelectDocument,
    handleCancelFile,
    setConfirmationModal,
    resetStates,
    setterForclaimData,
    onSelectHospital,
    onSelectType,
    onSelectMaternityType,
    handleDeleteClaim,
    setConfirmationType,
    onPressSubmitClaim,
    handleDeleteFile,
  } = functions;

  return (
    <LodgeClaimView
      goBack={goBack}
      steps={steps}
      personalData={personalData}
      dependantsData={dependantsData}
      claimsDetails={claimsDetails}
      selectedPatient={selectedPatient}
      selectedDocuments={selectedDocuments}
      onPressStep={onPressStep}
      currentStep={currentStep}
      onPressDelete={onPressDelete}
      onPressEdit={onPressEdit}
      onPressNext={onPressNext}
      patientOptions={patientOptions}
      navigateTreatment={navigateTreatment}
      onSelectPatient={onSelectPatient}
      onSelectDocument={onSelectDocument}
      // dependantLoading={dependantLoading}
      uploadLoading={uploadLoading}
      handleCancelFile={handleCancelFile}
      confirmationModal={confirmationModal}
      setConfirmationModal={setConfirmationModal}
      onSelectMaternityType={onSelectMaternityType}
      resetStates={resetStates}
      claimLoading={claimLoading}
      claimData={claimData}
      type={type}
      setterForclaimData={setterForclaimData}
      personalDetails={personalDetails}
      personalDetailsLoading={personalDetailsLoading}
      dependants={dependants}
      onSelectType={onSelectType}
      selectedType={selectedType}
      hospitalList={hospitalList}
      onSelectHospital={onSelectHospital}
      selectedHospital={selectedHospital}
      confirmationType={confirmationType}
      handleDeleteClaim={handleDeleteClaim}
      deletedIndex={deletedIndex}
      setConfirmationType={setConfirmationType}
      onPressSubmitClaim={onPressSubmitClaim}
      handleDeleteFile={handleDeleteFile}
      deletedFileIndex={deletedFileIndex}
    />
  );
};

export default LodgeClaim;
