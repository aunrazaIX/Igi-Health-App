import {StyleSheet} from 'react-native';
import {vh, vw} from '../../assets/theme/dimension';
import {COLORS} from '../../assets/theme/colors';

const styles = StyleSheet.create({
  backgroundImage: {
    width: vw * 100,
    height: vh * 100,
    resizeMode: 'stretch',
  },
  buttonContainer: {
    width: vw * 22,
    height: vh * 3.3,
    backgroundColor: COLORS.cardBackgroundLightBlue,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: vw * 5,
    marginTop: vh,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: vw * 3,
  },
});

export default styles;
