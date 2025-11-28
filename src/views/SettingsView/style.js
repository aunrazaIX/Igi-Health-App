import {StyleSheet} from 'react-native';
import {vh, vw} from '../../assets/theme/dimension';
import {COLORS} from '../../assets/theme/colors';

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: vh * 2,
    paddingHorizontal: vw * 2,
    backgroundColor: COLORS.white,
    borderRadius: vh * 1,
    marginBottom: vh * 1,
  },
  label: {
    flex: 1,
    textAlign: 'left',
    fontSize: vh * 1.7,
    paddingHorizontal: vh * 2,
    color: COLORS.black,
  },
  arrowIcon: {
    width: vw * 5,
    height: vw * 5,
    resizeMode: 'contain',
  },
});

export default styles;
