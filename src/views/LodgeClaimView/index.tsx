import {ScrollView} from 'react-native';
import React from 'react';
import {CurvedView, Stepper, TopView} from '../../components';
import {Claim, PersonalDetails, UploadDoc} from './components';
import {
  ClaimDetailSection,
  PersonelDataSection,
  PatientList,
  StepItem,
} from './typeInterface';

type LodgeClaimViewProps = {
  steps: StepItem[];
  personalData: PersonelDataSection[];
  claimsDetails: ClaimDetailSection[];
  goBack: () => void;
  patientOptions: PatientList[];
};

const LodgeClaimView: React.FC<LodgeClaimViewProps> = ({
  steps,
  personalData,
  claimsDetails,
  goBack,
  patientOptions,
}) => {
  const renderStep = {
    personalDetails: (
      <PersonalDetails
        personalData={personalData}
        patientOptions={patientOptions}
      />
    ),
    claim: <Claim claimsDetails={claimsDetails} />,
    uploadDoc: <UploadDoc />,
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
