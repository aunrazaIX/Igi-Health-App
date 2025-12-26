import React from 'react';
import usePriorApprovalViewModel from '../../viewmodels/usePriorApprovalViewModel';
import PriorApprovalView from '../../views/PriorApprovalView';

const PriorApproval = ({navigation, route}) => {
  const {states, functions} = usePriorApprovalViewModel({navigation, route});
  const {
    steps,
    claimsDetails,
    dependants,
    currentStep,
    selectedPatient,
    selectedDocuments,
    dependantLoading,
    uploadLoading,
    confirmationModal,
    claimData,
    claimLoading,
    type,
    personalDetailsLoading,
    selectedType,
    hospitalList,
    selectedHospital,
    confirmationType,
    isView,
    viewIndex,
    showOptionModal,
  } = states;
  const {
    goBack,
    navigateTreatment,
    onPressNext,
    onPressDelete,
    onPressEdit,
    onPressStep,
    onSelectPatient,
    handleCancelFile,
    setConfirmationModal,
    resetStates,
    setterForclaimData,
    onSelectHospital,
    onSelectType,
    setConfirmationType,
    handleBackButton,
    handleGOBack,
    onView,
    setIsView,
    viewOptionModal,
    handleConfirm,
    openCamera,
    uploadDocument,
  } = functions;
  return (
    <PriorApprovalView
      goBack={goBack}
      steps={steps}
      claimsDetails={claimsDetails}
      selectedPatient={selectedPatient}
      selectedDocuments={selectedDocuments}
      onPressStep={onPressStep}
      currentStep={currentStep}
      onPressDelete={onPressDelete}
      onPressEdit={onPressEdit}
      onPressNext={onPressNext}
      navigateTreatment={navigateTreatment}
      onSelectPatient={onSelectPatient}
      dependantLoading={dependantLoading}
      uploadLoading={uploadLoading}
      handleCancelFile={handleCancelFile}
      confirmationModal={confirmationModal}
      setConfirmationModal={setConfirmationModal}
      resetStates={resetStates}
      claimLoading={claimLoading}
      claimData={claimData}
      type={type}
      setterForclaimData={setterForclaimData}
      personalDetailsLoading={personalDetailsLoading}
      dependants={dependants}
      onSelectType={onSelectType}
      selectedType={selectedType}
      hospitalList={hospitalList}
      onSelectHospital={onSelectHospital}
      selectedHospital={selectedHospital}
      confirmationType={confirmationType}
      setConfirmationType={setConfirmationType}
      handleBackButton={handleBackButton}
      handleGOBack={handleGOBack}
      isView={isView}
      onView={onView}
      setIsView={setIsView}
      viewIndex={viewIndex}
      showOptionModal={showOptionModal}
      viewOptionModal={viewOptionModal}
      uploadDocument={uploadDocument}
      handleConfirm={handleConfirm}
    />
  );
};

export default PriorApproval;
