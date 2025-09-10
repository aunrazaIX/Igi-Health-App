import {StyleSheet} from 'react-native';
import {COLORS} from '../../assets/theme/colors';
import {vh, vw} from '../../assets/theme/dimension';

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: vh * 4.5,
    height: vh * 4.5,
    marginRight: 10,
  },
  headerText: {
    flex: 1,
    textAlign: 'left',
    fontSize: vh * 1.8,
    color: COLORS.insuredPrice,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailLabel: {
    fontSize: vh * 1.6,
    color: COLORS.personalLabel,
  },
  detailvalue: {
    fontSize: vh * 1.6,
    color: COLORS.personalValue,
  },
  details: {
    marginTop: 10,
    borderTopWidth: 2,
    borderTopColor: COLORS.dependentBorder,

    paddingTop: vh * 1,
    gap: vh * 1.5,
  },
  detailsListContainer: {
    gap: vh * 1.5,
  },

  priorGradient: {
    marginTop: vh * 1,
    borderRadius: vh * 1.5,
    padding: vh * 2,
  },
  priorTouchable: {},

  priorNext: {
    textAlign: 'center',
    color: COLORS.white,
    fontSize: vh * 2,
  },
  container: {
    // height: '100%',
    // justifyContent: 'space-between',
    // paddingBottom: vh * 30
  },
  curvedStyles: {
    paddingBottom: vh * 22,
  },
});

export default styles;
