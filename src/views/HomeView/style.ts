import {StyleSheet} from 'react-native';
import {vh, vw} from '../../assets/theme/dimension';
import {COLORS} from '../../assets/theme/colors';

export const styles = StyleSheet.create({
  homeContainer: {
    // borderWidth: 2,
    // flex: 1,
    backgroundColor: COLORS.white,
  },
  gradient: {
    // height: '58%',
    paddingBottom: vh * 2,
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
  dashboardContainer: {
    marginHorizontal: vw * 4,
    marginBottom: vh * 4,
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
    // height: '70%',
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

  homeBackCardContainer: {
    marginTop: vh * 4,
    marginHorizontal: vw * 4,
    paddingHorizontal: vw * 5,
    paddingVertical: vh * 2,
    borderRadius: vw * 4,
    backgroundColor: COLORS.white,
    elevation: 5,
    gap: vh * 0.9,
  },
  homeBackInfoContainerHeader: {
    flexDirection: 'row',
  },
  homeBackCardHeading: {
    flexDirection: 'row',
    gap: vw * 1,
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
    fontSize: vw * 3.5,
    textAlign: 'left',
    color: COLORS.textBlackShade,
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
    width: vw * 8,
    height: vh * 5,
    resizeMode: 'contain',
  },
  backCardFooterSecondIcon: {
    width: vw * 7,
    height: vh * 4,
    resizeMode: 'contain',
  },
  associatedContainer: {
    flexDirection: 'row',
    gap: '2%',
  },
  associatedTittle: {
    textAlign: 'left',
    marginVertical: vh * 2,
    fontSize: vw * 6,
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
});
