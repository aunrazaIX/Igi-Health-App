import React, { Fragment } from 'react';
import { icons } from '../../../assets';
import styles from '../styles';
import { StyleSheet } from 'react-native';
import { vh, vw } from '../../../assets/theme/dimension';
import { InputField } from '../../../components';

const EnterEmailView = ({ setterForApiData, apiData, ForgotPasswordLoading }) => {
  return (
    <Fragment>
      <InputField
        iconViewStyle={styles.iconView}
        rightIcon={icons.email}
        labelStyle={style.labelStyle}
        inputStyle={style.inputStyle}
        label="Your Email"
        placeholder="Enter Your Official Email Address"
        containerStyle={style.inputContainer}
        value={apiData?.email}
        onChangeText={text => {}}
        errorMessage={apiData?.error_email}
        editable={!ForgotPasswordLoading}
      />
    </Fragment>
  );
};

export default EnterEmailView;

const style = StyleSheet.create({
  inputContainer: {
    borderWidth: 2,
  },
  labelStyle: {
    fontSize: vw * 3.5,
  },
  inputStyle: {
    fontSize: vw * 3.5,
  },
  inputFeilds: {
    marginTop: vh * 3,
  },
  style: {
    fontSize: vw * 3.5,
  },
});
