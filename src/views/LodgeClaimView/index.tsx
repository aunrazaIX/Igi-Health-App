import {ScrollView} from 'react-native';
import React from 'react';
import { CurvedView, Stepper, TopView} from '../../components';
import {Claim, PersonalDetails, UploadDoc} from './components';


type LodgeClaimViewProps = {
  steps: [];
  personalData: [];
  claimsDetails: [];
};

const LodgeClaimView: React.FC<LodgeClaimViewProps> = ({
  steps,
  personalData,
  claimsDetails,
}) => {
  const renderStep = {
    personalDetails: <PersonalDetails personalData={personalData} />,
    claim: <Claim claimsDetails={claimsDetails}/>,
    uploadDoc: <UploadDoc />,
  };
  return (
    <ScrollView>
      <TopView title={'Logde A claim'} />
      <CurvedView>
        <Stepper steps={steps} componentList={renderStep} />
      </CurvedView>
    </ScrollView>
  );
};

export default LodgeClaimView;
