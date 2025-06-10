import {StyleSheet} from 'react-native';
import {vh, vw} from '../../assets/theme/dimension';
import {COLORS} from '../../assets/theme/colors';

export const styles = StyleSheet.create({
  infoContainer: {
    flex: 1,
  },

  infoContainerHeaderRight: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: vw * 2,
  },
  rightTab: {
    flexDirection: 'row',
    borderWidth: 2,
    borderColor: COLORS.buttonBorder,
    borderRadius: vw * 5,
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
    fontSize: vh * 1.6,
  },
  activeTab: {
    backgroundColor: COLORS.cardBackgroundRed,
    color: COLORS.white,
  },
  activeTabText: {
    color: COLORS.white,
    fontSize: vh * 1.6,
  },

  headerStyle: {
    fontSize: vw * 5,
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
    justifyContent: 'space-between',

    marginTop: vh * 1.5,
  },
  mapTabsContainer: {
    flexDirection: 'row',
    gap: vw * 1.5,
    marginBottom: vh,
    marginTop: vh * 2,
  },
  mapTabIcon: {
    height: vh * 3,
    width: vw * 6,
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
  filterIcon: {
    width: vw * 4,
    height: vh * 2.3,
    resizeMode: 'contain',
    color: COLORS.black,
  },
  moreFilter: {
    flexDirection: 'row',

    alignItems: 'center',
    gap: vw * 3,
  },
  moreFilterText: {
    fontSize: vw * 4,
    color: COLORS.black,
  },
  detailsTextLabel: {
    width: '20%',
    textAlign: 'left',
  },

  detailsTextValue: {
    width: '60%',
    textAlign: 'right',
  },
});
