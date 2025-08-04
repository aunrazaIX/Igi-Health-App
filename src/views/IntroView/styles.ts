import {StyleSheet} from 'react-native';
import {vh, vw} from '../../assets/theme/dimension';
import {COLORS} from '../../assets/theme/colors';

const styles = StyleSheet.create({
  IntroImage: {
    height: vh * 50,
    width: vw * 100,
  },
  text: {
    // marginTop: vh * 2,
    // textAlign: 'left',
    // justifyContent: 'flex-start',

    paddingLeft: vw * 4.5,
    alignItems: 'flex-start',
  },

  headingText: {
    fontSize: vw * 8.5,

    marginTop: vh,

    alignItems: 'flex-start',
  },
  headingTextPink: {
    fontSize: vw * 8,
    marginTop: vh,
    color: COLORS.cardBackgroundRed,
    alignItems: 'flex-start',
  },
  dashLine: {
    borderBottomWidth: 2,
    borderBottomColor: COLORS.black + '44',
    borderStyle: 'dashed',
    width: '95%',
    // alignSelf: 'center',

    marginTop: vh * 3,
  },
  paraTextContainer: {
    marginTop: vh * 1.5,
  },
  paraText: {
    fontSize: vw * 4.8,
    color: COLORS.black,
    alignItems: 'flex-start',
    textAlign: 'left',
  },
  buttonContainer: {
    marginTop: vh * 1.5,
  },
  button: {
    // borderWidth: 2,
    width: vw * 40,
    // marginBottom: vh * 2,
  },
  buttonText: {
    fontSize: vw * 5,
  },
});

export default styles;
