import {StyleSheet} from 'react-native';
import {vh, vw} from '../../assets/theme/dimension';
import {COLORS} from '../../assets/theme/colors';

const styles = StyleSheet.create({
  curvedViewContent: {
    // marginTop: vh,
    marginLeft: vw,
  },
  titleText: {
    fontSize: vh * 2.4,
    textAlign: 'left',
    color: COLORS.placeholderColor,
  },
  curvedStyle: {
    paddingBottom: vh * 0,
  },
  description: {
    textAlign: 'left',
    fontSize: vw * 4,
    marginTop: vh,
  },
  button: {
    // marginVertical: vh * 2.5,
    marginTop: vh,
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
  iconView: {},
  buttonDisabled: {},
  buttonEnabled: {},
});

export default styles;
