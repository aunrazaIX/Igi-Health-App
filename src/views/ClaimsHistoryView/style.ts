import {StyleSheet} from 'react-native';
import {COLORS} from '../../assets/theme/colors';
import {vh, vw} from '../../assets/theme/dimension';

export const styles = StyleSheet.create({
  claimHistoryContainer: {
    flex: 1,
  },
  header: {},
  infoContainer: {
    flex: 1,
  },
  infoContainerTop: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: vw * 1,
    borderColor: COLORS.buttonBorder,
    backgroundColor: COLORS.buttonBackground,
    paddingVertical: vh * 0.3,
    paddingHorizontal: vw * 0.5,
  },

  leftButton: {
    width: '50%',
    backgroundColor: COLORS.buttonBackground,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: vw * 2,
    paddingVertical: vh * 1.4,
    paddingHorizontal: vw * 5,
    borderRadius: vw * 1,
    color: COLORS.textBlackShade,
  },
  leftButtonActive: {
    backgroundColor: COLORS.cardBackgroundRed,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: vw * 2,
    paddingHorizontal: vw * 8,
    paddingVertical: vh * 1.4,
    borderRadius: vw * 2.5,
    width: '50%',
  },

  rightButtonActive: {
    backgroundColor: COLORS.cardBackgroundRed,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: vw * 2,
    paddingHorizontal: vw * 8,
    paddingVertical: vh * 1.4,
    borderRadius: vw * 2.5,
    width: '50%',
  },
  rightButton: {
    width: '50%',
    backgroundColor: COLORS.buttonBackground,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: vw * 2,
    paddingVertical: vh * 1.4,
    paddingHorizontal: vw * 5,
    borderRadius: vw * 1,
    color: COLORS.textBlackShade,
  },
  infoContainerSecondTop: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: vw * 1,
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
    paddingHorizontal: vw * 8,
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
    borderRadius: vw * 1,
    color: COLORS.textBlackShade,
    width: '33%',
  },

  calendarButtonsContainer: {
    flexDirection: 'row',
    marginTop: vh * 2,
  },

  cancelButton: {
    paddingVertical: vh * 1.5,
    backgroundColor: COLORS.buttonBackground,
    borderRadius: 10,
    marginRight: vw * 2,
    alignItems: 'center',
    width: '50%',
  },

  applyButton: {
    paddingVertical: vh * 1.5,
    width: '50%',
    borderRadius: 10,
    marginLeft: vw * 2,
    alignItems: 'center',
  },

  buttonLabel: {
    color: COLORS.white,
    fontSize: vh * 2,
    fontWeight: 'bold',
  },
});
