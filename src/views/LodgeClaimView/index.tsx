import {ScrollView} from 'react-native';
import React from 'react';
import {CurvedView, Stepper, TopView} from '../../components';
import {Claim, PersonalDetails, UploadDoc} from './components';

type LodgeClaimViewProps = {
  steps: [];
  personalData: [];
  claimsDetails: [];
  goBack : ()=>void};

const LodgeClaimView: React.FC<LodgeClaimViewProps> = ({
  steps,
  personalData,
  claimsDetails,
  goBack
}) => {
  const renderStep = {
    personalDetails: <PersonalDetails personalData={personalData} />,
    claim: <Claim claimsDetails={claimsDetails} />,
    uploadDoc: <UploadDoc />,
  };
  return (
    <>
      <TopView onPressBack={goBack} title={'Logde A claim'} />
    <CurvedView>

      <ScrollView >
        <Stepper  steps={steps} componentList={renderStep} />
      </ScrollView>
      
    </CurvedView>
    </>

  );
};

export default LodgeClaimView;
