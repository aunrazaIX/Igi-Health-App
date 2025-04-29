import {ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {AileronSemiBold, CurvedView, Stepper, TopView} from '../../components';
import {Claim, PersonalDetails, UploadDoc} from './components';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS} from '../../assets/theme/colors';
import styles from './styles';
import { vh } from '../../assets/theme/dimension';

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
      <CurvedView containerStyle={{backgroundColor:'black'}}>
        <Stepper steps={steps} componentList={renderStep} />
      </CurvedView>
    </ScrollView>
  );
};

export default LodgeClaimView;
