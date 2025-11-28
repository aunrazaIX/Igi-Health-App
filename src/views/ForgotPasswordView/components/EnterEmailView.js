import React, { Fragment } from 'react';
import InputField from '../../../components/InputField';
import { icons } from '../../../assets';
import styles from '../styles';
import { StyleSheet } from 'react-native';
import { vh, vw } from '../../../assets/theme/dimension';
import { COLORS } from '../../../assets/theme/colors';

const EnterEmailView = ({ setterForApiData, apiData, ForgotPasswordLoading }) => {
  return (
    <Fragment>
      <InputField
        iconViewStyle={styles.iconView}
        rightIcon={icons.mobNumber}
        labelStyle={style.labelStyle}
        inputStyle={style.inputStyle}
        label="Mobile Number"
        placeholder="Enter Your Mobile Number"
        containerStyle={style.inputContainer}
        value={apiData?.cellNumber}
        keyboardType="phone-pad"
        onChangeText={text => {}}
        errorMessage={apiData?.error_cellNumber}
        maxLength={13}
        editable={!ForgotPasswordLoading}
      />

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

      <InputField
        iconViewStyle={styles.iconView}
        rightIcon={icons.cnic}
        labelStyle={style.labelStyle}
        inputStyle={style.inputStyle}
        label="CNIC Number"
        placeholder="Enter Your CNIC Number"
        containerStyle={style.inputContainer}
        value={apiData?.cnic}
        onChangeText={text => {}}
        keyboardType="number-pad" 
        editable={!ForgotPasswordLoading}
        errorMessage={apiData?.error_cnic}
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
