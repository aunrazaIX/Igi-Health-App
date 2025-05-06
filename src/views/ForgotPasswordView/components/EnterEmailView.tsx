import React, {Fragment} from 'react';
import InputField from '../../../components/InputField';
import {icons} from '../../../assets';
import styles from '../styles';
import { StyleSheet } from 'react-native';
import { vh, vw } from '../../../assets/theme/dimension';
import { COLORS } from '../../../assets/theme/colors';



const EnterEmailView = () => {
  return (
    <Fragment>
      <InputField
        iconViewStyle={styles.iconView}
        rightIcon={icons.email}
        labelStyle={style.labelStyle}
        inputStyle={style.inputStyle}
        placeholder="Your Email"
        label='Enter your email Address'
        containerStyle={style.inputContainer}

      />
    </Fragment>
  );
};
export default EnterEmailView;

const style = StyleSheet.create({
  inputContainer: {
    borderWidth: 2,
    flexDirection: 'column',

    paddingHorizontal: vw * 1,
  },
  labelStyle: {
    fontSize: vw * 3,
    color: COLORS.textGrayShade,
  },
  inputStyle: {
    fontSize: vw * 3.5,
    fontWeight: '700',
  },
  inputFeilds: {
    marginTop: vh * 3,
  },

  style: {
    fontSize: vw * 3.5,
  },
});