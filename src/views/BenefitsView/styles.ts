import {StyleSheet} from 'react-native';
import {vh, vw} from '../../assets/theme/dimension';
import {COLORS} from '../../assets/theme/colors';

const styles = StyleSheet.create({
  BenefitsGradients: {
    borderRadius: vw * 3,
    marginTop: vh * 3,
    height: vh * 22,
  },
  Maximum: {
    height: '100%',
    flexDirection: 'row',
    width: '100%',
  },
  MaximumLeftBox: {
    width: '55%',
    paddingVertical: vh * 2.5,
    paddingLeft: vh * 2.5,
  },
  MaximumRightBox: {
    width: '53%',
    height: vh * 22,
  },
  benefitsLogo: {
    width: vh * 15,
    height: vh * 6,
    resizeMode: 'stretch',
  },

  MaximumTitle: {
    fontSize: vh * 2.7,
    textAlign: 'left',
    marginTop: vh * 1.5,
    color: '#004984',
  },
  selectedTitle: {
    fontSize: vh * 2.7,
    textAlign: 'left',
    color: COLORS.benefitTitle,
  },
  BenefitsTitle: {
    fontSize: vw * 5.5,
    textAlign: 'left',
    color: '#004984',
  },
  coverage: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: vh * 3,
    // lineHeight: vh * 3,
  },
  coverageTitle: {
    fontSize: vh * 2.3,
    color: COLORS.coverageTitle,
  },

  benefitTitle: {
    fontSize: vh * 2.3,
    color: COLORS.benefitTitle,
  },
  mapTabsContainer: {
    flexDirection: 'row',
    gap: vw * 1.5,
    marginBottom: vh,
    marginTop: vh * 2,

    alignItems: 'center',
    justifyContent: 'center',
  },
  mapTabsContainerList: {
    gap: vw * 5,

    width: '100%',
    justifyContent: 'center',
  },
  activeMapTab: {
    // borderWidth: 2,
    paddingVertical: vh * 1.2,
    paddingHorizontal: vw * 2,
  },
  card: {
    width: '33.33%',
    alignItems: 'center',
    marginTop: vh * 2.5,
    paddingBottom: vh * 2.5,
  },
  seperator: {
    width: '100%',
    borderBottomWidth: 1,
    borderStyle: 'dashed',
    borderBottomColor: COLORS.black + '44',
    marginVertical: vh * 1,
  },
  CardBox: {
    borderRadius: vh * 1.5,
  },
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: COLORS.cardBackgroundRed,
    paddingVertical: vh * 1.5,
    paddingHorizontal: vh * 2.8,
    // borderRadius: vh * 1.5,
  },
  disabled: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'gray',
    paddingVertical: vh * 1.5,
    paddingHorizontal: vh * 2.8,
    borderRadius: vh * 1.5,
  },
  insuredTitle: {
    fontSize: vh * 1.6,
    color: COLORS.insuredPrice,
    marginVertical: vh * 1,
    fontWeight: '600',
    width: vh * 12,
    // backgroundColor: 'red',
  },
  insuredTitleCovered: {
    fontSize: vh * 1.6,
    color: COLORS.cardBackgroundRed,
    marginVertical: vh * 1,
    fontWeight: '800',
    width: vh * 12,
    // borderWidth: 2,
  },
  insuredPrice: {
    fontSize: vh * 1.67,
    color: COLORS.insuredPrice,
    width: vh * 11,
  },
  flatListContainer: {
    backgroundColor: COLORS.white,
  },
  CurvedView: {
    marginBottom: -vh * 4,
  },
  benefitsImage: {
    resizeMode: 'contain',
    height: '100%',
    width: '90%',
  },
  coverageCardImage: {
    height: vh * 4,
    width: vh * 4,
    tintColor: COLORS.white,
    resizeMode: 'contain',
  },
});

export default styles;
