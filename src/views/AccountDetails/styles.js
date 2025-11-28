import {StyleSheet} from 'react-native';
import {vh, vw} from '../../assets/theme/dimension';
import {COLORS} from '../../assets/theme/colors';

const styles = StyleSheet.create({
  personalImage: {
    resizeMode: 'contain',
    width: '100%',
    height: vh * 20,
  },
  secureTextGrp: {
    height: '100%',
    justifyContent: 'center',
    padding: vh * 0.5,
  },

  secureText: {
    color: COLORS.coverageTitle,
    textAlign: 'left',
    fontSize: vh * 2.75,
  },
  futureText: {
    color: COLORS.benefitTitle,
    textAlign: 'left',
    fontSize: vh * 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: vw * 2,
  },
  avatar: {
    resizeMode: 'contain',
    width: vh * 4.5,
    height: vh * 4.5,
  },
  headerText: {
    flex: 1,
    textAlign: 'left',
    fontSize: vh * 1.8,
    color: COLORS.insuredPrice,
  },
  boxContainer: {
    padding: vh,
    width: '100%',
    alignSelf: 'center',
    borderRadius: vh * 2,
    elevation: 3,
    backgroundColor: COLORS.white,
    shadowColor: '#000',
    shadowOpacity: 0.14,
    shadowOffset: {width: 0, height: 1},
    shadowRadius: 2,
    marginTop: vh * 2,
  },
  field: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  details: {
    marginTop: vh * 0.5,
    borderTopWidth: 2,
    borderTopColor: COLORS.dependentBorder,
    paddingTop: vh * 1,
    rowGap: vh * 0.3,
  },
  detailLabel: {
    fontSize: vh * 1.4,
    color: COLORS.personalLabel,
  },
  detailvalue: {
    fontSize: vh * 1.4,
    color: COLORS.personalValue,
    maxWidth: vw * 50,
  },
  description: {
    color: COLORS.black,
    marginTop: vh,
    textAlign: 'center',
    fontSize: vw * 3,
  },
  disclaimer: {
    color: COLORS.black,
    marginTop: vh,
    textAlign: 'center',
    fontSize: vw * 3,
    fontStyle: 'italic',
  },
});

export default styles;
