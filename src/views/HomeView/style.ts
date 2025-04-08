import {StyleSheet} from 'react-native';
import {vh, vw} from '../../assets/theme/dimension';
import {COLORS} from '../../assets/theme/colors';
import {Colors} from 'react-native/Libraries/NewAppScreen';

export const styles = StyleSheet.create({
  homeContainer: {
    // borderWidth: 2,
    flex: 1,
  },
  gradient: {
    height: '58%',
  },
  homeHeader: {
    marginTop: vh * 8,
    marginHorizontal: vw * 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLogo: {
    width: 24 * vw,
    height: 6 * vh,
  },
  headerIcons: {
    flexDirection: 'row',
    gap: vw * 5,
  },
  homeInfoContainer: {
    marginTop: vh * 4,
    marginHorizontal: vw * 4,
    paddingHorizontal: vw * 5,
    paddingVertical: vh * 3,
    borderRadius: vw * 4,
    backgroundColor: COLORS.white,
    elevation: 5,
  },
  logo: {
    width: 24 * vw,
    height: 6 * vh,
  },
  homeInfoContainerHeader: {
    // borderWidth: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoCardTextBold: {
    fontSize: vh * 2,
    color: COLORS.textBlackShade,
  },
  infoCardTextlight: {
    fontSize: vh * 1.6,
    color: COLORS.textColor,
  },
  homeInfoContainerHeaderText: {
    gap: vh * 0.5,
  },
  homeInfoContainerMiddle: {
    marginVertical: vh * 2,
  },
  homeInfoContainerMiddleText: {
    justifyContent: 'flex-start',
  },
  infoCardMiddleTextlight: {
    fontSize: vh * 1.8,
    color: COLORS.textColor,
    textAlign: 'left',
  },
  homeInfoContainerMiddleTextLogo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoCardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoCardFooterTextBold: {
    fontSize: vh * 2.3,
    color : COLORS.textBlackShade,
  
    
  },
  infoCardFooterLeft: {},
  infoCardFooterRight: {
    alignItems: 'flex-end',
  },
  homeInfoContainerScroll: {
    alignItems: 'center',
    marginTop: vh * 2,
  },

  indicatorDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: vw * 2.2,
  },

  dot: {
    width: vw * 8,
    height: vw * 1.5,
    borderRadius: vw,
  },

  activeDot: {
    backgroundColor: COLORS.cardBackgroundRed,
    opacity: 1,
  },

  inactiveDot: {
    backgroundColor: COLORS.white,
  },

  dashboardContainer: {
    marginHorizontal: vw * 4,
  },
  dashboardContainerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    marginTop: vh * 1.3,
    alignItems: 'center',
  },
  dashboardContainerHeaderIcons: {
    flexDirection: 'row',
    gap: vw * 2,
  },
  dashboardContainerTextBold: {
    fontSize: vh * 2.3,
    color: COLORS.textBlackShade,
  },
  dashboardContainerTextLight: {
    fontSize: vh * 2.3,
    color: COLORS.textGrayShade,
  },
  dashboardContainerCards: {
    paddingHorizontal: vw * 2,
    marginVertical: vh * 2,

    justifyContent: 'space-between',
    height: '70%',
    borderRadius: vw * 2,
    backgroundColor: COLORS.cardBackgroundBlue,
    width: vw * 35,
    marginRight: vw * 4,
  },
  cardLogoContainer: {
    marginVertical: vh * 2,
  },
  cardLogo: {
    width: vw * 8,
    height: vh * 6,
  },
  cardContent: {
    marginBottom: vh,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dashboardContainerCardText: {
    textAlign: 'left',
    fontSize: vh * 2.3,
    color: COLORS.white,
    flexWrap: 'wrap',
  },

  dashboardMeterContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  dashboardMeterLeft: {
    gap: vh * 1,
  },

  dashboardMeterRight: {
    gap: vh * 1,
  },
  meterLeftIcon: {
    height: vh * 2,
    width: vw * 3,
  },
  meterLeftText: {
    fontSize: vh * 5,
    textAlign: 'left',
    color: COLORS.black,
  },

  
});
