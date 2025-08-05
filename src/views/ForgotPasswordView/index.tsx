import React, {JSX} from 'react';
import {CreateNewPassword, EnterEmailView, OtpView} from './components';
import ConfirmationModal from '../../components/Modal/confimationModal';
import {icons} from '../../assets';

import {
  AileronBold,
  AileronRegular,
  Button,
  Container,
  CurvedView,
  TopView,
} from '../../components';
import styles from './styles';
import {ImageSourcePropType, KeyboardAvoidingView, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {vh, vw} from '../../assets/theme/dimension';
import {useSelector} from 'react-redux';

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
  ForgotPasswordLoading,
  otp,
  sendOtp,
  showResend,
  countdownKey,
  setShowResend,
  onCloseSuccessModal,
  updatePasswordLoading,
  verifiedUserData,
  savedDataForVerification,
  test12,
  flushOtp,
  type,
  isChangedPassword,
}: {
  step: number;
  onPressBack: () => void;
  handleStep: (step: number) => void;
  confirmationModal: boolean;
  setConfirmationModal: (val: boolean) => void;
  openConfimationModal: () => void;
  setOtp: (otp: string) => void;
  verifyOtpLoading: boolean;
  setterForApiData: (key: string, value: string) => void;
  apiData: any;
  handleNext: any;
  setterForUpdatePasswordApiData: (key: string, value: string) => void;
  updatePasswordApiData: any;
  ForgotPasswordLoading: boolean;
  otp: number | string;
  sendOtp: () => void;
  onPressResend: () => void;
  showResend: boolean;
  countdownKey: number;
  setShowResend: () => void;
  disabled: () => void;
  updatePasswordLoading: boolean;
  verifiedUserData: any;
  test2: any;
  savedDataForVerification: any;
  type: any;
  isChangedPassword: any;
}) => {
  const {user} = useSelector((state: RootState) => state.auth);

  const returnComponent: Record<number, JSX.Element> = {
    1: <EnterEmailView setterForApiData={setterForApiData} apiData={apiData} />,
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
      />
    ),
    3: (
      <CreateNewPassword
        setterForUpdatePasswordApiData={setterForUpdatePasswordApiData}
        updatePasswordApiData={updatePasswordApiData}
      />
    ),
  };

  const returnTitle: Record<number, string> = {
    1: 'Forgot Password',
    2: 'OTP Verification',
    3: 'Create New Password',
  };
  const returnDescription: Record<number, string> = {
    1: 'Please enter the required information to reset your password',
    2: `An authentication code has been sent to ${test12()?.UserName} `,
    3: 'At least 8 characters, with uppercase and lowercase letters.',
  };
  const returnButtonName: Record<number, string> = {
    1: 'Submit',
    2: 'Next',
    3: 'Update Password & Continue',
  };
  const returnHeaderName: Record<number, string> = {
    1: 'Forgot Password',
    2: 'OTP Verification',
    3: type === 'signup' ? 'Create Password & Continue' : 'Change Password',
  };
  const returnHeaderIcon: Record<number, ImageSourcePropType | null> = {
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
            <AileronRegular
              style={styles.description}
              name={returnDescription[step]}
            />
            {returnComponent[step]}

            <Button
              onPress={handleNext}
              disabled={
                ForgotPasswordLoading ||
                verifyOtpLoading ||
                (step == 2 ? (otp?.length == 6 ? false : true) : false)
              }
              name={returnButtonName[step]}
              containerStyle={styles.button}
              loading={
                verifyOtpLoading ||
                ForgotPasswordLoading ||
                updatePasswordLoading
              }
            />
          </View>
        </KeyboardAwareScrollView>
      </CurvedView>

      <ConfirmationModal
        ConfirmationModalVisible={confirmationModal}
        setConfirmationModalVisible={setConfirmationModal}
        frameImage={icons.modelSuccessful}
        confirmationMessage={
          type === 'signup'
            ? 'Welcome aboard! Your account has been created successfully.'
            : 'Your password has been updated successfully.'
        }
        closeButton
        Successfull
        onClose={onCloseSuccessModal}
        isChangedPassword={isChangedPassword}
        buttonName={type === 'signup' ? 'Login Now' : 'Close'}
      />
    </Container>
  );
};
export default ForgotPasswordView;
