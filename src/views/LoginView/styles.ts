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
    fontSize: vw * 1.7,
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
    fontSize: vw * 1.6,
  },
  forgetPassword: {
    fontSize: vw * 1.5,
    color: COLORS.forgotPass,
  },
  loginButton: {
    marginTop: vh * 2,
  },
  loginOptionContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.loginContainer,
    borderRadius: vw * 6,
    paddingVertical: vh * 3,
    width: '100%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginOptionBox: {
    gap: vh * 1,
    alignItems: 'center',
  },
  verticalLine: {
    width: 1,
    height: vh * 4,
    backgroundColor: COLORS.textColor,
    marginHorizontal: 10,
  },
  row: {
    width: '100%',
    marginVertical: vh,
    flexDirection: 'row',
  },
  orText: {
    fontSize: vw * 1.7,
    marginVertical: vh * 2,
  },
});
