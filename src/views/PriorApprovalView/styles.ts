import {StyleSheet} from 'react-native';
import {COLORS} from '../../assets/theme/colors';
import {vh, vw} from '../../assets/theme/dimension';

const styles = StyleSheet.create({
  Patient: {
    textAlign: 'left',
  },
  selectBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectText: {
    color: COLORS.personalValue,
    fontSize: vh * 1.7,
  },
  arrow: {
    width: vh * 2,
    height: vh * 2,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: 'transparent',
    borderRadius: 12,
    marginTop: 4,
    backgroundColor: COLORS.white,
    elevation: 3,
    zIndex: 10,
  },
  dropdownItem: {
    padding: 12,
    borderBottomWidth: 2,
    borderBottomColor: COLORS.dependentBorder,
  },
  listText: {
    textAlign: 'left',
    fontSize: vh * 1.7,
  },
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
    borderStyle: 'dashed',
    paddingTop: vh * 1,
  },
  detailsListContainer: {
    gap: vh * 1.5,
  },

  priorGradient: {
    marginTop: vh * 3,
    borderRadius: vh * 1.5,
    padding: vh * 2
  },
  priorTouchable: {

  },

  priorNext: {
    textAlign: 'center',
    color: COLORS.white,
    fontSize: vh * 2
  },
});

export default styles;
