import React from 'react';
import {
  AileronBold,
  Button,
  ConfirmationModal,
  CurvedView,
  Stepper,
  TopView,
} from '../../components';
import {Claim, PersonalDetails, UploadDoc} from '../PriorApprovalView/components';
import {icons, images} from '../../assets';
import {COLORS} from '../../assets/theme/colors';
import ModalLoading from '../../components/ModalLoading';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useNavigation} from '@react-navigation/native';
import {vh} from '../../assets/theme/dimension';
import {useSelector} from 'react-redux';
import ImageModal from '../PriorApprovalView/components/ImageModal';
import { View } from 'react-native';
import styles from './style';

const PriorApprovalView = ({
  steps,
  claimsDetails,
  dependantsData,
  dependants,
  currentStep,
  goBack,
  navigateTreatment,
  pickFile,
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
  confirmationModal,
  setConfirmationModal,
  resetStates,
  claimData,
  setterForclaimData,
  claimLoading,
  type,
  personalDetails,
  personalDetailsLoading,
  onSelectType,
  deletedIndex,
  selectedType,
  selectedMaternityType,
  hospitalList,
  onSelectHospital,
  selectedHospital,
  confirmationType,
  handleDeleteClaim,
  setConfirmationType,
  onPressSubmitClaim,
  handleDeleteFile,
  deletedFileIndex,
  handleBackButton,
  handleGOBack,
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
        patientOptions={dependantsData}
        dependants={dependants}
        personalDetails={personalDetails}
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
        // TopViewFirstIcon={
        //   (currentStep === 2 && selectedType?.value === 1) ||
        //   (currentStep === 2 && claimsDetails?.length < 1) ||
        //   (type === 'priorApproval' && currentStep === 2)
        //     ? icons.addSquare
        //     : null
        // }

        containerStyleIcon={styles.addTreatment}
        tintColrorForTopViewFirstIcon={COLORS.white}
        FirstOpenModal={navigateTreatment}
        onPressBack={ goBack
        }
        title={'Prior Approval'}
        resetStates={resetStates}
      />
      <KeyboardAwareScrollView
      // showsVerticalScrollIndicator={false}
      >
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

          {/* {currentStep === 2 || currentStep === 3 ? (
            <Button
              containerStyle={{marginBottom: vh}}
              onPress={handleBackButton}
              name="Back"
            />
          ) : null} */}

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

      {/* <ConfirmationModal
        ConfirmationModalVisible={confirmationModal}
        setConfirmationModalVisible={setConfirmationModal}
        frameImage={
          ['back', 'delete', 'submit'].includes(confirmationType)
            ? icons.ModalSuccessfull
            : icons.modelSuccessful
        }
        confirmationMessage={
          confirmationType === 'delete'
            ? 'Are you sure you want to delete this treatment?'
            : confirmationType === 'submit'
            ? 'Are you sure you want to submit this claim?'
            : confirmationType === 'fileDelete'
            ? 'Are you sure you want to delete this file?'
            : confirmationType === 'back'
            ? 'Going back will return you to the home screen. Do you want to continue?'
            : `Thank you for submitting your ${
                type === 'priorApproval' ? 'request' : 'claim'
              }. ${
                type !== 'priorApproval'
                  ? 'You will soon receive a confirmation email.'
                  : '\n\n Note: Your request has been submitted successfully. It may take up to 24 hours to process. Our team will contact you if any issues arise. You can track the status in the Prior Approval History section, and you will also receive an in-app notification once it is finalized.'
              }`
        }
        claimSubmission={
          confirmationType === 'delete'
            ? false
            : confirmationType === 'submit'
            ? false
            : confirmationType === 'fileDelete'
            ? false
            : confirmationType === 'back'
            ? false
            : true
        }
        deleteButton={
          confirmationType === 'delete'
            ? true
            : confirmationType === 'fileDelete'
            ? true
            : confirmationType === 'back'
            ? true
            : false
        }
        type={type}
        submitButton={confirmationType === 'submit' ? true : false}
        closeButton={
          confirmationType === 'delete'
            ? false
            : confirmationType === 'submit'
            ? false
            : confirmationType === 'fileDelete'
            ? false
            : confirmationType === 'back'
            ? false
            : true
        }
        confirmationRequired={
          confirmationType === 'delete' ||
          confirmationType === 'submit' ||
          confirmationType === 'fileDelete' ||
          confirmationType === 'back'
            ? true
            : false
        }
        CloseButtonText={'Continue To Login'}
        onClose={() => {
          resetStates();
          navigation.navigate('HomeStack');
        }}
        confirmationType={confirmationType}
        handleDelete={
          confirmationType === 'delete'
            ? () => handleDeleteClaim(deletedIndex)
            : confirmationType === 'fileDelete'
            ? () => handleDeleteFile(deletedFileIndex)
            : confirmationType === 'back'
            ? () => goBack()
            : null
        }
        claimLoading={claimLoading}
        handleSubmit={
          confirmationType === 'submit'
            ? () => {
                onPressSubmitClaim();
              }
            : null
        }
      /> */}

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
