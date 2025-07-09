import {useNavigation} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import useErrorHandlingHook from '../hooks/useErrorHandlingHook';
import useApiHook from '../hooks/useApiHook';
import endpoints from '../api/endspoints';
import {useDispatch} from 'react-redux';
import {setErrorModal} from '../redux/generalSlice';

type UseForgotPasswordViewModelReturnType = {
  states: {
    step: number;
    confirmationModal: boolean;
    verifyOtpLoading: boolean;
    ForgotPasswordLoading: boolean;
    updatePasswordLoading: boolean;
    apiData: object;
    updatePasswordApiData: any;
    otp: number | string;
    showResend: boolean;
    countdownKey: number;
  };
  functions: {
    handleStep: (step: number) => void;
    onPressBack: () => void;
    setConfirmationModal: (val: boolean) => void;
    openConfimationModal: () => void;
    setOtp: (otp: string) => void;
    setterForApiData: (key: string, value: String) => void;
    handleNext: () => void;
    setterForUpdatePasswordApiData: (key: string, value: String) => void;
    sendOtp: () => void;
    onPressResend: () => void;
    setShowResend: () => void;
  };
};
const useForgotPasswordViewModel = ({
  route,
}: {
  route: any;
}): UseForgotPasswordViewModelReturnType => {
  const {step: _step, verifiedUserData, type} = route?.params || {};
  const [step, setStep] = useState<number>(_step ? _step : 1);
  const [savedDataForVerification, setSavedDataforVerification] =
    useState(null);
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [otp, setOtp] = useState<number | string>('');

  const [showResend, setShowResend] = useState(false);
  const [countdownKey, setCountdownKey] = useState(0);

  // useEffect(() => {
  //   setStep(_step);
  // }, [_step]);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleStep = (step: number): void => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const onPressBack = (): void => {
    // if (type === 'signup') {
    //   navigation.navigate('Login');
    //   return;
    // }
    // if (step > 1) {
    //   setStep(step - 1);
    //   return;
    // }
    if (step == 1) {
      navigation.goBack();
      return;
    }
    if (step == 2) {
      navigation.goBack();
      return;
    }
    if (step == 3) {
      navigation.navigate('Login');
      return;
    }
  };

  const {
    setterForApiData,
    checkForError: ForgotpasswordCheckForError,
    apiData,
    resetStates: ForgotpasswordResetStates,
  } = useErrorHandlingHook({
    cellNumber: '',
    email: '',
    cnic: '',
  });

  const {
    setterForApiData: setterForUpdatePasswordApiData,
    checkForError: checkForErrorUpdatePasswordApiData,
    apiData: updatePasswordApiData,
    resetStates: updatePasswordResetStates,
  } = useErrorHandlingHook({
    newPassword: '',
    confirmPassword: '',
  });

  const {trigger: triggerForgotPassword, loading: ForgotPasswordLoading} =
    useApiHook({
      apiEndpoint: endpoints.auth.registerUser,
      method: 'post',
      argsOrBody: apiData,
      onSuccess: res => {
        setSavedDataforVerification({
          ...res?.Data,
          uuid: 'ASDADASDASDASDASDADAD',
        });

        let apiData = {
          userId: res?.Data?.UserID,
          uuid: 'ASDADASDASDASDASDADAD',
          user_email: res?.Data?.UserEmail,
          user_cellnumber: res?.Data?.UserCellNumber,
          opt_reason: 'for Forgot Password Request',
          opt_typeID: '2',
          ClientCode: res?.Data?.ClientCode,
        };

        setOtp('');
        sendOtp(apiData);
      },
    });

  const {trigger: sendOtp} = useApiHook({
    apiEndpoint: endpoints.auth.sendOtp,
    method: 'post',
    onSuccess: res => {
      setStep(2);
      ForgotpasswordResetStates();
    },
    onError: res => {
      dispatch(
        setErrorModal({
          Show: true,
          message: 'Reset Failed',
          detail:
            'We couldn’t find an account with the details you provided. Please check your information and try again or contact IGI Life.',
        }),
      );
    },
  });

  const openConfimationModal = () => {
    setConfirmationModal(true);
  };

  const onPressResend = () => {
    setShowResend(false);
    let userData =
      type == 'forgot' && step == 2
        ? savedDataForVerification
        : verifiedUserData;
    sendOtp({
      userId: userData?.UserID,
      uuid: 'ASDADASDASDASDASDADAD',
      user_email: userData?.UserEmail,
      user_cellnumber: userData?.UserCellNumber,
      opt_reason: 'for Forgot Password Request',
      opt_typeID: '2',
      ClientCode: userData?.ClientCode,
    });
    setCountdownKey(prev => prev + 1);
  };

  let verifyUserData =
    type == 'forgot' && step == 2 ? savedDataForVerification : verifiedUserData;

  const {
    trigger: triggerVerifyOtp,
    loading: verifyOtpLoading,
    error: errorVerify,
  } = useApiHook({
    apiEndpoint: endpoints.auth.verifyOTP,
    method: 'post',
    argsOrBody: {
      otp: otp,
      uuid: verifyUserData?.uuid,
      userId: verifyUserData?.UserID,
      ClientCode: verifyUserData?.ClientCode,
    },
    onSuccess: res => {
      if (res.Data) {
        setStep(3);
      } else {
        dispatch(setErrorModal({Show: true, message: 'Invalid Or Expire Otp'}));
      }
    },
    onError: error => {
      setOtp('');
      dispatch(setErrorModal({Show: true, message: 'Incorrect OTP'}));
    },
  });

  const {
    trigger: triggerUpdatePassword,
    loading: updatePasswordLoading,
    error: errorUpdatePassword,
  } = useApiHook({
    apiEndpoint: endpoints.auth.updatePassword,
    method: 'post',
    argsOrBody: {
      OldPassword: savedDataForVerification?.UserPassword,
      userId: savedDataForVerification?.UserID,
      isPassEncrypted: true,
      NewPassword: updatePasswordApiData.confirmPassword,
    },

    onSuccess: res => {
      if (res?.Data) {
        updatePasswordResetStates();
        setConfirmationModal(true);
      }
    },
    onError: error => {
      dispatch(setErrorModal({show: true, message: error}));
    },
  });

  const handleNext = () => {
    if (step == 1 && type == 'forgot') {
      if (!apiData.cellNumber || !apiData.email || !apiData.cnic) {
        dispatch(
          setErrorModal({
            Show: true,
            message: 'Reset Failed',
            detail:
              'Please ensure that all required fields are filled out and try again. If the problem persists, contact IGI Life.',
          }),
        );
        return;
      } else {
        triggerForgotPassword();
        return;
      }
    }
    if (step == 2 && type == 'forgot') {
      triggerVerifyOtp();
    }
    if (step == 2 && type == 'signup') {
      triggerVerifyOtp();
      return;
    }

    if (step == 3 && type == 'forgot') {
      if (
        !updatePasswordApiData.newPassword ||
        !updatePasswordApiData.confirmPassword
      ) {
        dispatch(setErrorModal({Show: true, message: 'Fill Both Password'}));
        return;
      }
      if (
        updatePasswordApiData.newPassword !==
        updatePasswordApiData.confirmPassword
      ) {
        dispatch(setErrorModal({Show: true, message: 'Password Not Matched'}));
        return;
      }
      triggerUpdatePassword();
    }
  };

  const onCloseSuccessModal = () => {
    navigation.navigate('Login');
  };
  return {
    states: {
      step,
      confirmationModal,
      verifyOtpLoading,
      apiData,
      updatePasswordApiData,
      ForgotPasswordLoading,
      updatePasswordLoading,
      otp,
      showResend,
      countdownKey,
    },
    functions: {
      handleStep,
      onPressBack,
      setConfirmationModal,
      openConfimationModal,
      setOtp,
      setterForApiData,
      handleNext,
      setterForUpdatePasswordApiData,
      sendOtp,
      onPressResend,
      setShowResend,
      onCloseSuccessModal,
    },
  };
};

export default useForgotPasswordViewModel;
