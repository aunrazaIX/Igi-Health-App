import {StyleSheet} from 'react-native';
import {vw} from '../../assets/theme/dimension';
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
  unreadArrow:{
    width: vw * 3,
    height: vw * 3
  },
  markAs:{
    fontSize: vw * 3.5
  },
  markAsRow:{
    flexDirection: 'row',
    alignItems: 'center',
    gap: vw * 1
  },
  checkIcon:{
    width: vw * 4,
    height: vw * 4
  }
});

export default styles;
