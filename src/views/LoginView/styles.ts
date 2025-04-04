import {StyleSheet} from 'react-native';
import {vh, vw} from '../../assets/theme/dimension';
import {COLORS} from '../../assets/theme/colors';

export const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
  },
  logo: {
    marginVertical: vh * 3,
    height: vh * 10,
    width: vw * 60,
    resizeMode: 'contain',
  },
  loginContent: {
    flex: 1,
    paddingHorizontal: vw * 4,
    alignItems: 'center',
  },
  loginContainer: {
    width: '100%',
    borderRadius: vw * 5,
    backgroundColor: COLORS.loginContainer,
    paddingVertical: vh * 4,
    paddingHorizontal: vw * 4,
    justifyContent: 'center',
    alignItems: 'center',
  },

  loginContainerText: {
    color: COLORS.textColorLight,
    marginTop: vh * 2,
    fontSize: vh * 1.7,
    textAlign: 'left',
  },
  tabContainer: {
    width: '100%',
    backgroundColor: COLORS.white,
    alignItems: 'center',
    paddingHorizontal: vw * 3,
    elevation: 5,
    paddingVertical: vh,
    borderRadius: vw * 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  tab: {
    width: '47%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: vh * 1.5,
    borderRadius: vw * 6,
  },
  tabText: {
    fontSize: vh * 1.6,
  },
  signupTab: {
    paddingHorizontal: vw * 8,
    paddingVertical: vh * 0.7,
    borderRadius: vw * 2,
  },

  inputContainer: {
    marginTop: vh * 2,
    width: '80%',
    justifyContent: 'space-between',
  },

  inputBox: {
    backgroundColor: 'white',
    borderRadius: vw * 3,
    paddingVertical: vh * 1.3,
    paddingHorizontal: vw * 4,
    elevation: 3,
    height: 61,
    marginBottom: 20,
  },

  inputLabel: {
    fontSize: vh * 1.5,
    color: COLORS.textColor,
  },

  inputText: {
    bottom: 10,
    color: COLORS.textColor,
    paddingHorizontal: 0,
  },

  loginOptions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rememberMe: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  forgetPassword: {
    color: COLORS.forgotPass,
  },

  loginButtonContainer: {
    borderRadius: vw * 4,
    backgroundColor: COLORS.loginButton,
    marginVertical: 2 * vh,
  },
  loginButton: {
    flexDirection: 'row',
    gap: 4,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 2 * vh,
  },
  buttonText: {
    color: COLORS.buttonText,
  },
  loginOptionContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.loginContainer,
    borderRadius: vw * 6,
    paddingVertical: vh * 3,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    gap: vw * 4,
    marginBottom: vh * 5,
  },
  loginOptionBox: {
    gap: vh * 1,
    alignItems: 'center',
  },
  verticalLine: {
    width: 1,
    height: 40,
    backgroundColor: COLORS.textColor,
    marginHorizontal: 10,
  },
  row: {
    width:'100%',
    marginVertical: vh,
    flexDirection: 'row',
  },
});
