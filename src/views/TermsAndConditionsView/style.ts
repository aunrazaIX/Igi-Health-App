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

  termsAndConditions: {
    flexDirection: 'row',
    gap: vw * 2,
  },

  termsAndConditionsHeading: {
    textAlign: 'left',
    fontSize: vw * 3.9,
    color: COLORS.textBlackShade,
  },
  termsAndConditionsText: {
    textAlign: 'left',
    fontSize: vw * 3.5,
    maxWidth: '90%',
    color: COLORS.textBlackShade,
  },
  termsAndConditionsPoints: {
    flexDirection: 'row',
    gap: vw * 2,
    marginHorizontal: vw * 2,

    alignItems: 'flex-start',
  },
  bullet: {
    fontSize: vw * 6,
  },
  pointsText: {
    textAlign: 'left',
    maxWidth: '95%',
    fontSize: vw * 3.7,
    color: COLORS.textBlackShade,
  },
});
