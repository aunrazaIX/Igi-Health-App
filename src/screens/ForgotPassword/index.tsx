import React from 'react';
import ForgotPasswordView from '../../views/ForgotPasswordView';
import useForgotPasswordViewModel from '../../viewmodels/useForgotPasswordViewModel';
import useLoginViewModel from '../../viewmodels/useLoginViewModel';

const ForgotPassword = ({route}: {route: any}) => {
  const {type} = route?.params || {};
  const {states, functions} = useForgotPasswordViewModel({route});
  const {
    step,
    confirmationModal,
    verifyOtpLoading,
    apiData,
    updatePasswordApiData,
    ForgotPasswordLoading,
    otp,
    showResend,
    countdownKey,
    updatePasswordLoading,
    verifiedUserData,
    flushOtp,
    savedDataForVerification,
    isChangedPassword,
  } = states;
  const {
    handleStep,
    onPressBack,
    setConfirmationModal,
    setOtp,
    openConfimationModal,
    setterForApiData,
    handleNext,
    setterForUpdatePasswordApiData,
    sendOtp,
    onPressResend,
    setShowResend,
    test12,
    disabled,
    onCloseSuccessModal,
  } = functions;
  return (
    <ForgotPasswordView
      onPressBack={onPressBack}
      handleStep={handleStep}
      step={step}
      confirmationModal={confirmationModal}
      setConfirmationModal={setConfirmationModal}
      openConfimationModal={openConfimationModal}
      setOtp={setOtp}
      verifyOtpLoading={verifyOtpLoading}
      flushOtp={flushOtp}
      setterForApiData={setterForApiData}
      handleNext={handleNext}
      apiData={apiData}
      updatePasswordApiData={updatePasswordApiData}
      setterForUpdatePasswordApiData={setterForUpdatePasswordApiData}
      ForgotPasswordLoading={ForgotPasswordLoading}
      otp={otp}
      sendOtp={sendOtp}
      onPressResend={onPressResend}
      showResend={showResend}
      countdownKey={countdownKey}
      setShowResend={setShowResend}
      onCloseSuccessModal={onCloseSuccessModal}
      disabled={disabled}
      updatePasswordLoading={updatePasswordLoading}
      verifiedUserData={verifiedUserData}
      savedDataForVerification={savedDataForVerification}
      test12={test12}
      isChangedPassword={isChangedPassword}
      type={type}
    />
  );
};
export default ForgotPassword;
