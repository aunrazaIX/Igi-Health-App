import {StyleSheet} from 'react-native';
import {vh, vw} from '../../assets/theme/dimension';
import { COLORS } from '../../assets/theme/colors';

const styles = StyleSheet.create({
  curvedStyles: {
    paddingBottom: vh * 23,
  },
  container: {
    flex: 1,
  },
  addIcon: {
    position: 'absolute',
    right: 0,
    top: vh * 10,

    height: vh * 4,
    width: vw * 15,
  },
  addIconInherit: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
  curveStyle: {
    height: 80.9 * vh,
    paddingBottom: vh * 12,
  },
  addTreatment: {
    resizeMode: 'contain',
  },
});

export default styles;
