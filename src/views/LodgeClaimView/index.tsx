import React from 'react';
import {Button, CurvedView, Stepper, TopView} from '../../components';
import {Claim, PersonalDetails, UploadDoc} from './components';
import {
  ClaimDetailSection,
  PersonelDataSection,
  PatientList,
  StepItem,
  DependantList,
} from './typeInterface';
import {icons} from '../../assets';
import {COLORS} from '../../assets/theme/colors';

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
  onPressStep: (index: number) => void;
  selectedPatient: any; // You can replace 'any' with a specific patient type
  onSelectPatient: (option: any) => void; // Replace `any` with correct type if known
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
  onPressStep,
  onSelectPatient,
  selectedPatient,
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
        claimsDetails={claimsDetails}
        navigateTreatment={navigateTreatment}
      />
    ),
    uploadDoc: <UploadDoc pickFile={pickFile} />,
  };

  return (
    <>
      <TopView
        TopViewFirstIcon={currentStep === 2 ? icons.addSquare : null}
        tintColrorForTopViewFirstIcon={COLORS.white}
        FirstOpenModal={navigateTreatment}
        onPressBack={goBack}
        title="Lodge A Claim"
      />
      <CurvedView>
        <Stepper
          currentStep={currentStep}
          steps={steps}
          onPressStep={onPressStep}
          componentList={renderStep}
        />
        <Button onPress={onPressNext} name="Next" />
      </CurvedView>
    </>
  );
};

export default LodgeClaimView;
