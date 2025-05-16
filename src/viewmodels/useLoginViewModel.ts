import { useNavigation, useRoute } from '@react-navigation/native';
import { useState } from 'react';
import useApiHook from '../hooks/useApiHook';
import endpoints from '../api/endspoints';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/authSlice';
import useErrorHandlingHook from '../hooks/useErrorHandlingHook';

export type UserDetails = {
  name: string;
  cnicNum: string;
  email: string;
};

type UseLoginViewModelReturn = {
  states: {
    selectedTab: string;
    tabs: string[];
    loading: boolean;
    signupApiData: any;
    loadingSignup: boolean;
    loginApiData: any;
  };
  functions: {
    onPressTab: (name: string) => void;
    onPressforgotPassword: (to: string) => void;
    handleLogin: () => void;
    handleSignup: () => void;
    signupSetterForApiData: (key: string, value: any) => void;
    loginSetterForApiData: (key: string, value: any) => void;
  };
};

const useLoginViewModel = (): UseLoginViewModelReturn => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [selectedTab, setSelectedTab] = useState<string>('login');
  const [verifiedUserData, setVerifiedUserData] = useState(null);

  const {
    setterForApiData: loginSetterForApiData,
    apiData: loginApiData,
    checkForError: LoginCheckForError,
  } = useErrorHandlingHook({
    userName: null,
    password: null,
  });

  const {
    checkForError: signupCheckForError,
    resetStates,
    setterForApiData: signupSetterForApiData,
    apiData: signupApiData,
  } = useErrorHandlingHook({
    email: '',
    cellNumber: '',
    cnic: '',
    name: '',
  });

  const { loading, trigger } = useApiHook({
    apiEndpoint: endpoints.auth.login,
    method: 'post',
    argsOrBody: loginApiData,
    onSuccess: res => {
      dispatch(setUserData(res));
    },
  });

  const { trigger: triggerSignup, loading: loadingSignup } = useApiHook({
    apiEndpoint: endpoints.auth.registerUser,
    method: 'post',
    argsOrBody: signupApiData,
    onSuccess: res => {
      setVerifiedUserData({ ...res?.Data, uuid: 'ASDADASDASDASDASDADAD' });
      let apiData = {
        userId: res?.Data?.UserID,
        uuid: 'ASDADASDASDASDASDADAD',
        user_email: res?.Data?.UserEmail,
        user_cellnumber: res?.Data?.UserCellNumber,
        opt_reason: 'Register New User',
        opt_typeID: '3',
        ClientCode: res?.Data?.ClientCode,
      };
      sendOtp(apiData);
    },
  });

  const {
    trigger: sendOtp,
    loading: sendOtpLoading,
    error: sendOtpError,
  } = useApiHook({
    apiEndpoint: endpoints.auth.sendOtp,
    method: 'post',
    onSuccess: res => {
      navigation.navigate('ForgotPassword', { step: 2, verifiedUserData, type: "signup" });
    },
  });

  const handleLogin = () => {
    const filled = LoginCheckForError();
    if (!filled) return;

    trigger();
  };

  const handleSignup = () => {
    const filled = signupCheckForError();
    if (!filled) return;

    triggerSignup();
  };

  const onPressTab = (name: string) => setSelectedTab(name);

  const onPressforgotPassword = (to: string) => {
    navigation.navigate(to, { step: 1, type: "forgot" });
  };


  const tabs = ['login', 'signup'];
  return {
    states: {
      selectedTab,
      tabs,
      loading,
      signupApiData,
      loadingSignup,
      loginApiData,
    },
    functions: {
      onPressTab,
      onPressforgotPassword,
      handleLogin,
      handleSignup,
      signupSetterForApiData,
      loginSetterForApiData,

    },
  };
};

export default useLoginViewModel;
