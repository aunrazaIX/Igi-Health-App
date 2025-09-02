import {StyleSheet} from 'react-native';
import {COLORS} from '../../assets/theme/colors';
import {vh, vw} from '../../assets/theme/dimension';

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.black + '66',
  },
  modalContainer: {
    padding: vw * 5,
    backgroundColor: 'white',
    borderRadius: vw * 6,
    width: '80%',
  },
  label: {
    fontSize: vw * 3.5,
    marginBottom: vh * 2,
  },
  buttonContainer: {
    height: vh * 4,
    width: vw * 30,
    borderRadius: vw * 50,
    justifyContent: 'center',
  },
  signoutButton: {
    backgroundColor: COLORS.cardBackgroundRed,
  },
  stayinButton: {
    backgroundColor: COLORS.cardBackgroundLightBlue,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: vw * 3,
  },
});

export default styles;
