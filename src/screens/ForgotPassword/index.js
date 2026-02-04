import React from 'react';
import useForgotPasswordViewModel from '../../viewmodels/useForgotPasswordViewModel';
import ForgotPasswordView from '../../views/ForgotPasswordView';

const ForgotPassword = ({route}) => {
  const {type} = route?.params || {};
  const {states, functions} = useForgotPasswordViewModel({route});
  const {
    step,
    confirmationModal,
    verifyOtpLoading,
    apiData,
    updatePasswordApiData,
    otp,
    showResend,
    countdownKey,
    updatePasswordLoading,
    verifiedUserData,
    flushOtp,
    savedDataForVerification,
    loading,
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
      loading={loading}
      apiData={apiData}
      updatePasswordApiData={updatePasswordApiData}
      setterForUpdatePasswordApiData={setterForUpdatePasswordApiData}
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
      isChangedPassword={isChangedPassword}
      type={type}
    />
  );
};
export default ForgotPassword;
