import {StyleSheet} from 'react-native';
import {vh, vw} from '../../assets/theme/dimension';
import {COLORS} from '../../assets/theme/colors';

const styles = StyleSheet.create({
  curvedStyle: {
    justifyContent: 'space-between',
    paddingBottom: vh * 2,
  },
  editIconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: vw * 1.5,
    alignSelf: 'flex-end',
  },
  editIcon: {
    width: vw * 7,
    height: vw * 7,
  },
  editText: {
    fontSize: vw * 5,
  },
  profileDetail: {
    alignItems: 'center',
    paddingBottom: vh * 5,
    marginTop: vh * 2,
  },
  profileImage: {
    width: vw * 25,
    height: vw * 25,
    marginBottom: vh * 3,
  },
  ProfileName: {
    fontSize: vw * 5.3,
    fontWeight: '700',
    color: COLORS.confimationDetail,
  },
  profileEmail: {
    fontSize: vw * 4,
    lineHeight: vh * 2.3,
  },
  dependentOuterStyle: {
    // width: '100%',
    // borderWidth: vh * 0.3,
    // padding: vw * 3.5,
    // paddingBottom: vh * 0,
    backgroundColor: COLORS.inputBoxDisabled,
  },
  inputBox: {
    // width: '100%',
    // borderWidth: vh * 0.3,
    // padding: vw * 3.5,
    // paddingBottom: vh * 0,
    backgroundColor: COLORS.white,
  },
  selectLabel: {
    textAlign: 'left',
    color: COLORS.labelDisabled,
    fontSize: vw * 3.6,
  },
  popupInput: {
    // marginTop: vh * -0.9,
    marginLeft: 0,
    paddingLeft: 0,
    color: COLORS.labelDisabled,
    fontSize: vw * 3.5,
    fontWeight: '700',
  },
  profileDetailContainer: {},
  button: {},
});

export default styles;
