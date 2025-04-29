import {StyleSheet} from 'react-native';
import {vh, vw} from '../../assets/theme/dimension';
import {COLORS} from '../../assets/theme/colors';

const styles = StyleSheet.create({
  BellIcon: {
    width: vw * 7,
    height: vw * 7,
  },
  notificationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: vh * 1.5,
    marginHorizontal: vh * 0.5,
  },
  notificationSelectRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: vw * 3,
  },
  notificationTittle: {
    fontSize: vw * 4.3,
    color: COLORS.textBlackShade,
  },
  unread: {
    fontSize: vw * 4,
    color: COLORS.unread,
  },
  unreadselectRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: vw * 2,
  },
  unreadArrow: {
    width: vw * 3,
    height: vw * 3,
  },
  markAs: {
    fontSize: vw * 3.5,
  },
  markAsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: vw * 1,
  },
  checkIcon: {
    width: vw * 4,
    height: vw * 4,
  },
  notificationContainer: {
    gap: vh * 1,
    paddingVertical: vh * 2,
    borderBottomWidth: vw * 0.3,
    borderColor: COLORS.borderColor,
  },
  notificationIconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: vw * 3,
  },
  icon: {
    width: vw * 11,
    height: vw * 11,
  },
  claimRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '85%',
  },
  date: {
    fontSize: vw * 3.5,
    marginLeft: vw * 11,
    color: COLORS.time,
    textAlign: 'left',
  },
  requestTittle: {
    fontSize: vw * 4.4,
    fontWeight: '700',
    textAlign: 'left',
  },
  requestRow: {
    flexDirection: 'row',
    textAlign: 'left',
  },

  dropdown: {
    borderWidth: 1,
    borderColor: 'transparent',
    borderRadius: 12,
    backgroundColor: COLORS.white,
    elevation: 3,
    zIndex: 10,
    position: 'absolute',
    top: '100%',
    width: vw * 20,
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
});

export default styles;
