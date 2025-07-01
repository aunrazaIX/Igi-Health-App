import {StyleSheet} from 'react-native';
import {vh, vw} from '../../assets/theme/dimension';
import {COLORS} from '../../assets/theme/colors';

export const styles = StyleSheet.create({
  gradient: {
    paddingBottom: vh * 15,
    paddingHorizontal: vw * 5,
    backgroundColor: COLORS.white,
  },
  BottomContainer: {
    paddingBottom: vh * 17,
    paddingHorizontal: vw * 4,
    backgroundColor: COLORS.white,
  },
  wrapper: {
    paddingBottom: vh * 2,
    paddingHorizontal: vw * 4,
  },
  homeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: vh * 3,
    // paddingBottom: vh * 1.4,
    // borderWidth: 2,
  },
  headerLogo: {
    width: 25 * vw,
    height: vh * 6,
    resizeMode: 'contain',
  },
  userName: {
    fontSize: vw * 3,
    color: 'white',
  },
  headerIconsRow: {
    flexDirection: 'row',
    gap: vw * 5,
  },
  headerDNIcons: {
    flexDirection: 'row',
    // borderWidth: 2,
    gap: vw,
  },
  headerIcons: {
    width: vw * 6,
    height: vw * 6,
    backgroundColor: 'White',
    tintColor: 'white',
  },
  homeInfoContainer: {
    width: '100%',
    paddingHorizontal: vw * 4,

    paddingVertical: vh * 3,
    borderRadius: vw * 6,
    backgroundColor: COLORS.white,
    elevation: 3,
    backfaceVisibility: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    // borderWidth: 2,
    // minHeight: 28 * vh,

    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },

  flipCardContainer: {
    width: '100%',
    // borderWidth: 2,
    marginTop: vh * 2,
    // borderWidth: 2,
  },
  flipBackCard: {
    marginTop: -vh * 30,
  },
  logo: {
    width: 28 * vw,
    height: 7 * vh,
    resizeMode: 'contain',
    justifyContent: 'flex-start',
    // borderWidth: 2,
    alignItems: 'flex-start',
    alignContent: 'flex-start',
    alignSelf: 'flex-start',
    // borderWidth:2
  },
  downloadIcon: {
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  downloadIconImage: {
    width: 10 * vw,
    height: 4 * vh,
    resizeMode: 'contain',
  },

  homeInfoContainerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // borderWidth: 2,
  },
  text: {
    color: COLORS.textColor,
    fontSize: vh * 2,
  },
  statisticsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: vw * 3,
  },
  statisticsHeader: {
    fontSize: vh * 2.3,
    color: COLORS.textBlackShade,
  },
  graphContainer: {
    height: vh * 20,
    marginTop: vh * 3.2,
    marginBottom: vh * 2.5,
    alignItems: 'center',
    position: 'relative',
  },
  meterEllipseBlue: {
    width: vw * 64,
    height: vw * 64,
    resizeMode: 'contain',
  },
  meterEllipseRed: {
    width: vw * 50,
    height: vw * 50,
    position: 'absolute',
    top: vh * 3.2,
    resizeMode: 'contain',
  },
  dashboardMeterIcon: {
    width: vw * 10,
    height: vw * 10,
    position: 'absolute',
    top: vh * 8.2,
  },
  meterLightText: {
    fontSize: vw * 3.4,
    position: 'absolute',
    top: vh * 13.3,
  },
  meterBoldText: {
    fontSize: vw * 7.5,
    position: 'absolute',
    top: vh * 14.8,
  },
  meterDetailTextEnd: {
    flexDirection: 'row',
    gap: vw * 1,
  },

  meterArrowUp: {
    height: vh * 2,
  },
  infoCardTextBold: {
    fontSize: vh * 1.6,
    color: COLORS.textBlackShade,
    // textAlign: 'left',
    // borderWidth: 2,
  },
  infoCardTextlight: {
    fontSize: vh * 1.6,
    color: COLORS.textColor,
    width: vw * 40,
  },
  homeInfoContainerHeaderText: {
    gap: vh * 0.5,

    alignItems: 'flex-end',
  },
  homeInfoContainerMiddle: {
    marginTop: vh * 1.2,

    // justifyContent: 'space-between',/
  },
  homeInfoContainerMiddleText: {},
  infoCardMiddleTextlight: {
    fontSize: vw * 3.7,
    color: COLORS.textColor,
    textAlign: 'left',
    lineHeight: vh * 2,
  },
  homeInfoContainerMiddleTextLogo: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    alignItems: 'center',
  },
  homeCardMainDetails: {
    // borderWidth: 2,
    gap: vh * 0.9,
  },

  flipCardIcon: {
    width: vw * 16,
    height: vh * 6,
    resizeMode: 'contain',
  },
  backCardDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  validity: {
    gap: vh * 2,
    // borderWidth: 2,

    marginTop: vh,
  },

  infoCardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: vh * 2.5,
    // borderWidth: 2
  },
  infoCardFooterTextBold: {
    fontSize: vh * 1.6,
    color: COLORS.textBlackShade,
  },
  infoCardFooterLeft: {
    gap: vh * 0.9,

    alignItems: 'flex-start',
  },
  infoCardFooterRight: {
    alignItems: 'flex-end',
    gap: vh * 0.5,
  },
  dashboardContainerHeader: {
    flexDirection: 'row',
    // justifyContent: 'space-between',

    marginTop: vh * 1.3,
    gap: vw * 2,
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
    marginVertical: vh * 2,
    justifyContent: 'space-between',
    borderRadius: vw * 4,
    backgroundColor: COLORS.cardBackgroundBlue,
    width: vw * 36,
    marginRight: vw * 3,
    paddingHorizontal: vw * 3.5,
    // paddingVertical: vw * 2.5,
    height: vw * 36,
  },
  cardLogoContainer: {
    marginVertical: vh * 1,
    resizeMode: 'contain',
  },
  cardLogo: {
    // marginVertical: vh*1.5,
    width: vw * 15,
    height: vh * 10,
    resizeMode: 'contain',
  },
  cardContent: {
    marginBottom: vh,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  dashboardContainerCardText: {
    textAlign: 'left',
    fontSize: vw * 3.8,
    color: COLORS.white,
  },
  cardsArrow: {
    width: vw * 6,
    height: vw * 6,
    resizeMode: 'contain',
    alignItems: 'flex-end',
  },

  dashboardMeterContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  dashboardMeterDetail: {
    gap: vh * 1,
  },
  meterIcon: {
    width: vw * 4,
    height: vh * 2,
    resizeMode: 'contain',
  },
  meterDetailTextBold: {
    fontSize: vw * 7.5,
    textAlign: 'center',
    color: COLORS.black,
  },
  textRed: {
    color: COLORS.cardBackgroundRed,
    fontSize: vh * 2,
  },

  homeBackCardContainer: {
    backgroundColor: COLORS.white,
    justifyContent: 'space-between',
    // height: vh * 27,
    gap: vh,
  },
  homeBackInfoContainerHeader: {
    flexDirection: 'row',
  },
  homeBackCardHeading: {
    flexDirection: 'row',
    // gap: vw * 1,
    justifyContent: 'space-between',
    // borderWidth: 2,
  },
  homeBackCardHeadingBlack: {
    fontSize: vw * 4.5,
    color: COLORS.textBlackShade,
  },
  homeBackCardHeadingColor: {
    fontSize: vw * 4.5,
    color: COLORS.cardBackgroundRed,
  },
  homeBackCardText: {
    fontSize: vw * 3.7,
    textAlign: 'left',
    color: COLORS.textBlackShade,
    // borderWidth: 2,
    lineHeight: vh * 1.99,
  },
  homeBackCardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  homeBackCardRowText: {
    gap: vh * 0.7,
  },
  homeBackCardTextRow: {
    flexDirection: 'row',
    gap: vw * 7,
    marginTop: vh * -0.5,
  },

  backCardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  backCardFooterBox: {
    flexDirection: 'row',
    gap: vw * 2,
    alignItems: 'center',
  },
  backCardFooterText: {},
  backCardFooterIcon: {
    width: vw * 10,
    height: vh * 6,
    resizeMode: 'contain',
  },
  backCardFooterSecondIcon: {
    width: vw * 10,
    height: vh * 6,
    resizeMode: 'contain',
  },
  associatedContainer: {
    flexDirection: 'row',
    gap: '2%',
  },
  associatedTittle: {
    textAlign: 'left',
    marginVertical: vh * 2,
    fontSize: vh * 2.3,
    color: COLORS.textBlackShade,
  },
  associatedImageContainer: {
    width: '49%',
    padding: vw * 1,
    backgroundColor: COLORS.white,
    borderRadius: vh * 2.5,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  associatedImage: {
    width: vw * 30,
    height: vw * 20,
    resizeMode: 'contain',
  },
  meterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: vw * 3,
    marginBottom: vh * 2,
  },
  statisticsIcon: {
    width: vw * 8,
    height: vw * 8,
  },
  claimTittle: {
    fontSize: vw * 5,
    color: COLORS.textBlackShade,
  },
  totalDeducted: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: vw * 2,
  },
  claimStatistics: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: vw * 2,
  },
});
