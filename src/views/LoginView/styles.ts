import {StyleSheet} from 'react-native';
import {vh, vw} from '../../assets/theme/dimension';
import {Colors} from '../../assets/theme/colors';

export const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
  },

  igiVitalityLogo: {
    marginTop: vh * 5,
  },
  loginContent: {
    gap: vh * 2,
    width: '100%',
    alignItems: 'center',
  },
  loginContainer: {
    backgroundColor: Colors.loginContainer,
    borderRadius: vw * 6,
    paddingVertical: vh * 4,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  loginContainerText: {
    marginTop: vh * 2,
    fontSize: vw * 3,
    width: '80%',
  },
  tabContainer: {
    backgroundColor: 'white',
    borderWidth: 1,
    elevation: 5,
    borderColor: 'white',
    borderRadius: vw * 6,
    flexDirection: 'row',
    width: '80%',
    justifyContent: 'space-between',
    paddingHorizontal: vw * 2,
    paddingVertical: vh * 1,
  },

  loginTab: {
    borderWidth: 2,
    paddingHorizontal: vw * 12,
    paddingVertical: vh * 0.7,
    borderRadius: vw * 6,
    borderColor: Colors.activeTab,
    backgroundColor: Colors.activeTab,
  },
  loginTabText: {
    color: Colors.tabText,
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
    color: Colors.textColor,
  },

  inputText: {
    bottom: 10,
    color: Colors.textColor,
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
    color: Colors.forgotPass,
  },

  loginButtonContainer: {
    borderRadius: vw * 4,
    backgroundColor: Colors.loginButton,
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
    color: Colors.buttonText,
  },
  loginOptionContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.loginContainer,
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
    backgroundColor: Colors.textColor,
    marginHorizontal: 10,
  },
});
