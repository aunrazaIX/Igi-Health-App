import {StyleSheet} from 'react-native';
import {vh, vw} from '../../assets/theme/dimension';
import {COLORS} from '../../assets/theme/colors';

export const styles = StyleSheet.create({
  termsAndConditionContainer: {
    marginTop: vh * 2,

    gap: vh * 1.5,
  },
  policyInformation: {
    gap: vh * 1,
  },

  termsAndConditionsHeading: {
    textAlign: 'left',
    fontSize: vh * 1.7,
    color: COLORS.textBlackShade,
  },
  termsAndConditionsPoints: {
    flexDirection: 'row',
    gap: vw * 2,

    textAlign: 'left',

    width: '90%',
  },
  termsAndConditions: {
    flexDirection: 'row',
  },
});
