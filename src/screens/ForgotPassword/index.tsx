import React from 'react';
import ForgotPasswordView from '../../views/ForgotPasswordView';
import useForgotPasswordViewModel from '../../viewmodels/useForgotPasswordViewModel';

const ForgotPassword = () => {
  const {states, functions} = useForgotPasswordViewModel();
  const {step} = states;
  const {handleStep} = functions;
  return <ForgotPasswordView handleStep={handleStep} step={step} />;
};
export default ForgotPassword;
