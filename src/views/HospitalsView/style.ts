import {StyleSheet} from 'react-native';
import {vh, vw} from '../../assets/theme/dimension';
import {COLORS} from '../../assets/theme/colors';

export const styles = StyleSheet.create({
  infoContainer: {
    flex: 1,
  },

  infoContainerHeader: {},
  infoContainerHeaderRight: {
    flexDirection: 'row',
    justifyContent: 'flex-end',

    gap: vw * 2,
  },
  rightTab: {
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
  activeTabRight: {
    backgroundColor: COLORS.cardBackgroundRed,
  },
  activeTabRightText: {
    color: COLORS.white,
  },
  infoContainerHeaderText: {
    fontSize: vh * 1.7,
    color: COLORS.black,
  },
//   activeTabRightText: {
//     color: COLORS.white,
//   },
  infoContainerHeaderTabs: {
    flexDirection: 'row',
    marginVertical: vh * 2,

    justifyContent: 'center',
    gap: vw * 2,
    borderColor: COLORS.buttonBorder,
  },
  tab: {
    borderRadius: vw * 8,
    paddingVertical: vh * 2,
    paddingHorizontal: vw * 4,

    flexDirection: 'row',
    gap: vw * 2,
    alignItems: 'center',

    borderColor: COLORS.buttonBorder,
    backgroundColor: COLORS.buttonBorder,
  },

  tabText: {
    color: COLORS.black,
    fontSize: vh * 1.5,
  },
  activeTab: {
    backgroundColor: COLORS.cardBackgroundRed,
    color: COLORS.white,
  },
  activeTabText: {
    color: COLORS.white,
  },

  discountTab: {
    borderRadius: vw * 8,
    paddingVertical: vh * 2,
    paddingHorizontal: vw * 4,
    flexDirection: 'row',
    gap: vw * 2,
    alignItems: 'center',
    borderColor: COLORS.buttonBorder,
    backgroundColor: COLORS.buttonBorder,
  },
  discountTabText: {
    color: COLORS.black,
    fontSize: vh * 1.5,
  },
  mapTextContainer: {
    flexDirection: 'row',
    gap: vw * 2,
  },
  mapTabsContainer: {
    flexDirection: 'row',
    gap: vw * 1.5,
    marginVertical: vh * 3,


  },
  mapTabIcon: {
    height: vh * 3,
    width: vw * 7,
  },
  mapTabText: {
    fontSize: vh * 2,
  },

  mapTabActive: {
    flexDirection: 'row',
    backgroundColor: COLORS.cardBackgroundRed,
    padding: vw * 4,
    justifyContent: 'center',
    borderRadius: vw * 8,
    gap: vw * 1.5,
    alignItems: 'center',
  },
  mapTab: {
    flexDirection: 'row',
    backgroundColor: COLORS.buttonBorder,
    padding: vw * 4,
    borderRadius: vw * 8,
    gap: vw * 1.5,
    alignItems: 'center',
  },
});
