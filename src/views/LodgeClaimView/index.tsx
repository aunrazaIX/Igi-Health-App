import React from 'react';
import {
  Button,
  ConfirmationModal,
  CurvedView,
  Stepper,
  TopView,
} from '../../components';
import {Claim, PersonalDetails, UploadDoc} from './components';
import {
  ClaimDetailSection,
  PersonelDataSection,
  PatientList,
  StepItem,
  DependantList,
} from './typeInterface';
import {icons, images} from '../../assets';
import {COLORS} from '../../assets/theme/colors';
import ModalLoading from '../../components/ModalLoading';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useNavigation} from '@react-navigation/native';
import styles from './styles';
import {vh} from '../../assets/theme/dimension';
import {useSelector} from 'react-redux';
import ImageModal from './components/ImageModal';

type LodgeClaimViewProps = {
  steps: StepItem[];
  dependantsData: DependantList[];
  claimsDetails: ClaimDetailSection[] | undefined;
  goBack: () => void;
  patientOptions: PatientList[];
  navigateTreatment: () => void;
  pickFile?: () => void; // Optional if not always passed
  currentStep: number;
  onPressNext: () => void;
  onPressDelete: (index: number) => void;
  onPressEdit: (data: object, index: number) => void;
  onPressStep: (index: number) => void;
  selectedPatient: any; // You can replace 'any' with a specific patient type
  onSelectPatient: (option: any) => void; // Replace `any` with correct type if known
  handleCancelFile: (item: any, index: number) => void;
  confirmationModal: boolean;
  setConfirmationModal: () => void;
  resetStates: () => void;
  claimData: any;
  setterForclaimData: any;
  onSelectHospital: (option: any) => void;
  personalDetails: any;
  personalDetailsLoading: any;
  dependantLoading: any;
  dependants: any;
  onSelectType: () => void;
  selectedType: any;
  maternityTypeData: any;
  selectedMaternityType: any;
  onSelectHospital: () => void;
  selectedHospital: any;
  hospitalList: any;
  confirmationType: any;
  handleDeleteClaim: any;
  deletedIndex: any;
  setConfirmationType: any;
  onPressSubmitClaim: any;
  handleDeleteFile: any;
  deletedFileIndex: any;
  handleBackButton: any;
  handleGOBack: any;
  isView: any;
  onView: any;
  setIsView: any;
  viewIndex: any;
  showOptionModal: boolean;
  viewOptionModal: () => void;
};

const LodgeClaimView: React.FC<LodgeClaimViewProps> = ({
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
  onSelectDocument,
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
  openCamera,
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
        onSelectDocument={onSelectDocument}
        handleCancelFile={handleCancelFile}
        claimData={claimData}
        setterForclaimData={setterForclaimData}
        onView={onView}
        showOptionModal={showOptionModal}
        viewOptionModal={viewOptionModal}
        openCamera={openCamera}
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
        onPressBack={
          type === 'priorApproval' || 'lodgeClaim' ? handleGOBack : goBack
        }
        title={type === 'priorApproval' ? 'Prior Approval' : 'Lodge A Claim'}
        titleStyle={{lineHeight: vh * 3}}
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
              name={treatment.length > 0 ? 'Create More Claim' : 'Create Claim'}
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

      <ConfirmationModal
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
            : 'Thank you for submitting your claims. You will soon receive a confirmation email with updates on the progress of your claims.'
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
          confirmationType === 'delete'
            ? true
            : confirmationType === 'fileDelete'
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

export default LodgeClaimView;
