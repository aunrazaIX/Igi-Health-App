import {useState} from 'react';

type UseForgotPasswordViewModelReturnType = {
  states: {
    step: number;
  };
  functions: {
    handleStep: (step: number) => void;
  };
};
const useForgotPasswordViewModel = (): UseForgotPasswordViewModelReturnType => {
  const [step, setStep] = useState<number>(1);
  const handleStep = (step: number) => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  return {
    states: {
      step,
    },
    functions: {
      handleStep,
    },
  };
};
export default useForgotPasswordViewModel;
