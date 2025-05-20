import React, { JSX } from 'react';
import { CreateNewPassword, EnterEmailView, OtpView } from './components';
import ConfirmationModal from '../../components/Modal/confimationModal';
import { icons } from '../../assets';



import {
  AileronBold,
  AileronRegular,
  Button,
  Container,
  CurvedView,
  TopView,
} from '../../components';
import styles from './styles';
import { ImageSourcePropType } from 'react-native';

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
  setShowResend
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
  updatePasswordApiData: any,
  ForgotPasswordLoading: boolean,
  otp: number | string
  sendOtp: () => void;
  onPressResend: () => void;
  showResend: boolean;
  countdownKey: number;
  setShowResend: () => void;

}) => {
  const returnComponent: Record<number, JSX.Element> = {
    1: <EnterEmailView setterForApiData={setterForApiData} apiData={apiData} />,
    2: <OtpView setOtp={setOtp} sendOtp={sendOtp} onPressResend={onPressResend} showResend={showResend} countdownKey={countdownKey} setShowResend={setShowResend} />,
    3: <CreateNewPassword setterForUpdatePasswordApiData={setterForUpdatePasswordApiData} updatePasswordApiData={updatePasswordApiData} />,
  };

  const returnTitle: Record<number, string> = {
    1: 'Forgot Password',
    2: 'OTP Verification',
    3: 'Create New Password',
  };
  const returnDescription: Record<number, string> = {
    1: 'Enter your email address to recover your password.',
    2: 'An authentication code has been sent to imran-naveed-8852@gmail.com',
    3: 'At least 8 characters, with uppercase and lowercase letters.',
  };
  const returnButtonName: Record<number, string> = {
    1: 'Forgot Password',
    2: 'Next',
    3: 'Submit',
  };
  const returnHeaderName: Record<number, string> = {
    1: 'Forgot Password',
    2: 'OTP Verification',
    3: 'Create New Password',
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
      <CurvedView>
        <AileronBold style={styles.titleText} name={returnTitle[step]} />
        <AileronRegular
          style={styles.description}
          name={returnDescription[step]}
        />
        {returnComponent[step]}
        <Button
          onPress={handleNext}
          disabled={step == 2 ? otp?.length == 6 ? false : true : false}
          name={returnButtonName[step]}
          containerStyle={styles.button}
          loading={verifyOtpLoading || ForgotPasswordLoading}
        />


      </CurvedView>

      <ConfirmationModal
        ConfirmationModalVisible={confirmationModal}
        setConfirmationModalVisible={setConfirmationModal}
        frameImage={icons.ModalSuccessfull}
        confirmationMessage={"Your password has been changed  successfully."}
        closeButton={true}
        Successfull={true}
        CloseButtonText={'Continue To Login'}
      />
    </Container >
  );
};
export default ForgotPasswordView;
