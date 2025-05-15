import React from 'react';
import ForgotPasswordView from '../../views/ForgotPasswordView';
import useForgotPasswordViewModel from '../../viewmodels/useForgotPasswordViewModel';
import useLoginViewModel from '../../viewmodels/useLoginViewModel';

const ForgotPassword = ({ route }: { route: any }) => {
  const { states, functions } = useForgotPasswordViewModel({ route });
  console.log("Route Data", route?.params?.verifiedUserData)
  const { step, confirmationModal, verifyOtpLoading } = states;
  const { handleStep, onPressBack, setConfirmationModal, openConfimationModal, setOtp, handleVerifyOtp } = functions;

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
    />
  );
};
export default ForgotPassword;
