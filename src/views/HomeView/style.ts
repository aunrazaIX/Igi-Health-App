import {StyleSheet} from 'react-native';
import {vh, vw} from '../../assets/theme/dimension';
import {COLORS} from '../../assets/theme/colors';
import {Colors} from 'react-native/Libraries/NewAppScreen';

export const styles = StyleSheet.create({
  homeContainer: {
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
    aspectRatio: 2,
    resizeMode: 'contain',
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
    backfaceVisibility: 'hidden',
  },
  rotateCard:{
    zIndex: 1,
  },
  flipCardContainer: {
    width: '100%',
    height: vh*30,
  },
  flipBackCard: {
   marginTop: -vh*27,
  },
  logo: {
    width: 24 * vw,
    height: 6 * vh,
    resizeMode: 'contain',
  },
  homeInfoContainerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    color: COLORS.textColor,
    fontSize: vh * 2,
  },
  meterDetailTextEnd: {
    flexDirection: 'row',
    gap: vw * 1,
  },

  meterArrowUp: {
    height: vh * 2,
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
    color: COLORS.textBlackShade,
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
  meterDetailTextLight: {
    fontSize: vw * 4,
    color: COLORS.textGrayShade,
  },
  dashboardContainerCards: {
    paddingHorizontal: vw * 2,

    marginVertical: vh * 2,

    justifyContent: 'space-between',
    height: '70%',
    borderRadius: vw * 2,
    backgroundColor: COLORS.cardBackgroundBlue,
    width: vw * 40,
    marginRight: vw * 4,
  },
  cardLogoContainer: {
    marginVertical: vh * 2,

    marginLeft: vw * 1,
    resizeMode: 'contain',
  },
  cardLogo: {
    width: vw * 14,
    height: vh * 8,
    resizeMode: 'contain',
  },
  cardContent: {
    marginBottom: vh,
    flexDirection: 'row',
    justifyContent: 'space-between',
   

    alignItems: 'center',
  },
  dashboardContainerCardText: {
    textAlign: 'left',
    fontSize: vw * 4,
    color: COLORS.white,
  
  },

  dashboardMeterContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  dashboardMeterDetail: {
    gap: vh * 1,
  },
  dashboardMeterDetailTop: {
    flexDirection: 'row',
    gap: vw * 1.8,
    alignItems: 'center',
  },

  meterIcon: {
    height: vh * 2,
    width: vw * 4,
    resizeMode: 'contain',
  },
  meterDetailTextBold: {
    fontSize: vw * 9,
    textAlign: 'left',
    color: COLORS.black,
  },
  textRed: {
    color: COLORS.cardBackgroundRed,
    fontSize: vh * 2,
  },
});
