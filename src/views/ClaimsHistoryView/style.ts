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
  leftMidButton: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: vw * 2,
    paddingHorizontal: vw * 8,
    paddingVertical: vh * 1.4,
    borderRadius: vw * 2.5,

    width: '33%',
  },

  midButton: {
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
  rightMidButton: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: vw * 2,
    paddingHorizontal: vw * 8,
    paddingVertical: vh * 1.4,
    borderRadius: vw * 2.5,
    width: '33%',
  },
  
});
