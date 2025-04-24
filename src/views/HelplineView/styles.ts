import {StyleSheet} from 'react-native';
import {vh, vw} from '../../assets/theme/dimension';
import {COLORS} from '../../assets/theme/colors';

const styles = StyleSheet.create({
  container: {
    paddingTop: vh * 3,
  },
  box: {
    padding: vh * 1.5,
    paddingTop: vh * 2.5,
    borderRadius: vh * 2,
    marginVertical: vh,
    borderWidth: 2,
    borderColor: COLORS.borderColor + 88,
    // shadowColor: '#000',
    // shadowOffset: {
    // width: 0,
    // height: 1,
    // },
    // shadowOpacity: 0.08,
    // shadowRadius: 1.5,
    // elevation: 5,
  },
  title: {
    fontSize: vh * 2,
    marginBottom: vh,
    textAlign: 'left',
    color: COLORS.black,
  },
  subtitle: {
    fontSize: vh * 1.5,
    textAlign: 'left',
  },
  label: {
    fontSize: vh * 1.7,
    textAlign: 'left',
  },
  subHeading: {
    fontSize: vh * 1.5,
    textAlign: 'left',
    marginTop: vh * 1.5,
  },
  address: {
    marginTop: vh * 2,
    fontSize: vh * 1.5,
  },
  name: {
    fontSize: vh * 2,
    textAlign: 'left',
    marginBottom: vw,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: vh * 1.5,
  },
  icon: {
    objectFit: 'contain',
    width: vh * 2.8,
    height: vh * 2.8,
  },
  actionBtn: {
    padding: vh,
    paddingHorizontal: vh * 3,
    borderRadius: vh * 2,
    borderWidth: 2,
    borderColor: COLORS.borderColor + 88,
    justifyContent: 'center',
    alignItems: 'center',
  },
  email:{
    fontSize: vh * 1.5,
    textAlign: 'left',
    textDecorationLine: 'underline',
    marginBottom: vh,
  }
});

export default styles;
