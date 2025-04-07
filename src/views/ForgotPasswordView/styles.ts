import {StyleSheet} from 'react-native';
import {vh, vw} from '../../assets/theme/dimension';
import {COLORS} from '../../assets/theme/colors';

const styles = StyleSheet.create({
  titleText: {
    fontSize: vh * 2.3,
    textAlign: 'left',
    color: COLORS.placeholderColor,
  },
  description: {
    textAlign: 'left',
    fontSize: vh * 1.7,
    marginTop: vh,
  },
  button: {
    marginVertical: vh * 2.5,
  },
  otpContainer: {
    marginVertical: vh * 2,
  },
  otpBoxView: {
    borderColor: COLORS.loginButton,
  },
  sendAgain: {
    fontSize: vh * 1.5,
  },
  resendCode: {
    marginTop: vh,
    fontSize: vh * 1.5,
  },
  simpleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: vh,
  },
  bullet: {
    height: vw,
    width: vw,
    backgroundColor: COLORS.black,
    borderRadius: vw,
  },
  ruleText: {
    fontSize: vh * 1.5,
    textAlign: 'left',
    marginLeft: vw * 2,
  },
  iconView: {
    bottom: 0,
  },
});

export default styles;
