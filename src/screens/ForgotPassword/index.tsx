import React from 'react';
import ForgotPasswordView from '../../views/ForgotPasswordView';
import useForgotPasswordViewModel from '../../viewmodels/useForgotPasswordViewModel';
import useLoginViewModel from '../../viewmodels/useLoginViewModel';

const ForgotPassword = ({ route }: { route: any }) => {
  const { states, functions } = useForgotPasswordViewModel({ route });
  const { step, confirmationModal, verifyOtpLoading, apiData } = states;
  const { handleStep, onPressBack, setConfirmationModal, setOtp, handleVerifyOtp, handleForgotPassword, openConfimationModal, setterForApiData, handleNext } = functions;

  return (
    <ForgotPasswordView
      onPressBack={onPressBack}
      handleStep={handleStep}
      step={step}
      confirmationModal={confirmationModal}
      setConfirmationModal={setConfirmationModal}
      openConfimationModal={openConfimationModal}
      setOtp={setOtp}
      handleVerifyOtp={handleVerifyOtp}
      verifyOtpLoading={verifyOtpLoading}
      setterForApiData={setterForApiData}
      handleForgotPassword={handleForgotPassword}
      handleNext={handleNext}
      apiData={apiData}

    />
  );
};
export default ForgotPassword;
