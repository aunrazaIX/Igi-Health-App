import {ScrollView} from 'react-native';
import React from 'react';
import {CurvedView, Stepper, TopView} from '../../components';
import {Claim, UploadDoc} from './components';
import {PersonalDetails} from '../LodgeClaimView/components';

type LodgeClaimViewProps = {
  steps: [];
  personalData: [];
  claimsDetails: [];
  goBack: () => void;
};

const LodgeClaimView: React.FC<LodgeClaimViewProps> = ({
  steps,
  personalData,
  claimsDetails,
  goBack,
  selectData,
}) => {
  const renderStep = {
    personalDetails: (
      <PersonalDetails personalData={personalData} selectData={selectData} />
    ),
    claim: <Claim />,
    uploadDoc: <UploadDoc />,
  };
  return (
    <>
      <TopView onPressBack={goBack} title={'Prior Approval'} />
      <CurvedView>
        <ScrollView>
          <Stepper steps={steps} componentList={renderStep} />
        </ScrollView>
      </CurvedView>
    </>
  );
};

export default LodgeClaimView;
