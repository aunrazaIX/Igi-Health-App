import {StyleSheet} from 'react-native';
import {vh, vw} from '../../assets/theme/dimension';
import {COLORS} from '../../assets/theme/colors';

export const styles = StyleSheet.create({
  infoContainer: {},

  infoContainerHeader: {
    height: vh * 50,
  },
  infoContainerHeaderRight: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    // borderWidth: 2,
    gap: vw * 2,
  },
  infoContainerHeaderRightList: {
    flexDirection: 'row',
    borderWidth: 2,
    borderColor: COLORS.buttonBorder,
    borderRadius: vw * 3,
    paddingHorizontal: vw * 2,
    paddingVertical: vh * 1,
    alignItems: 'center',
    backgroundColor: COLORS.buttonBorder,

    gap: vw * 1,
  },

  infoContainerHeaderRightMap: {
    borderColor: COLORS.buttonBorder,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: vw * 1,
    borderWidth: 2,
    borderRadius: vw * 4,
    paddingHorizontal: vw * 2,
    paddingVertical: vh * 1,
    backgroundColor: COLORS.cardBackgroundRed,
  },
  infoContainerHeaderText: {
    fontSize: vh * 1.7,
  },
  infoContainerHeaderActriveText: {
    fontSize: vh * 1.7,
    color: COLORS.white,
  },
  infoContainerHeaderTabs: {
//   backgroundColor : "yellow",
  height:vh*50
  },
});
