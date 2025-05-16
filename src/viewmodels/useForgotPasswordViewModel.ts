
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import useErrorHandlingHook from '../hooks/useErrorHandlingHook';
import useApiHook from '../hooks/useApiHook';
import endpoints from '../api/endspoints';


type routes = {
  route: {}
}





type UseForgotPasswordViewModelReturnType = {
  states: {
    step: number;
    confirmationModal: boolean;
    verifyOtpLoading: boolean;
    apiData: object

  };
  functions: {
    handleStep: (step: number) => void;
    onPressBack: () => void;
    setConfirmationModal: (val: boolean) => void;
    openConfimationModal: () => void;
    setOtp: (otp: string) => void;
    handleVerifyOtp: () => void;
    setterForApiData: (key: string, value: String) => void
    handleForgotPassword: () => void
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

  const {

    setterForApiData,
    checkForError,
    apiData,
  } = useErrorHandlingHook({

    cellNumber: '',
    email: '',
    cnic: '',

  });



  const { data, trigger, error } = useApiHook({
    apiEndpoint: endpoints.auth.registerUser,
    method: 'post',
    argsOrBody: apiData,
    onSuccess: res => {

      console.log("verify user api hit", res)
      let apiData = {
        userId: res?.Data?.UserID,
        uuid: 'ASDADASDASDASDASDADAD',
        user_email: res?.Data?.UserEmail,
        user_cellnumber: res?.Data?.UserCellNumber,
        opt_reason: 'for Forgot Password Request',
        opt_typeID: '2',
        ClientCode: res?.Data?.ClientCode,
      };
      sendOtp(apiData);

    },
  });



  const {
    trigger: sendOtp,
  } = useApiHook({
    apiEndpoint: endpoints.auth.sendOtp,
    method: 'post',
    onSuccess: res => {
      console.log('otp ka res', res);
      navigation.navigate('ForgotPassword', { step: 2 });
    },
  });









  const handleForgotPassword = () => {

    const filled = checkForError();
    if (!filled) return;

    trigger()

  }

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
      apiData
    },
    functions: {
      handleStep,
      onPressBack,
      setConfirmationModal,
      openConfimationModal,
      setOtp,
      handleVerifyOtp,
      setterForApiData,
      handleForgotPassword
    },
  };
};

export default useForgotPasswordViewModel;
