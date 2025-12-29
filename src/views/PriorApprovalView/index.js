import React from 'react';
import {
  Button,
  ConfirmationModal,
  CurvedView,
  Stepper,
  TopView,
} from '../../components';
import {
  Claim,
  PersonalDetails,
  UploadDoc,
} from '../PriorApprovalView/components';
import {icons} from '../../assets';
import {COLORS} from '../../assets/theme/colors';
import ModalLoading from '../../components/ModalLoading';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useNavigation} from '@react-navigation/native';
import {vh} from '../../assets/theme/dimension';
import {useSelector} from 'react-redux';
import ImageModal from '../PriorApprovalView/components/ImageModal';
import styles from './style';

const PriorApprovalView = ({
  steps,
  claimsDetails,
  dependants,
  currentStep,
  goBack,
  navigateTreatment,
  onPressNext,
  onPressDelete,
  onPressEdit,
  onPressStep,
  onSelectPatient,
  selectedDocuments,
  selectedPatient,
  dependantLoading,
  uploadLoading,
  handleCancelFile,
  handleConfirm,
  confirmationModal,
  setConfirmationModal,
  resetStates,
  claimData,
  setterForclaimData,
  claimLoading,
  type,
  personalDetailsLoading,
  onSelectType,
  selectedType,
  hospitalList,
  onSelectHospital,
  selectedHospital,
  confirmationType,
  isView,
  onView,
  setIsView,
  viewIndex,
  showOptionModal,
  viewOptionModal,
  uploadDocument,
}) => {
  const lodgeState = useSelector(state => state?.lodge || {});
  const activeModule = lodgeState?.activeModule;
  const moduleData = lodgeState?.modules?.[activeModule] || {};
  const treatment = moduleData?.treatments || [];
  const doc = moduleData?.selectedDocuments || [];

  const renderStep = {
    personalDetails: (
      <PersonalDetails
        selectedPatient={selectedPatient}
        selectedType={selectedType}
        onSelectPatient={onSelectPatient}
        dependants={dependants}
        onSelectType={onSelectType}
        hospitalList={hospitalList}
        onSelectHospital={onSelectHospital}
        selectedHospital={selectedHospital}
        type={type}
        dependantLoading={dependantLoading}
      />
    ),
    claim: (
      <Claim
        onPressDelete={onPressDelete}
        onPressEdit={onPressEdit}
        claimsDetails={claimsDetails}
        navigateTreatment={navigateTreatment}
        currentStep={currentStep}
        selectedType={selectedType}
      />
    ),
    uploadDoc: (
      <UploadDoc
        selectedDocuments={selectedDocuments}
        handleCancelFile={handleCancelFile}
        claimData={claimData}
        setterForclaimData={setterForclaimData}
        onView={onView}
        showOptionModal={showOptionModal}
        viewOptionModal={viewOptionModal}
        uploadDocument={uploadDocument}
      />
    ),
  };

  const navigation = useNavigation();

  return (
    <>
      <TopView
        containerStyleIcon={styles.addTreatment}
        tintColrorForTopViewFirstIcon={COLORS.white}
        FirstOpenModal={navigateTreatment}
        onPressBack={goBack}
        title={'Prior Approval'}
        resetStates={resetStates}
      />
      <KeyboardAwareScrollView>
        <CurvedView containerStyle={styles.curveStyle}>
          <Stepper
            currentStep={currentStep}
            steps={steps}
            onPressStep={onPressStep}
            componentList={renderStep}
          />

          {(currentStep === 2 && selectedType?.label === 'OPD - Outpatient') ||
          (currentStep === 2 && claimsDetails?.length < 1) ||
          (type === 'priorApproval' && currentStep === 2) ? (
            <Button
              containerStyle={{marginBottom: vh}}
              onPress={navigateTreatment}
              name={
                treatment.length > 0
                  ? type === 'priorApproval'
                    ? 'Add More Treatment'
                    : 'Create More Claim'
                  : type === 'priorApproval'
                  ? 'Add Treatment'
                  : 'Create Claim'
              }
            />
          ) : null}

          <Button
            containerStyle={
              currentStep === 1
                ? styles.personalButton
                : currentStep === 2
                ? styles.claimButton
                : currentStep === 3
                ? styles.uploadButton
                : undefined
            }
            disabled={
              claimLoading
                ? true
                : currentStep === 1
                ? !selectedPatient
                  ? true
                  : false
                : currentStep === 2
                ? claimsDetails?.length > 0
                  ? false
                  : true
                : currentStep === 3 &&
                  selectedDocuments?.length > 0 &&
                  claimData.claimComments?.length > 0
                ? false
                : true
            }
            onPress={onPressNext}
            name={currentStep === 3 ? 'Submit' : 'Next'}
          />
        </CurvedView>
      </KeyboardAwareScrollView>
      <ModalLoading
        loading={uploadLoading || claimLoading || personalDetailsLoading}
      />

      <ConfirmationModal
        show={confirmationModal}
        message={
          confirmationType === 'delete'
            ? 'Are you sure you want to delete?'
            : confirmationType === 'success' &&
              'Thank you for submitting your request. \n\n Note: Your request has been submitted successfully. It may take up to 24 hours to process. Our team will contact you if any issues arise. You can track the status in the Prior Approval History section, and you will also receive an in-app notification once it is finalized.'
        }
        type={confirmationType}
        onCancel={() => {
          setConfirmationModal(false);
          confirmationType === 'success' && goBack();
        }}
        onConfirm={handleConfirm}
      />

      {isView && (
        <ImageModal
          image={doc[viewIndex].uri}
          onClose={() => setIsView(false)}
        />
      )}
    </>
  );
};

export default PriorApprovalView;
