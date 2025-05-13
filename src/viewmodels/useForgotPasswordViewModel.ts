import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';

type routes = {
  route: {}
}

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

const useForgotPasswordViewModel = ({ route }: { route: routes }): UseForgotPasswordViewModelReturnType => {
  const [step, setStep] = useState<number>(1);
  const [confirmationVisible, setConfirmationVisible] = useState<boolean>(false);

  const navigation = useNavigation();

  const handleStep = (step: number): void => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  let { stepNum, type } = route?.params || {};

  const onPressBack = (): void => {
    if (type === "signup") {
      navigation.navigate('Login');
      return
    }
    if (step > 1) {
      setStep(step - 1);
      return
    }
    if (step == 1) {

      navigation.goBack();
      return

    }
  };

  useEffect(() => {
    if (stepNum) {
      setStep(stepNum);
    }
  }, [stepNum]);

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
