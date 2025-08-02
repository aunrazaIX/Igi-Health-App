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
  },
  notificationTittle: {
    fontSize: vw * 3.5,
    color: COLORS.textBlackShade,
  },
  unread: {
    fontSize: vw * 3.5,
    marginLeft: vw * 2,
    color: COLORS.unread,
  },
  unreadselectRow: {
    flexDirection: 'row',
    alignItems: 'center',
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
  },
  checkIcon: {
    width: vw * 4,
    height: vw * 4,
  },
  notificationContainer: {
    borderBottomWidth: vw * 0.3,
    borderColor: COLORS.borderColor,
    paddingVertical: vh,
  },
  notificationIconRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
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
    marginLeft: vw * 4,
    marginTop: vh * 0.5,
    color: COLORS.time,
    textAlign: 'left',
  },
  requestTittle: {
    width: '55%',
    fontSize: vw * 3.7,
    marginLeft: vw * 4,
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
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 3,
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
  notificationStyles: {
    paddingBottom: vh * 20,
  },
  notificationBody: {
    width: '55%',
    textAlign: 'left',
    marginLeft: vw * 4,
    fontSize: vw * 3,
    marginTop: vh,
  },
  markAsReadView: {
    width: '25%',
    marginLeft: vw * 4,
  },
  markAseadText: {
    fontSize: vw * 3.5,
    textDecorationLine: 'underline',
    color: COLORS.black + '88',
    textAlign: 'left',
    marginTop: vh * 0.5,
  },
  selectContainer: {
    width: '40%',
    alignSelf: 'flex-end',
    height: vh * 5,
    borderRadius: vw,
  },
});

export default styles;
