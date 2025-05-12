import React from 'react';
import {CurvedView, Stepper, TopView} from '../../components';
import {Claim, PersonalDetails, UploadDoc} from './components';
import {
  ClaimDetailSection,
  PersonelDataSection,
  PatientList,
  StepItem,
  UploadDocSection,
} from './typeInterface';

type LodgeClaimViewProps = {
  steps: StepItem[];
  personalData: PersonelDataSection[];
  claimsDetails: ClaimDetailSection[];
  goBack: () => void;
  patientOptions: PatientList[];
  navigateTreatment: () => void;
  pickFile: () => void;
};

const LodgeClaimView: React.FC<LodgeClaimViewProps> = ({
  steps,
  personalData,
  claimsDetails,
  goBack,
  patientOptions,
  navigateTreatment,
  pickFile,
}) => {
  const renderStep = {
    personalDetails: (
      <PersonalDetails
        personalData={personalData}
        patientOptions={patientOptions}
      />
    ),
    claim: (
      <Claim
        claimsDetails={claimsDetails}
        navigateTreatment={navigateTreatment}
      />
    ),
    uploadDoc: <UploadDoc pickFile={pickFile} />,
  };
  return (
    <>
      <TopView onPressBack={goBack} title={'Logde A claim'} />
      <CurvedView>
        <Stepper steps={steps} componentList={renderStep} />
      </CurvedView>
    </>
  );
};

export default LodgeClaimView;
