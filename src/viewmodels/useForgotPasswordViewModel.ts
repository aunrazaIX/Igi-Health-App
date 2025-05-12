import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';

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
const useForgotPasswordViewModel = (): UseForgotPasswordViewModelReturnType => {
  const [step, setStep] = useState<number>(1);
  const [confirmationModal, setConfirmationModal] = useState(false)

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

  const openConfimationModal = () => {
    setConfirmationModal(true)
  }
  return {
    states: {
      step,
      confirmationModal
    },
    functions: {
      handleStep,
      onPressBack,
      setConfirmationModal,
      openConfimationModal
    },
  };
};
export default useForgotPasswordViewModel;
