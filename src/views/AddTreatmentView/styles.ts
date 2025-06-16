import {StyleSheet} from 'react-native';
import {COLORS} from '../../assets/theme/colors';
import {vh, vw} from '../../assets/theme/dimension';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  borderCircle: {
    height: vw * 10,
    width: vw * 10,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelCircle: {
    height: vw * 10,
    width: vw * 10,
    resizeMode: 'contain',
  },
  image: {
    height: vw * 18,
    width: vw * 18,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: vh * 2,
  },
  curveStyle: {
    paddingBottom: vh * 3,
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: vw * 6,
  },
  inputContainer: {
    borderWidth: 2,
    flexDirection: 'column',
    paddingHorizontal: vw * 1,
  },

  priorGradient: {
    width: '100%',
    borderRadius: vh * 1.5,
    marginBottom: vh * 1.5,
  },
  wrapper: {padding: vh * 2},
  priorNext: {
    textAlign: 'center',
    color: COLORS.white,
    fontSize: vh * 2,
  },
  cancelButtonwrapper: {
    width: '100%',
    borderRadius: vh * 1.5,
    padding: vh * 2,
    backgroundColor: COLORS.black + 10,
    color: COLORS.black + 88,
  },
  cancelText: {
    color: COLORS.black + 88,
    fontSize: vh * 2,
  },
});

export default styles;
