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
    width: '45%',
  },
  benefitsLogo: {
    width: vh * 15,
    height: vh * 6,
    resizeMode: 'stretch',
  },

  MaximumTitle: {
    fontSize: vw * 6,
    textAlign: 'left',
    marginTop: vh * 1.5,
    color: '#004984',
  },
  BenefitsTitle: {
    fontSize: vw * 5.5,
    textAlign: 'left',
    color: '#EE2560',
  },
  coverage: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: vh * 3,
  },
  coverageTitle: {
    fontSize: vh * 2.3,
    color: COLORS.coverageTitle,
  },

  benefitTitle: {
    fontSize: vh * 2.3,
    color: COLORS.benefitTitle,
  },
  card: {
    width: '33.33%',
    alignItems: 'center',
    marginTop: vh * 2.5,
    paddingBottom: vh * 2.5,
    borderBottomColor: '#DADADA',
    borderBottomWidth: 1.5,
    borderStyle: 'dashed',
  },
  CardBox: {
    paddingVertical: vh * 1.5,
    paddingHorizontal: vh * 2.8,
    borderRadius: vh * 1.5,
    alignItems: 'center',
  },
  insuredTitle: {
    fontSize: vh * 1.6,
    color: COLORS.insuredPrice,
    marginVertical: vh * 1,
    fontWeight: '600',
    width: vh * 12,
  },
  insuredPrice: {
    fontSize: vh * 1.6,
    color: COLORS.insuredPrice,
    width: vh * 11,
  },
  flatListContainer: {
    backgroundColor: COLORS.white,
    paddingBottom: vh * 3,
  },
  CurvedView:{
    marginBottom: -vh * 4,
  },
  benefitsImage: {
    resizeMode: 'contain',
    height: "100%",
    width: '100%',
  },
  coverageCardImage: {
    height: vh * 4,
    width: vh * 4,
    tintColor:COLORS.white
  },
});

export default styles;
