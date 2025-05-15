import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';

type routes = {
  route: {}
}

type UseForgotPasswordViewModelReturnType = {
  states: {
    step: number;
    confirmationModal: boolean;
  };
  functions: {
    handleStep: (step: number) => void;
    onPressBack: () => void;
    setConfirmationModal: (val: boolean) => void;
    openConfimationModal: () => void;
  };
};
const useForgotPasswordViewModel = ({
  route,
}): UseForgotPasswordViewModelReturnType => {
  const { step: _step } = route?.params || {};
  const [step, setStep] = useState<number>(1);
  const [confirmationModal, setConfirmationModal] = useState(false);

  useEffect(() => {
    setStep(_step);
  }, [_step]);

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

  const openConfimationModal = () => {
    setConfirmationModal(true);
  };
  return {
    states: {
      step,
      confirmationModal,
    },
    functions: {
      handleStep,
      onPressBack,
      setConfirmationModal,
      openConfimationModal,
    },
  };
};

export default useForgotPasswordViewModel;
