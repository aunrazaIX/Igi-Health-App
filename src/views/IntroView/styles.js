import {StyleSheet} from 'react-native';
import {vh, vw} from '../../assets/theme/dimension';
import {COLORS} from '../../assets/theme/colors';

const styles = StyleSheet.create({
  backgroundImage: {
    width: vw * 100,
    height: vh * 100,
    resizeMode: 'stretch',
  },
});

export default styles;
