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

type LodgeClaimViewProps = {
  steps: StepItem[];
  personalData: PersonelDataSection[];
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
};

const LodgeClaimView: React.FC<LodgeClaimViewProps> = ({
  steps,
  personalData,
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
}) => {
  const renderStep = {
    personalDetails: (
      <PersonalDetails
        selectedPatient={selectedPatient}
        selectedType={selectedType}
        onSelectPatient={onSelectPatient}
        personalData={personalData}
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
        onPressBack={goBack}
        title={type === 'priorApproval' ? 'Prior Approval' : 'Lodge Claim'}
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

          {(currentStep === 2 && selectedType?.value === 1) ||
          (currentStep === 2 && claimsDetails?.length < 1) ||
          (type === 'priorApproval' && currentStep === 2) ? (
            <Button
              containerStyle={{marginBottom: vh}}
              onPress={navigateTreatment}
              name="Add a Claim"
            />
          ) : null}

          <Button
            disabled={
              currentStep === 1
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
        frameImage={icons.modelSuccessful}
        confirmationMessage={
          confirmationType === 'delete'
            ? 'Are you sure you want to delete this treatment?'
            : confirmationType === 'submit'
            ? 'Are you sure you want to submit this claim?'
            : confirmationType === 'fileDelete'
            ? 'Are you sure you want to delete this file?'
            : 'Thank you for submitting your claims. You will soon receive a confirmation email with updates on the progress of your claims.'
        }
        claimSubmission={
          confirmationType === 'delete'
            ? false
            : confirmationType === 'submit'
            ? false
            : confirmationType === 'fileDelete'
            ? false
            : true
        }
        deleteButton={
          confirmationType === 'delete'
            ? true
            : confirmationType === 'fileDelete'
            ? true
            : false
        }
        submitButton={confirmationType === 'submit' ? true : false}
        closeButton={
          confirmationType === 'delete'
            ? false
            : confirmationType === 'submit'
            ? false
            : confirmationType === 'fileDelete'
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
          resetStates;
          navigation.navigate('HomeStack');
        }}
        confirmationType={confirmationType}
        handleDelete={
          confirmationType === 'delete'
            ? () => handleDeleteClaim(deletedIndex)
            : confirmationType === 'fileDelete'
            ? () => handleDeleteFile(deletedFileIndex)
            : null
        }
        handleSubmit={
          confirmationType === 'submit'
            ? () => {
                onPressSubmitClaim();
              }
            : null
        }
      />
    </>
  );
};

export default LodgeClaimView;
