import React from 'react';
import {
  AileronBold,
  AileronSemiBold,
  Button,
  CheckBox,
  InputField,
} from '../../../components';
import { styles } from '../styles';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { icons } from '../../../assets';
import { vh, vw } from '../../../assets/theme/dimension';
import { COLORS } from '../../../assets/theme/colors';
import { validateEmail } from '../../../validations/authValidations';

const LoginForm = ({
  onPressforgotPassword,
  handleLogin,
  loading,
  loginApiData,
  loginSetterForApiData,
  handleCheck,
  checked,
}: {
  onPressforgotPassword: (to: string) => void;
  handleLogin: () => void;
  loading: boolean;
  loginApiData: any;
  loginSetterForApiData: (key: string, value: any) => void;
  handleCheck: () => void;
  checked: boolean
}) => {
  return (
    <>
      <AileronSemiBold
        numberOfLines={2}
        name={'Enter your email or mobile number to access your account.'}
        style={styles.loginContainerText}
      />

      <View style={style.inputFeilds}>
        <InputField
          label="Email Address / Mobile Number"
          placeholder="Enter Email/Mobile Number"
          rightIcon={icons.email}
          containerStyle={style.inputContainer}
          labelStyle={style.labelStyle}
          inputStyle={style.inputStyle}
          value={loginApiData?.userName ?? undefined}
          onChangeText={(text) => {
            loginSetterForApiData('userName', text);
            const errorMsg = validateEmail(text);
            loginSetterForApiData('error_userName', errorMsg);
          }}
          errorMessage={loginApiData?.error_userName}
          maxLength={50}
        />

        <InputField
          label="Your Password"
          secureTextEntry
          placeholder="Enter Password"
          containerStyle={style.inputContainer}
          labelStyle={style.labelStyle}
          inputStyle={style.inputStyle}
          value={loginApiData?.password ?? undefined}
          onChangeText={text => loginSetterForApiData('password', text)}
          errorMessage={loginApiData?.error_password}
          maxLength={25}
        />
      </View>

      <View style={[styles.row, { justifyContent: 'space-between' }]}>
        <CheckBox description="Remeber Me" onPressCheckBox={handleCheck} isChecked={checked} />

        <TouchableOpacity
          onPress={() => {
            onPressforgotPassword('ForgotPassword',);
          }}>
          <AileronBold style={styles.forgetPassword} name="Forgot Password ?" />
        </TouchableOpacity>
      </View>

      <Button
        onPress={handleLogin}
        showIcon={icons.loginArrow}
        containerStyle={styles.loginButton}
        name="Login"
        loading={loading}
      />

      <AileronBold style={styles.orText} name="Or" />

      <View style={styles.loginOptionContainer}>
        <TouchableOpacity style={styles.loginOptionBox}>
          <Image
            style={styles.loginOptionContainerIcons}
            source={icons.faceID}
          />
          <AileronBold style={style.style} name={'Face ID'} />
        </TouchableOpacity>

        <View style={styles.verticalLine} />

        <TouchableOpacity style={styles.loginOptionBox}>
          <Image
            style={styles.loginOptionContainerIcons}
            source={icons.fingerprint}
          />
          <AileronBold style={style.style} name={'Biometric'} />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default LoginForm;

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
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  square: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: vw * 1,
    borderColor: COLORS.black,
    height: vh * 1.9,
    width: vw * 3.9,

  },
  descriptionText: {
    color: COLORS.textColor,
    marginLeft: vw * 2,
    fontSize: vw * 3.5,
  },
  tickIcon: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
});
