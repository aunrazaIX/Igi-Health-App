import { useState } from 'react';

const useForgotPasswordViewModel = () => {
  const [step, setStep] = useState(1);

  const handleStep = (step) => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const onPressBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return {
    states: {
      step,
    },
    functions: {
      handleStep,
      onPressBack,
    },
  };
};

export default useForgotPasswordViewModel;
