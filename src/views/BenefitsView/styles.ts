import {StyleSheet} from 'react-native';
import {vh, vw} from '../../assets/theme/dimension';
import {COLORS} from '../../assets/theme/colors';
import Benefits from '../../screens/Benefits';

const styles = StyleSheet.create({
  BenefitsGradients: {
    borderRadius: vw * 3,
  },
  Maximum: {
    flexDirection: 'row',
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
    width: vh * 12,
    height: vh * 4.5,
    resizeMode: 'contain',
  },
  MaximumTitle: {
    fontSize: vh * 2.7,
    textAlign: 'left',
    marginTop: vh * 1.5,
    color: '#004984',
  },
  BenefitsTitle: {
    fontSize: vh * 2.5,
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
    color: '#004984',
  },

  benefitTitle: {
    fontSize: vh * 2.3,
    color: '#EE2560',
  },
  card: {
    width: '33.33%',
    alignItems: 'center',
    marginTop: vh * 3,
    paddingBottom: vh * 5,
    borderBottomColor: '#DADADA',
    borderBottomWidth: 1.5,
    borderStyle: 'dashed'
  },
  CardBox: {
    paddingVertical: vh * 2,
    paddingHorizontal: vh * 3,
    borderRadius: vh * 2,
    alignItems: 'center',
  },
  insuredTitle: {
    fontSize: vh * 1.8,
    color: '#121212',
    marginVertical: vh * 1,
  },
  insuredPrice: {
    fontSize: vh * 1.8,
    color: '#121212',
  },
  flatListContainer:{
    paddingBottom: vh * 16,
  }
});

export default styles;
