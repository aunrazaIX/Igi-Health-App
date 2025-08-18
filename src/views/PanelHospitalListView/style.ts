import {StyleSheet} from 'react-native';
import {vh, vw} from '../../assets/theme/dimension';
import {COLORS} from '../../assets/theme/colors';
import {fonts} from '../../assets/fonts';

export const styles = StyleSheet.create({
  infoContainer: {
    flex: 1,
  },

  infoContainerHeader: {},
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
    // borderWidth: 2,
    marginHorizontal: vw * 3,
  },
  curvedMapView: {
    paddingHorizontal: 0 * vw,
  },
  curvedListView: {
    paddingBottom: vh * 3,
  },
  rightTab: {
    flexDirection: 'row',
    borderColor: COLORS.buttonBorder,
    borderRadius: vw * 5,
    paddingHorizontal: vw * 4,
    paddingVertical: vh * 1.2,
    alignItems: 'center',
    backgroundColor: COLORS.buttonBorder,
    gap: vw * 2,
  },
  activeTabRight: {
    backgroundColor: COLORS.cardBackgroundRed,
    gap: vw * 2,
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
    fontSize: vw * 3.5,
    color: COLORS.black,
  },

  infoContainerHeaderTabs: {
    flexDirection: 'row',
    marginVertical: vh * 2,

    // justifyContent: 'center',
    gap: vw * 2,
    borderColor: COLORS.buttonBorder,
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
  detailsTextLabel: {
    width: '18%',
    textAlign: 'left',
  },

  detailsTextValue: {
    width: '100%',
    textAlign: 'right',
  },
  inputFeild: {
    borderWidth: 2,
    // paddingHorizontal: vw * 2,
    // marginHorizontal: vw * 2,
    height: vh * 6,

    justifyContent: 'center',
    alignItems: 'center',
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
    fontSize: vw * 3.5,
    height: vh * 4.4,
    color: COLORS.textBlackShade,
    fontFamily: fonts.inter.bold,
    alignItems: 'center',
  },
  tabText: {
    color: COLORS.black,
    fontSize: vw * 3.5,
  },
  activeTab: {
    backgroundColor: COLORS.cardBackgroundRed,
    color: COLORS.white,
  },
  activeTabText: {
    color: COLORS.white,
  },

  mapTabText: {
    fontSize: vw * 2,
  },
});
