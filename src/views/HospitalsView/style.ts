import {StyleSheet} from 'react-native';
import {vh, vw} from '../../assets/theme/dimension';
import {COLORS} from '../../assets/theme/colors';
import {fonts} from '../../assets/fonts';

export const styles = StyleSheet.create({
  infoContainer: {
    flex: 1,
  },

  infoContainerHeaderRight: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: vw * 2,
    // borderWidth: 2,
  },
  infoContainerHeaderRightMap: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: vw * 2,
    marginHorizontal: vw * 2,
  },

  calloutContainer: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
  callout: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    minWidth: 200,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  calloutTitle: {
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 5,
  },
  calloutDescription: {
    fontSize: 12,
    color: '#555',
  },
  calloutLink: {
    fontSize: 12,
    color: 'blue',
    marginTop: 5,
    textDecorationLine: 'underline',
  },

  rightTab: {
    flexDirection: 'row',
    // borderWidth: 2,
    borderColor: COLORS.buttonBorder,
    borderRadius: vw * 5,
    paddingHorizontal: vw * 2.5,
    paddingVertical: vh,
    alignItems: 'center',
    backgroundColor: COLORS.buttonBorder,
    gap: vw * 1,
  },
  activeTabRight: {
    backgroundColor: COLORS.cardBackgroundRed,
  },
  listIcon: {
    width: vw * 3,
    height: vw * 3,
    resizeMode: 'contain',
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
  inputFeild: {
    borderWidth: 2,
    height: vh * 6,
    // width: '80%',
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
    gap: vw * 2,
    justifyContent: 'center',
  },
  cruvedMapView: {
    paddingHorizontal: vw * 0,
  },
  mapTabsContainer: {
    flexDirection: 'row',
    gap: vw * 1.5,
    marginBottom: vh,
    marginTop: vh,
    // borderWidth: 2,
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

    justifyContent: 'center',
  },
  searchFieldRight: {
    position: 'relative',
    top: vh * 2,
    right: vw * 6,
  },
  searchFieldRightIcon: {
    height: vh * 2,
    width: vw * 4,
  },
  inputStyle: {
    fontSize: vw * 3.8,
    height: vh * 4.2,

    // backgroundColor: 'yellow',
    color: COLORS.textBlackShade,

    // fontFamily: fonts.Aileron.bold,
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
