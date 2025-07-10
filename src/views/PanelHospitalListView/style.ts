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
    width: vw * 5,
    height: vw * 5,
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
    width: '20%',
    textAlign: 'left',
  },

  detailsTextValue: {
    width: '60%',
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
    fontFamily: fonts.Aileron.bold,
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
