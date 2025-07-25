import React, {Fragment, useState} from 'react';
import {OtpInput} from 'react-native-otp-entry';
import {COLORS} from '../../../assets/theme/colors';
import styles from '../styles';
import {AileronBold, AileronRegular} from '../../../components';
import {TouchableOpacity, View} from 'react-native';
import CountDown from 'react-native-countdown-component';

const OtpView = ({
  setOtp,
  sendOtp,
  onPressResend,
  showResend,
  countdownKey,
  setShowResend,
  otp,
  flushOtp,
}: {
  setOtp: (otp: string) => void;
  sendOtp: () => void;
  onPressResend: () => void;
  showResend: boolean;
  countdownKey: number;
  setShowResend: () => void;
  otp: any;
}) => {
  return (
    <Fragment>
      <OtpInput
        numberOfDigits={6}
        focusColor={COLORS.black}
        key={String(flushOtp)}
        autoFocus={true}
        hideStick={true}
        placeholder="-------"
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
        onTextChange={text => {
          setOtp(text);
        }}
      />

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <AileronRegular style={styles.sendAgain} name="Send code again" />

        <CountDown
          key={String(countdownKey)}
          size={12}
          until={60}
          onFinish={() => setShowResend(true)}
          digitStyle={{backgroundColor: '#FFF'}}
          timeToShow={['M', 'S']}
          timeLabels={{m: '', s: ''}}
          showSeparator
        />
      </View>

      {showResend && (
        <TouchableOpacity onPress={onPressResend}>
          <AileronBold style={styles.resendCode} name="Resend Code" />
        </TouchableOpacity>
      )}
    </Fragment>
  );
};
export default OtpView;
