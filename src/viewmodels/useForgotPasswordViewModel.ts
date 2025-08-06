import {useNavigation} from '@react-navigation/native';
import {useEffect, useMemo, useRef, useState} from 'react';
import useErrorHandlingHook from '../hooks/useErrorHandlingHook';
import useApiHook from '../hooks/useApiHook';
import endpoints from '../api/endspoints';
import {useDispatch, useSelector} from 'react-redux';
import {setErrorModal} from '../redux/generalSlice';
import {generateUUID} from '../utils';

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
  const test = useRef(null);

  const {
    step: _step,
    verifiedUserData,
    type,
    isChangedPassword,
  } = route?.params || {};

  const {
    rememberMe,
    credentials,
    deviceId,
    biometrics,
    user,
    isToggle,
    faceIdCredentials,
  } = useSelector((state: RootState) => state.auth);

  const [step, setStep] = useState<number>(_step ? _step : 1);
  const [savedDataForVerification, setSavedDataforVerification] =
    useState(null);
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [otp, setOtp] = useState<number | string>();

  const [showResend, setShowResend] = useState(false);

  const [flushOtp, setFlushOtp] = useState(0);
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

    if (isChangedPassword) {
      navigation.goBack();
      return;
    }

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

  const test12 = () => {
    if (type == 'signup') {
      return verifiedUserData;
    }

    return test.current;
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
    verify_type: '1',
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
        let id = generateUUID();
        test.current = {
          ...res?.Data,
          uuid: id,
        };
        let apiData = {
          userId: res?.Data?.UserID,
          uuid: id,
          user_email: res?.Data?.UserEmail,

          user_cellnumber: res?.Data?.UserCellNumber,
          opt_reason: 'for Forgot Password Request',
          opt_typeID: '2',
          ClientCode: res?.Data?.ClientCode,
        };
        setOtp('');
        sendOtp(apiData);
      },
      onError: e => {
        dispatch(
          setErrorModal({show: true, message: e?.header, detail: e?.error}),
        );
      },
    });

  const {trigger: sendOtp} = useApiHook({
    apiEndpoint: endpoints.auth.sendOtp,
    method: 'post',
    onSuccess: res => {
      setStep(2);
      ForgotpasswordResetStates();
    },
    onError: e => {
      dispatch(
        setErrorModal({
          Show: true,
          message: e?.header,
          detail: e?.error,
        }),
      );
    },
  });

  const openConfimationModal = () => {
    setConfirmationModal(true);
  };

  const {
    trigger: triggerVerifyOtp,
    loading: verifyOtpLoading,
    error: errorVerify,
  } = useApiHook({
    apiEndpoint: endpoints.auth.verifyOTP,
    method: 'post',
    argsOrBody: {
      otp: otp,
      uuid: test12()?.uuid,
      userId: test12()?.UserID,
      ClientCode: test12()?.ClientCode,
    },

    onSuccess: res => {
      if (res.Data) {
        setStep(3);
      } else {
        setFlushOtp(flushOtp + 1);
        dispatch(
          setErrorModal({
            Show: true,
            message: 'Invalid OTP',
            detail:
              'The OTP you entered is incorrect. Please check and try again.',
          }),
        );
        setOtp('');
      }
    },
    onError: e => {
      setFlushOtp(flushOtp + 1);
      setOtp('');
      dispatch(
        setErrorModal({
          Show: true,
          message: e?.header,
          detail: e?.error,
        }),
      );
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
      OldPassword: isChangedPassword
        ? user?.UserPassword
        : test12()?.UserPassword,
      userId: isChangedPassword ? user?.UserId : test12()?.UserID,
      isPassEncrypted: true,
      NewPassword: updatePasswordApiData.confirmPassword,
    },

    onSuccess: res => {
      if (res?.Data) {
        updatePasswordResetStates();
        setConfirmationModal(true);
      }
    },
    onError: e => {
      dispatch(
        setErrorModal({
          show: true,
          message: e?.header,
          detail: e?.error,
        }),
      );
    },
  });

  const onPressResend = () => {
    let id = generateUUID();
    setShowResend(false);
    sendOtp({
      userId: test12()?.UserID,
      uuid: id,
      user_email: test12()?.UserEmail,
      user_cellnumber: test12()?.UserCellNumber,
      opt_reason: 'for Forgot Password Request',
      opt_typeID: type == 'signup' ? '3' : '2',
      ClientCode: test12()?.ClientCode,
    });
    if (type == 'signup') {
      verifiedUserData.uuid = id;
    } else {
      if (test.current) {
        test.current.uuid = id;
      }
    }

    setCountdownKey(prev => prev + 1);
  };

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
    if (
      step == 3 &&
      (type == 'forgot' || type == 'signup' || isChangedPassword)
    ) {
      if (
        !updatePasswordApiData.newPassword ||
        !updatePasswordApiData.confirmPassword
      ) {
        dispatch(
          setErrorModal({
            Show: true,
            message: 'Missing Password Fields',
            detail:
              'Please enter both Password and Confirm Password to continue',
          }),
        );
        return;
      }
      if (
        updatePasswordApiData.newPassword !==
        updatePasswordApiData.confirmPassword
      ) {
        dispatch(
          setErrorModal({
            Show: true,
            message: 'Password Mismatched',
            detail:
              'Please ensure the new password and confirmation fields contain the same value before proceeding.',
          }),
        );
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
      flushOtp,
      savedDataForVerification,
      isChangedPassword,
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
      test12: test12,
    },
  };
};

export default useForgotPasswordViewModel;
