<<<<<<< HEAD
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';

type routes = {
  route: {}
}
=======
import {useNavigation} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import useErrorHandlingHook from '../hooks/useErrorHandlingHook';
import useApiHook from '../hooks/useApiHook';
import endpoints from '../api/endspoints';
>>>>>>> b5ac490d395a3561410c4849f7217400afb21761

type UseForgotPasswordViewModelReturnType = {
  states: {
    step: number;
    confirmationModal: boolean;
    verifyOtpLoading: boolean;
  };
  functions: {
    handleStep: (step: number) => void;
    onPressBack: () => void;
    setConfirmationModal: (val: boolean) => void;
    openConfimationModal: () => void;
    setOtp: (otp: string) => void;
    handleVerifyOtp: () => void;
  };
};
const useForgotPasswordViewModel = ({
  route,
}): UseForgotPasswordViewModelReturnType => {
  const { step: _step, verifiedUserData } = route?.params || {};
  const [step, setStep] = useState<number>(1);
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [otp, setOtp] = useState<any>();

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

  const { trigger: triggerVerifyOtp, loading: verifyOtpLoading } = useApiHook({
    apiEndpoint: endpoints.auth.verifyOTP,
    method: 'post',
    argsOrBody: {
      otp,
      uuid: verifiedUserData?.uuid,
      userId: verifiedUserData?.UserID,
      ClientCode: verifiedUserData?.ClientCode,
    },
    onSuccess: () => {
      setStep(3);
    },
  });

  const handleVerifyOtp = () => {
    triggerVerifyOtp();
  };

  return {
    states: {
      step,
      confirmationModal,
      verifyOtpLoading,
    },
    functions: {
      handleStep,
      onPressBack,
      setConfirmationModal,
      openConfimationModal,
      setOtp,
      handleVerifyOtp,
    },
  };
};

export default useForgotPasswordViewModel;
