import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import {useDispatch} from 'react-redux';
import endpoints from '../api/endspoints';
import useApiHook from '../hooks/useApiHook';
import {setErrorModal} from '../redux/generalSlice';
import useErrorHandlingHook from '../hooks/useErrorHandlingHook';

const useForgotPasswordViewModel = ({route}) => {
  const {
    step: _step,
    verifiedUserData,
    type,
    otpToken: tokenFromSignup,
    isChangedPassword,
  } = route?.params || {};
  const [step, setStep] = useState(_step ? _step : 1);
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [otpToken, setOtpToken] = useState(tokenFromSignup || null);
  const [otp, setOtp] = useState('');
  const [showResend, setShowResend] = useState(false);
  const [countdownKey, setCountdownKey] = useState(0);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleStep = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };
  const onPressBack = () => {
    if (type === 'signup' || (!isChangedPassword && step === 3))
      return navigation.navigate('Login');
    if (isChangedPassword && step === 3) return navigation.goBack();
    if (step > 1) return setStep(prev => prev - 1);

    return navigation.navigate('Login');
  };
  const {
    setterForApiData,
    apiData,
    resetStates: ForgotpasswordResetStates,
  } = useErrorHandlingHook({
    email: '',
  });

  const {
    setterForApiData: setterForUpdatePasswordApiData,
    apiData: updatePasswordApiData,
    resetStates: updatePasswordResetStates,
  } = useErrorHandlingHook({
    newPassword: '',
    confirmPassword: '',
  });

  const {trigger: triggerForgotPassword} = useApiHook({
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

  const {trigger: triggerUpdatePassword} = useApiHook({
    apiEndpoint: endpoints.auth.createPassword(
      apiData?.email || verifiedUserData?.email,
      updatePasswordApiData?.newPassword,
    ),
    method: 'post',
    headers: {
      Authorization: `Bearer ${otpToken}`,
    },
    onSuccess: res => {
      console.log(res, 'djhfj');
      if (res?.data) {
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
    apiEndpoint: endpoints.auth.resendOTP(
      apiData?.email || verifiedUserData?.email,
    ),
    method: 'post',
    onSuccess: res => {
      setStep(2);
      ForgotpasswordResetStates();
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

  const {trigger: triggerVerifyOtp} = useApiHook({
    apiEndpoint: endpoints.auth.verifyOTP(
      otp,
      apiData?.email || verifiedUserData?.email,
    ),
    method: 'post',
    argsOrBody: {},
    onSuccess: res => {
      setOtpToken(res?.data);
      setStep(3);
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

  const onPressResend = () => {
    setShowResend(false);
    sendOtp();
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
      if (otpToken) {
        setStep(3);
        return;
      }
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
    },
  };
};

export default useForgotPasswordViewModel;
