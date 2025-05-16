import React from 'react';
import ForgotPasswordView from '../../views/ForgotPasswordView';
import useForgotPasswordViewModel from '../../viewmodels/useForgotPasswordViewModel';
import useLoginViewModel from '../../viewmodels/useLoginViewModel';

const ForgotPassword = ({ route }: { route: any }) => {
  const { states, functions } = useForgotPasswordViewModel({ route });
  const { step, confirmationModal, verifyOtpLoading, apiData } = states;
  const { handleStep, onPressBack, setConfirmationModal, setOtp, handleVerifyOtp, handleForgotPassword, openConfimationModal, setterForApiData } = functions;

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
      apiData={apiData}

    />
  );
};
export default ForgotPassword;
