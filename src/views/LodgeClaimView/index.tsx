import React from 'react';
import {
  Button,
  ConfirmationModal,
  CurvedView,
  Stepper,
  TopView,
} from '../../components';
import { Claim, PersonalDetails, UploadDoc } from './components';
import {
  ClaimDetailSection,
  PersonelDataSection,
  PatientList,
  StepItem,
  DependantList,
} from './typeInterface';
import { icons } from '../../assets';
import { COLORS } from '../../assets/theme/colors';
import ModalLoading from '../../components/ModalLoading';
import { useSelector } from 'react-redux';

type LodgeClaimViewProps = {
  steps: StepItem[];
  personalData: PersonelDataSection[];
  dependants: DependantList[];
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
};

const LodgeClaimView: React.FC<LodgeClaimViewProps> = ({
  steps,
  personalData,
  claimsDetails,
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
}) => {
  const renderStep = {
    personalDetails: (
      <PersonalDetails
        selectedPatient={selectedPatient}
        onSelectPatient={onSelectPatient}
        personalData={personalData}
        patientOptions={dependants}
      />
    ),
    claim: (
      <Claim
        onPressDelete={onPressDelete}
        onPressEdit={onPressEdit}
        claimsDetails={claimsDetails}
        navigateTreatment={navigateTreatment}
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

  return (
    <>
      <TopView
        TopViewFirstIcon={currentStep === 2 ? icons.addSquare : null}
        tintColrorForTopViewFirstIcon={COLORS.white}
        FirstOpenModal={navigateTreatment}
        onPressBack={goBack}
        title={type === 'priorApproval' ? 'Prior Approval' : 'Lodge Claim'}
        resetStates={resetStates}
      />
      <CurvedView>
        <Stepper
          currentStep={currentStep}
          steps={steps}
          onPressStep={onPressStep}
          componentList={renderStep}
        />

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

        <ModalLoading
          loading={dependantLoading || uploadLoading || claimLoading}
        />

        <ConfirmationModal
          ConfirmationModalVisible={confirmationModal}
          setConfirmationModalVisible={setConfirmationModal}
          frameImage={icons.ModalSuccessfull}
          confirmationMessage={'Your Claim Successfully Added'}
          closeButton={true}
          Successfull={true}
          CloseButtonText={'Continue To Login'}
          onClose={resetStates}
        />
      </CurvedView>
    </>
  );
};

export default LodgeClaimView;
