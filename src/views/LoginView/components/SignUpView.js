import React from 'react';
import { InputField, Button, AileronSemiBold } from '../../../components';
import { styles } from '../styles';
import { icons } from '../../../assets';
import { vh, vw } from '../../../assets/theme/dimension';
import { StyleSheet } from 'react-native';

const SignUpView = ({
  handleSignup,
  signupSetterForApiData,
  signupApiData,
  loadingSignup,
}) => {
  return (
    <>
      <AileronSemiBold
        numberOfLines={2}
        name="Please enter the required information below to create your account."
        style={styles.loginContainerText}
      />

      <InputField
        containerStyle={style.inputContainer}
        labelStyle={style.labelStyle}
        inputStyle={style.inputStyle}
        allowCopyPaste={true}
        label="Mobile Number"
        placeholder="Enter Mobile Number"
        rightIcon={icons.mobNumber}
        onChangeText={text => {
          signupSetterForApiData('cellNumber', text);
        }}
        value={signupApiData?.cellNumber}
        errorMessage={
          signupApiData?.error_cellNumber
            ? signupApiData.error_cellNumber.charAt(0).toUpperCase() +
              signupApiData.error_cellNumber.slice(1)
            : ''
        }
        editable={!loadingSignup}
        keyboardType="numeric"
        mask={[
          /\d/, /\d/, /\d/, /\d/, /\d/, /\d/,
          /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/,
        ]}
        inputMode="numeric"
      />

      <InputField
        containerStyle={style.inputContainer}
        labelStyle={style.labelStyle}
        inputStyle={style.inputStyle}
        label="Your Email"
        placeholder="Enter Your Official Email Address"
        allowCopyPaste={true}
        rightIcon={icons.email}
        onChangeText={text => {
          signupSetterForApiData('email', text);
        }}
        value={signupApiData?.email}
        errorMessage={
          signupApiData?.error_email
            ? signupApiData.error_email.charAt(0).toUpperCase() +
              signupApiData.error_email.slice(1)
            : ''
        }
        editable={!loadingSignup}
        inputMode="email"
      />

      <InputField
        label="CNIC Number"
        placeholder="Enter CNIC"
        allowCopyPaste={true}
        labelStyle={style.labelStyle}
        rightIcon={icons.cnic}
        keyboardType="numeric"
        onChangeText={text => {
          signupSetterForApiData('cnic', text);
        }}
        value={signupApiData?.cnic}
        errorMessage={
          signupApiData?.error_cnic
            ? signupApiData.error_cnic.charAt(0).toUpperCase() +
              signupApiData.error_cnic.slice(1)
            : ''
        }
        mask={[
          /\d/, /\d/, /\d/, /\d/, /\d/, '-',
          /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, '-',
          /\d/,
        ]}
        editable={!loadingSignup}
      />

      <Button
        containerStyle={styles.loginButton}
        name="Create Account"
        onPress={() => {
            handleSignup('ForgotPassword');
          }}
        loading={loadingSignup}
      />
    </>
  );
};

export default SignUpView;

const style = StyleSheet.create({
  inputContainer: {},
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
  signupText: {
    flexDirection: 'row',
    gap: vw * 2,
    width: '100%',
  },
  signupTextContainer: {
    marginTop: vh * 2,
  },
});
