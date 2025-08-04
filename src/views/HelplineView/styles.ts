import {StyleSheet} from 'react-native';
import {vh, vw} from '../../assets/theme/dimension';
import {COLORS} from '../../assets/theme/colors';

const styles = StyleSheet.create({
  container: {
    paddingTop: vh * 3,
    paddingBottom: vh * 24,
  },
  box: {
    backgroundColor: COLORS.white,

    padding: vh * 2,
    borderRadius: vh * 2,
    marginVertical: vh,
    borderWidth: vh * 0.3,
    borderColor: COLORS.borderColor + 88,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },

    shadowOpacity: 0.08,
    shadowRadius: 1.5,
    elevation: 5,
  },
  title: {
    fontSize: vw * 5.5,
    marginBottom: vh * 2,
    textAlign: 'left',
    color: COLORS.textBlackShade,
  },
  subtitle: {
    fontSize: vw * 5,
    textAlign: 'left',
  },
  label: {
    fontSize: vh * 1.7,
    textAlign: 'left',
  },
  subHeading: {
    fontSize: vw * 5,
    textAlign: 'left',
    marginTop: vh * 1.5,
  },
  headingText: {
    fontSize: vw * 3.5,
    textAlign: 'left',
    marginTop: vh * 1.5,
  },
  address: {
    marginTop: vh * 2,
    fontSize: vw * 5,
    textAlign: 'left',
  },
  name: {
    fontSize: vh * 2,
    textAlign: 'left',
    marginBottom: vw,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: vh * 1.5,
  },
  icon: {
    objectFit: 'contain',
    width: vw * 8,
    height: vw * 8,
  },
  actionBtn: {
    paddingVertical: vw * 3,
    borderRadius: vh * 2.5,
    borderWidth: 2,
    borderColor: COLORS.borderColor + 88,
    justifyContent: 'center',
    alignItems: 'center',
    width: '31%',
    gap: vh,
  },
  email: {
    fontSize: vw * 3.8,
    textAlign: 'left',
    textDecorationLine: 'underline',
    marginBottom: vh,
  },
  addressDetail: {
    fontSize: vw * 3.7,
    textAlign: 'left',
  },
  callTittle: {
    fontSize: vw * 3.3,
    color: COLORS.confimationDetail,
  },
});

export default styles;
