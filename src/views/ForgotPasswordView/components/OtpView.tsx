import React, { Fragment, useState } from 'react';
import { OtpInput } from 'react-native-otp-entry';
import { COLORS } from '../../../assets/theme/colors';
import styles from '../styles';
import { AileronBold, AileronRegular } from '../../../components';
import { Alert, TouchableOpacity, View } from 'react-native';
import CountDown from 'react-native-countdown-component';



const OtpView = () => {
  const [showResend, setShowResend] = useState(false);
  const [countdownKey, setCountdownKey] = useState(0);


  const handleResend = () => {
    setShowResend(false);
    setCountdownKey(prev => prev + 1);




  };

  return (
    <Fragment>
      <OtpInput
        numberOfDigits={5}
        focusColor={COLORS.black}
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
      />

      <View style={{ flexDirection: 'row', justifyContent: "center", alignItems: "center", }}>



        <AileronRegular style={styles.sendAgain} name="Send code again" />

        <CountDown
          key={String(countdownKey)}
          size={12}
          until={60}
          onFinish={() => setShowResend(true)}
          digitStyle={{ backgroundColor: '#FFF', }}
          timeToShow={['M', 'S']}
          timeLabels={{ m: '', s: '' }}
          showSeparator
        />

      </View>


      {showResend && (
        <TouchableOpacity onPress={handleResend}>
          <AileronBold style={styles.resendCode} name="Resend Code" />
        </TouchableOpacity>
      )}



    </Fragment>
  );
};
export default OtpView;
