import { ScrollView, StyleSheet, TouchableOpacity,} from 'react-native'
import React from 'react'
import { AileronSemiBold, CurvedView, Stepper, TopView,  } from '../../components'
import { Claim, PersonalDetails, UploadDoc } from './components';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS } from '../../assets/theme/colors';
import styles from './styles';
import { vh } from '../../assets/theme/dimension';

const LodgeClaimView = ({steps,personalData}) => {
  
  const renderStep = {
    personalDetails: <PersonalDetails personalData={personalData} />,
    claim: <Claim />,
    uploadDoc: <UploadDoc />,
  }
  return (
    <ScrollView>
    <TopView title={'Logde A claim'}/>
    <CurvedView>
    <Stepper steps={steps} componentList={renderStep} />
    <LinearGradient
        colors={COLORS.PriorGradient}
        style={styles.priorGradient}>
        <TouchableOpacity>
          <AileronSemiBold style={styles.priorNext} name={'Next'} />
        </TouchableOpacity>
      </LinearGradient>
    </CurvedView>
    </ScrollView>
  )
}

export default LodgeClaimView