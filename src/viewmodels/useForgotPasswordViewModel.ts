import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';

type UseForgotPasswordViewModelReturnType = {
  states: {
    step: number;
    confirmationVisible: boolean;
  };
  functions: {
    handleStep: (step: number) => void;
    onPressBack: () => void;
    setConfirmationVisible: (val: boolean) => void;

  };
};


const useForgotPasswordViewModel = ({ route }): UseForgotPasswordViewModelReturnType => {






  const [step, setStep] = useState<number>(1);

  const [confirmationVisible, setConfirmationVisible] = useState<boolean>(false);

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


  let _s = route?.params || {}
  
  useEffect(() => {
    if (_s) {
      setStep(_s)
    }

  }, [_s])


  return {
    states: {
      step,
      confirmationVisible,
    },
    functions: {
      handleStep,
      onPressBack,
      setConfirmationVisible,
    },
  };
};
export default useForgotPasswordViewModel;
