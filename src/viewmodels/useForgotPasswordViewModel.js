import {useNavigation} from '@react-navigation/native';
import {useRef, useState} from 'react';
import {useDispatch} from 'react-redux';
import endpoints from '../api/endspoints';
import useApiHook from '../hooks/useApiHook';
import {setErrorModal} from '../redux/generalSlice';
import useErrorHandlingHook from '../hooks/useErrorHandlingHook';

const useForgotPasswordViewModel = ({route}) => {
  const test = useRef(null);

  const {
    step: _step,
    verifiedUserData,
    type,
    isChangedPassword,
  } = route?.params || {};
  const [step, setStep] = useState(_step ? _step : 1);
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [savedDataForVerification, setSavedDataforVerification] =
    useState(null);
  const [otp, setOtp] = useState('');
  const [showResend, setShowResend] = useState(false);
  const [countdownKey, setCountdownKey] = useState(0);
  const [flushOtp, setFlushOtp] = useState(0);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleStep = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };
  const onPressBack = () => {
    if (isChangedPassword || step === 1 || step === 2) {
      return navigation.goBack();
    }
    if (step === 3) {
      return navigation.navigate('Login');
    }
  };
  const test12 = () => {
    if (type === 'signup') return verifiedUserData;
    return test.current;
  };
  const {
    setterForApiData,
    checkForError: ForgotpasswordCheckForError,
    apiData,
    resetStates: ForgotpasswordResetStates,
  } = useErrorHandlingHook({
    email: '',
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
      apiEndpoint: endpoints.auth.resendOTP(apiData?.email),
      method: 'post',
      argsOrBody: {},
      onSuccess: res => {
        setStep(2);
      },
      onError: e => {
        dispatch(setErrorModal({show: true, message: e?.message}));
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
          message: e?.message,
        }),
      );
    },
  });
  const {trigger: sendOtp} = useApiHook({
    apiEndpoint: endpoints.auth.resendOTP(apiData?.email),
    method: 'post',
    onSuccess: res => {
      setStep(2);
    },
    onError: e => {
      dispatch(
        setErrorModal({
          Show: true,
          message: e?.message,
        }),
      );
    },
  });
  const openConfimationModal = () => setConfirmationModal(true);

  const {
    trigger: triggerVerifyOtp,
    loading: verifyOtpLoading,
    error: errorVerify,
  } = useApiHook({
    apiEndpoint: endpoints.auth.verifyOTP(otp,apiData?.email),
    method: 'post',
    argsOrBody: {},
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
          message: e?.message,
        }),
      );
    },
  });

  const onPressResend = () => {
    setShowResend(false);
    sendOtp({
      Email: test12()?.UserEmail,
    });
    setCountdownKey(prev => prev + 1);
  };

  const handleNext = () => {
    if (step === 1 && type === 'forgot') {
      if (!apiData.email) {
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
    if (step === 2 && (type === 'forgot' || type === 'signup')) {
      triggerVerifyOtp();
    }
    if (
      step === 3 &&
      (type === 'forgot' || type === 'signup' || isChangedPassword)
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
      apiData,
      updatePasswordApiData,
      otp,
      showResend,
      countdownKey,
      isChangedPassword,
    },
    functions: {
      handleStep,
      onPressBack,
      setConfirmationModal,
      openConfimationModal,
      setOtp,
      setterForApiData,
      setterForUpdatePasswordApiData,
      handleNext,
      onPressResend,
      setShowResend,
      onCloseSuccessModal,
      test12,
    },
  };
};

export default useForgotPasswordViewModel;
