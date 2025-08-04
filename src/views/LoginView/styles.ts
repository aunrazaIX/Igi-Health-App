import {StyleSheet} from 'react-native';
import {vh, vw} from '../../assets/theme/dimension';
import {COLORS} from '../../assets/theme/colors';

export const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
  },
  imageStyle: {
    height: vh * 100,
  },
  wrapper: {
    padding: vh * 0.7,
  },
  logo: {
    marginTop: vh * 4.8,
    height: vh * 10,
    width: vw * 60,
    resizeMode: 'contain',
  },
  curvedStyle: {
    width: '100%',
    backgroundColor: '#FFFFFFE5',
    paddingBottom: vh,
  },
  loginContent: {
    gap: vh,
    marginTop: vh * 4,
    flex: 1,
    paddingHorizontal: vw * 4,
    alignItems: 'center',
  },
  loginContainer: {
    width: '100%',
    borderRadius: vw * 5,

    justifyContent: 'center',
    alignItems: 'center',
  },

  loginContainerText: {
    color: COLORS.textColorLight,
    fontSize: vw * 3.5,
    textAlign: 'left',
  },

  tabContainer: {
    width: '100%',
    backgroundColor: COLORS.white,
    alignItems: 'center',
    paddingHorizontal: vw * 3,
    paddingVertical: vh,
    borderRadius: vw * 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 0.5,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 1.5,
    borderColor: 'white',
    marginBottom: vh,
  },
  tab: {
    width: '47%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: vw * 6,
  },
  tabText: {
    paddingVertical: vh * 0.4,
    fontSize: vw * 3.6,
  },
  forgetPassword: {
    fontSize: vw * 3.4,
    color: COLORS.forgotPass,
  },
  loginButton: {
    marginTop: vh,
    height: vh * 7.8,
  },
  loginOptionContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: vw * 6,
    paddingVertical: vh,
    width: '110%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.white,
    elevation: 3,
    gap: vw * 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 3,
  },
  loginOptionBox: {
    gap: vh * 1,
    alignItems: 'center',
  },
  loginOptionContainerIcons: {
    width: vw * 11,
    height: vw * 11,
  },
  verticalLine: {
    width: 2.5,
    height: vh * 5,
    backgroundColor: COLORS.buttonBorder,
    marginHorizontal: 10,
  },
  row: {
    width: '100%',
    marginVertical: vh * 1.5,
    flexDirection: 'row',
  },
  orText: {
    fontSize: vw * 5,

    marginVertical: vh * 2,
    // borderWidth:2
  },
});
