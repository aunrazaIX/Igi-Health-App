import {StyleSheet} from 'react-native';
import {COLORS} from '../../assets/theme/colors';
import {vh, vw} from '../../assets/theme/dimension';
import {fonts} from '../../assets/fonts';

const styles = StyleSheet.create({
  inputContainer: {
    borderWidth: 2,
  },
  modalView: {
    backgroundColor: COLORS.white,
    borderTopRightRadius: vw * 6,
    borderTopLeftRadius: vw * 6,
    width: '100%',
    minHeight: '88%',
    paddingHorizontal: vh * 1,
    paddingTop: vh * 3.5,
    paddingBottom: vh * 2,
    shadowColor: COLORS.black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 1,
    shadowRadius: vw * 6,
    elevation: vw * 5,
  },
  modalClose: {
    alignSelf: 'flex-end',
    marginBottom: -vh * 1,
  },
  personalFrameContainer: {
    alignItems: 'center',
  },
  personalFrameIMG: {
    width: vh * 9.5,
    height: vh * 9.5,
  },
  manageContainer: {
    marginVertical: vh * 1.5,
  },
  manageText: {
    color: COLORS.coverageTitle,
    fontSize: vw * 6.6,
  },
  DependentText: {
    color: COLORS.benefitTitle,
    fontSize: vw * 6.6,
  },
  dependentOuterStyle: {
    width: '100%',
    borderWidth: vh * 0.3,
    paddingBottom: vh * -2,
  },
  selectLabel: {
    textAlign: 'left',
    color: COLORS.textBlackShade,
    // color: COLORS.black + '55',
    fontSize: vw * 3.6,
    minHeight: vh * 2,
    marginBottom: vh * 0,
    marginTop: vh * -1,
    // paddingLeft: vw * -2,
    marginLeft: vw * -1,
  },
  popupInput: {
    marginTop: vh * -0.9,
    marginLeft: vw * -1.8,
    color: COLORS.personalValue,
    fontFamily: fonts.inter.regular,
    fontSize: vw * 3.5,
    fontWeight: '500',
    // paddingLeft: vw * -3,

    // paddingBottom: vh * -0.9,
    marginBottom: vh * -0.8,
  },
  modalAddButton: {
    marginTop: vh * 2,
    borderRadius: vw * 3.5,
  },
  modalAddText: {
    fontSize: vw * 4.4,
    fontWeight: '700',
  },
  modalCancelButton: {
    marginTop: vh * 2,
    borderRadius: vw * 3.5,
  },
  modalCancelText: {
    color: COLORS.white,
    fontSize: vw * 4.4,
    fontWeight: '700',
  },
  curvedStyle: {
    paddingBottom: vh * 12,
  },
});

export default styles;
