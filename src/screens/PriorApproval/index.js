import React from 'react';
import usePriorApprovalViewModel from '../../viewmodels/usePriorApprovalViewModel';
import PriorApprovalView from '../../views/PriorApprovalView';

const PriorApproval = ({navigation, route}) => {
  const { states, functions } = usePriorApprovalViewModel({navigation, route});
  const { 
    steps,
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
    isView,
    viewIndex,
    showOptionModal,} = states;
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
    onSelectMaternityType,
    handleDeleteClaim,
    setConfirmationType,
    onPressSubmitClaim,
    handleDeleteFile,
    handleBackButton,
    handleGOBack,
    onView,
    setIsView,
    viewOptionModal,
    openCamera,
    uploadDocument, } = functions;
  return (
    <PriorApprovalView
   goBack={goBack}
      steps={steps}
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
      dependantLoading={dependantLoading}
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
      handleBackButton={handleBackButton}
      handleGOBack={handleGOBack}
      isView={isView}
      onView={onView}
      setIsView={setIsView}
      viewIndex={viewIndex}
      showOptionModal={showOptionModal}
      viewOptionModal={viewOptionModal}
      uploadDocument={uploadDocument}
    />
  );
};

export default PriorApproval;
