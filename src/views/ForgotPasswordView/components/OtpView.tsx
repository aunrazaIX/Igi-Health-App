import React, { Fragment } from 'react';
import { OtpInput } from 'react-native-otp-entry';
import { COLORS } from '../../../assets/theme/colors';
import styles from '../styles';
import { AileronBold, AileronRegular } from '../../../components';
import { TouchableOpacity } from 'react-native';

const OtpView = ({ setOtp }: { setOtp: (otp: string) => void; }) => {
  return (
    <Fragment>
      <OtpInput
        numberOfDigits={6}
        focusColor={COLORS.black}
        autoFocus={true}
        hideStick={true}
        placeholder="------"
        blurOnFilled={true}
        disabled={false}
        type="numeric"
        secureTextEntry={false}
        focusStickBlinkingDuration={500}
        textInputProps={{
          accessibilityLabel: 'One-Time Password',
        }}
        textProps={{
          accessibilityRole: 'text',
          accessibilityLabel: 'OTP digit',
          allowFontScaling: false,
        }}
        theme={{
          containerStyle: styles.otpContainer,
          focusedPinCodeContainerStyle: styles.otpBoxView,
        }}
        onFilled={(text) => {
          setOtp(text)
        }}
      />
      <AileronRegular style={styles.sendAgain} name="Send code again 00:58" />
      <TouchableOpacity>
        <AileronBold style={styles.resendCode} name="Resend Code" />

      </TouchableOpacity>
    </Fragment>
  );
};
export default OtpView;
