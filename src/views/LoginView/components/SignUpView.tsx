import React from 'react';
import { InputField, Button, AileronSemiBold } from '../../../components';
import { styles } from '../styles';
import { icons } from '../../../assets';
import { vh, vw } from '../../../assets/theme/dimension';
import { StyleSheet, View } from 'react-native';
import { validateCNIC, validateEmail, validateMobileNumber } from '../../../validations/authValidations';

const SignUpView = ({
  handleSignup,
  signupSetterForApiData,
  signupApiData,
  loadingSignup,
}: {
  handleSignup: () => void;
  signupSetterForApiData: (key: string, value: string) => void;
  signupApiData: any;
  loadingSignup: boolean;
}
) => {

  return (
    <>
      <AileronSemiBold
        numberOfLines={2}
        name={
          'Enter your email or CNIC Number and create a secure password to register.'
        }
        style={styles.loginContainerText}
      />
      <InputField
        containerStyle={style.inputContainer}
        labelStyle={style.labelStyle}
        inputStyle={style.inputStyle}
        label="Mobile Number"
        placeholder="Enter Mobile Number"
        rightIcon={icons.cnic}
        onChangeText={(text) => {
          signupSetterForApiData('cellNumber', text);
          const errorMsg = validateMobileNumber(text);
          signupSetterForApiData('error_cellNumber', errorMsg);
        }}
        value={signupApiData?.cellNumber}
        errorMessage={signupApiData?.error_cellNumber}
        keyboardType="numeric"
        mask={[
          /\d/,
          /\d/,
          /\d/,
          /\d/,
          /\d/,
          /\d/,
          /\d/,
          /\d/,
          /\d/,
          /\d/,
          /\d/,
          /\d/,
        ]}
      />
      <InputField
        containerStyle={style.inputContainer}
        labelStyle={style.labelStyle}
        inputStyle={style.inputStyle}
        label="Your Email"
        placeholder="Enter Email Address"
        rightIcon={icons.email}
        onChangeText={(text) => {
          signupSetterForApiData('email', text);
          const errorMsg = validateEmail(text);
          signupSetterForApiData('error_email', errorMsg);
        }}
        value={signupApiData?.email}
        errorMessage={signupApiData?.error_email}
      />

      <InputField
        label="CNIC Number"
        placeholder="Enter cnic"
        rightIcon={icons.cnic}
        onChangeText={(text) => {
          signupSetterForApiData('cnic', text);
          const errorMsg = validateCNIC(text);
          signupSetterForApiData('error_cnic', errorMsg);
        }}
        value={signupApiData?.cnic}
        errorMessage={signupApiData?.error_cnic}
        mask={[
          /\d/,
          /\d/,
          /\d/,
          /\d/,
          /\d/,
          '-',
          /\d/,
          /\d/,
          /\d/,
          /\d/,
          /\d/,
          /\d/,
          /\d/,
          '-',
          /\d/,
        ]}
      />
      <View style={style.signupTextContainer} >

        <View style={style.signupText}>
          <AileronSemiBold name='•' style={styles.loginContainerText} />

          <AileronSemiBold
            numberOfLines={3}
            name={
              "Minimum length of 8 characters, including at least one uppercase letter, one number, and one special character."
            }
            style={styles.loginContainerText}
          />

        </View>

        <View style={style.signupText}>
          <AileronSemiBold name='•' style={styles.loginContainerText} />

          <AileronSemiBold
            numberOfLines={3}
            name={
              "Special characters can include digits and punctuation (e.g., !@#$%^&*()_+|~-={}[]:;'<>?,./)."
            }
            style={styles.loginContainerText}
          />

        </View>

        <View style={style.signupText}>
          <AileronSemiBold name='•' style={styles.loginContainerText} />

          <AileronSemiBold
            numberOfLines={3}
            name={
              "Case sensitivity is mandatory."
            }
            style={styles.loginContainerText}
          />

        </View>
      </View>

      <Button containerStyle={styles.loginButton} name="Create Account" onPress={handleSignup} loading={loadingSignup} disabled={loadingSignup ? true : false} />
    </>
  );
};

export default SignUpView;

const style = StyleSheet.create({
  inputContainer: {
    // borderWidth: 2,
    // flexDirection: 'column',

    // paddingHorizontal: vw * 1,
  },
  labelStyle: {
    // fontSize: vw * 3,
    // color: COLORS.textGrayShade,
  },
  inputStyle: {
    // fontSize: vw * 3.5,
    // fontWeight: '700',
  },
  inputFeilds: {
    marginTop: vh * 3,
  },

  style: {
    fontSize: vw * 3.5,
  },
  signupText: {
    flexDirection: "row",
    gap: vw * 2,
    width: "100%"
  },
  signupTextContainer: {
    marginTop: vh * 2,
  }
});
