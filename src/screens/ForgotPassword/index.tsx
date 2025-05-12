import React from 'react';
import ForgotPasswordView from '../../views/ForgotPasswordView';
import useForgotPasswordViewModel from '../../viewmodels/useForgotPasswordViewModel';

const ForgotPassword = ({route}) => {
  const { states, functions } = useForgotPasswordViewModel({route});
  const { step, confirmationVisible } = states;
  const { handleStep, onPressBack, setConfirmationVisible } = functions;
  return (
    <ForgotPasswordView
      onPressBack={onPressBack}
      handleStep={handleStep}
      step={step}







    />
  );
};
export default ForgotPassword;
