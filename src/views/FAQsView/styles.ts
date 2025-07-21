import {StyleSheet} from 'react-native';
import {vh, vw} from '../../assets/theme/dimension';
import {COLORS} from '../../assets/theme/colors';

const styles = StyleSheet.create({
  accordion: {
    // marginBottom: vh * 2,
    borderRadius: vh * 4,
  },
  wrapper: {
    padding: vh * 3.5,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: vw * 4,
    textAlign: 'left',
    color: COLORS.black,
    width: '100%',
    lineHeight: vh * 3,
  },
  headertitle: {
    fontSize: vw * 4.5,
    color: COLORS.black,
    textAlign: 'left',
  },
  faqsSubHeading: {
    fontSize: vw * 4.5,
    color: COLORS.faqsSubHeading,
    marginBottom: vh * 2,
    textAlign: 'left',
    lineHeight: vh * 3,
  },
  icon: {
    objectFit: 'contain',
    width: vw * 3.5,
  },
  detailsContainer: {
    marginTop: vh,
  },
  description: {
    color: COLORS.black,
    fontSize: vw * 3.2,
    textAlign: 'left',
  },
});

export default styles;
