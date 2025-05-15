import {StyleSheet} from 'react-native';
import {COLORS} from '../../assets/theme/colors';
import {vh, vw} from '../../assets/theme/dimension';

export const styles = StyleSheet.create({
  claimHistoryContainer: {
    flex: 1,
  },
  infoContainerTop: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: vw * 2.5,
    borderColor: COLORS.buttonBorder,
    backgroundColor: COLORS.buttonBackground,
    paddingVertical: vh * 0.3,
    paddingHorizontal: vw * 0.5,
  },

  button: {
    width: '50%',
    backgroundColor: COLORS.buttonBackground,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: vw * 2.5,
    // paddingVertical: vh,
    borderRadius: vw * 1,
    color: COLORS.textBlackShade,
  },

  buttonActive: {
    backgroundColor: COLORS.cardBackgroundRed,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: vw * 2,
    borderRadius: vw * 2.5,
    width: '50%',
    // paddingVertical : vh*3
    paddingVertical: vh,
  },
  paidAmountIcon: {
    width: vw * 7.5,
    height: vw * 7.5,
  },

  infoContainerSecondTop: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: vw * 2,
    borderColor: COLORS.buttonBorder,
    backgroundColor: COLORS.buttonBackground,
    paddingVertical: vh * 0.3,
    paddingHorizontal: vw * 0.5,
    marginTop: vh * 1.5,
  },

  inActiveButton: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: vw * 2,

    paddingVertical: vh * 1.4,
    borderRadius: vw * 2.5,
    width: '33%',
  },

  activeButton: {
    backgroundColor: COLORS.cardBackgroundRed,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: vw * 2,
    paddingVertical: vh * 1.4,
    paddingHorizontal: vw * 5,
    borderRadius: vw * 2,
    color: COLORS.textBlackShade,
    width: '33%',
  },

  calendarButtonsContainer: {
    flexDirection: 'row',
    marginTop: vh * 2,
  },

  buttonLabel: {
    color: COLORS.white,
    fontSize: vh * 2,
    fontWeight: 'bold',
  },

  buttonTextActive: {
    color: COLORS.white,
    fontSize: vh * 1.7,
  },
  infoContainerSecondTopButtonText: {
    color: COLORS.textGrayShade,
    fontSize: vh * 1.5,
  },

  detailsTextLabel: {
    width: '20%',
    textAlign: 'left',
  },

  detailsTextValue: {
    width: '60%',
    textAlign: 'right',
  },

  detailsText: {},
  inputFeild: {
    borderWidth: 2,
    height: vh * 7,
  },

  buttonText: {
    color: COLORS.textGrayShade,
    fontSize: vh * 1.7,
  },

  cardText: {
    fontSize: vh * 2,
  },
});
