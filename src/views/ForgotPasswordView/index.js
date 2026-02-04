import React from 'react';
import {CreateNewPassword, EnterEmailView, OtpView} from './components';
import {icons} from '../../assets';
import {
  AileronBold,
  AileronSemiBold,
  Button,
  ConfirmationModal,
  Container,
  CurvedView,
  TopView,
} from '../../components';
import styles from './styles';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {View} from 'react-native';

const ForgotPasswordView = ({
  step,
  handleStep,
  onPressBack,
  confirmationModal,
  setConfirmationModal,
  openConfimationModal,
  setOtp,
  verifyOtpLoading,
  setterForApiData,
  apiData,
  handleNext,
  setterForUpdatePasswordApiData,
  onPressResend,
  updatePasswordApiData,
  otp,
  sendOtp,
  showResend,
  countdownKey,
  setShowResend,
  onCloseSuccessModal,
  updatePasswordLoading,
  verifiedUserData,
  savedDataForVerification,
  flushOtp,
  type,
  isChangedPassword,
  loading,
}) => {
  const returnComponent = {
    1: (
      <EnterEmailView
        setterForApiData={setterForApiData}
        apiData={apiData}
        loading={loading}
      />
    ),
    2: (
      <OtpView
        flushOtp={flushOtp}
        setOtp={setOtp}
        sendOtp={sendOtp}
        otp={otp}
        onPressResend={onPressResend}
        showResend={showResend}
        countdownKey={countdownKey}
        setShowResend={setShowResend}
        verifyOtpLoading={verifyOtpLoading}
      />
    ),
    3: (
      <CreateNewPassword
        setterForUpdatePasswordApiData={setterForUpdatePasswordApiData}
        updatePasswordApiData={updatePasswordApiData}
        updatePasswordLoading={updatePasswordLoading}
      />
    ),
  };

  const returnTitle = {
    1: 'Forgot Password',
    2: 'OTP Verification',
    3: 'Create New Password',
  };

  const returnDescription = {
    1: 'Please enter the required information to reset your password',
    2: 'An authentication code has been sent',
    3: 'At least 8 characters, with uppercase and lowercase letters.',
  };

  const returnButtonName = {
    1: 'Submit',
    2: 'Next',
    3: `${type !== 'changePassword' ? 'Create' : 'Update'} Password & Continue`,
  };

  const returnHeaderName = {
    1: 'Forgot Password',
    2: 'OTP Verification',
    3: type === 'signup' ? 'Create Password & Continue' : 'Change Password',
  };

  const returnHeaderIcon = {
    1: icons.forgotPassword,
    2: icons.resetPassword,
    3: null,
  };

  return (
    <Container>
      <TopView
        onPressBack={onPressBack}
        icon={returnHeaderIcon[step]}
        title={returnHeaderName[step]}
      />

      <CurvedView containerStyle={styles.curvedStyle}>
        <KeyboardAwareScrollView>
          <View style={styles.curvedViewContent}>
            <AileronBold style={styles.titleText} name={returnTitle[step]} />

            <AileronSemiBold
              style={styles.description}
              name={returnDescription[step]}
            />

            {returnComponent[step]}

            <Button
              onPress={handleNext}
              name={returnButtonName[step]}
              containerStyle={styles.button}
              loading={verifyOtpLoading || loading || updatePasswordLoading}
            />
          </View>
        </KeyboardAwareScrollView>
      </CurvedView>

      <ConfirmationModal
        show={confirmationModal}
        type={type}
        message={
          type === 'signup'
            ? 'Welcome aboard! Your account has been created successfully.'
            : 'Your password has been updated successfully.'
        }
        onCancel={onCloseSuccessModal}
      />
    </Container>
  );
};

export default ForgotPasswordView;
