import {useNavigation} from '@react-navigation/native';
import {useRef, useState} from 'react';
import {useDispatch} from 'react-redux';

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
  const [otp, setOtp] = useState('');
  const [showResend, setShowResend] = useState(false);
  const [countdownKey, setCountdownKey] = useState(0);
  const [apiData, setApiData] = useState({
    cellNumber: '',
    email: '',
    cnic: '',
  });

  const [updatePasswordApiData, setUpdatePasswordApiData] = useState({
    newPassword: '',
    confirmPassword: '',
  });

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const setterForApiData = (key, value) => {
    setApiData(prev => ({...prev, [key]: value}));
  };

  const setterForUpdatePasswordApiData = (key, value) => {
    setUpdatePasswordApiData(prev => ({...prev, [key]: value}));
  };

  const handleStep = () => {
    if (step < 3) setStep(step + 1);
  };

  const onPressBack = () => {
    if (isChangedPassword) return navigation.goBack();

    if (step === 1) return navigation.goBack();
    if (step === 2) return navigation.goBack();
    if (step === 3) return navigation.navigate('Login');
  };

  const openConfimationModal = () => setConfirmationModal(true);

  const test12 = () => {
    if (type === 'signup') return verifiedUserData;
    return test.current;
  };

  const onPressResend = () => {
    setShowResend(false);
    setCountdownKey(prev => prev + 1);
  };

  const handleNext = () => {
    if (step === 1 && type === 'forgot') {
      setStep(2);
      return;
    }
    if (step === 2 && (type === 'forgot' || type === 'signup')) {
      setStep(3);
      return;
    }
    if (
      step === 3 &&
      (type === 'forgot' || type === 'signup' || isChangedPassword)
    ) {
      setConfirmationModal(true);
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
