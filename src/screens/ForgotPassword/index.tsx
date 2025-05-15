import React from 'react';
import ForgotPasswordView from '../../views/ForgotPasswordView';
import useForgotPasswordViewModel from '../../viewmodels/useForgotPasswordViewModel';

const ForgotPassword = ({ route }) => {
  const { states, functions } = useForgotPasswordViewModel({ route });
  const { step, confirmationModal } = states;
  const { handleStep, onPressBack, setConfirmationModal, openConfimationModal, } = functions;
  return (
    <ForgotPasswordView
      onPressBack={onPressBack}
      handleStep={handleStep}
      step={step}
      confirmationModal={confirmationModal}
      setConfirmationModal={setConfirmationModal}
      openConfimationModal={openConfimationModal}
    />
  );
};
export default ForgotPassword;
