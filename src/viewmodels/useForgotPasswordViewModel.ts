import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';

type UseForgotPasswordViewModelReturnType = {
  states: {
    step: number;
  };
  functions: {
    handleStep: (step: number) => void;
    onPressBack: () => void;

  };
};
const useForgotPasswordViewModel = (): UseForgotPasswordViewModelReturnType => {
  const [step, setStep] = useState<number>(1);
  const navigation = useNavigation();

  const handleStep = (step: number): void => {
    if (step < 3) {
      setStep(step + 1);
    }
  };


  const onPressBack = (): void => {
    if (step > 1) {
      setStep(step - 1)
    }
    if (step == 1) {
      navigation.goBack();
    }
  }
  return {
    states: {
      step,
    },
    functions: {
      handleStep,
      onPressBack
    },
  };
};
export default useForgotPasswordViewModel;
