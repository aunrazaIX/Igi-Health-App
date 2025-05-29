import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import useApiHook from '../hooks/useApiHook';
import endpoints from '../api/endspoints';
import {useDispatch, useSelector} from 'react-redux';
import {setRememberMe, setUserData} from '../redux/authSlice';
import useErrorHandlingHook from '../hooks/useErrorHandlingHook';
import {setErrorModal} from '../redux/generalSlice';
import {RootState} from '../redux/store';

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
    rememberMe: boolean;
  };
  functions: {
    onPressTab: (name: string) => void;
    onPressforgotPassword: (to: string) => void;
    handleLogin: () => void;
    handleSignup: () => void;
    signupSetterForApiData: (key: string, value: any) => void;
    loginSetterForApiData: (key: string, value: any) => void;
    handleCheck: () => void;
  };
};

const useLoginViewModel = (): UseLoginViewModelReturn => {
  const [selectedTab, setSelectedTab] = useState<string>('login');
  const [verifiedUserData, setVerifiedUserData] = useState(null);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const rememberMe = useSelector((state: RootState) => state.auth.rememberMe);

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
    resetStates: signupResetStates,
    setterForApiData: signupSetterForApiData,
    apiData: signupApiData,
  } = useErrorHandlingHook({
    email: '',
    cellNumber: '',
    cnic: '',
  });

  const {loading, trigger} = useApiHook({
    apiEndpoint: endpoints.auth.login,
    method: 'post',
    onSuccess: res => {
      dispatch(setUserData(res));
    },
    onError: res => {
      dispatch(
        setErrorModal({
          Show: true,
          message: res.error ?? 'Somtething went wrong',
        }),
      );
    },
  });

  const {trigger: triggerSignup, loading: loadingSignup} = useApiHook({
    apiEndpoint: endpoints.auth.registerUser,
    method: 'post',
    argsOrBody: signupApiData,
    onSuccess: res => {
      setVerifiedUserData({...res?.Data, uuid: 'ASDADASDASDASDASDADAD'});
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
      navigation.navigate('ForgotPassword', {
        step: 2,
        verifiedUserData,
        type: 'signup',
      });
      signupResetStates();
    },
    onError: res => {
      dispatch(setErrorModal({Show: true, message: 'Incorrect Data'}));
    },
  });

  const handleLogin = () => {
    const filled = LoginCheckForError();
    if (!filled) return;

    const Buffer = require('buffer').Buffer;
    let encodedAuth = new Buffer(loginApiData?.password).toString('base64');
    let apiData = {
      userName: loginApiData?.userName,
      password: encodedAuth,
      DeviceId: '21312321302138013203231',
      LoginDeviceName: 'Emulator',
    };

    trigger(apiData);
  };

  const handleSignup = () => {
    const filled = signupCheckForError();
    if (!filled) return;

    triggerSignup();
  };

  const onPressTab = (name: string) => setSelectedTab(name);

  const onPressforgotPassword = (to: string) => {
    navigation.navigate(to, {step: 1, type: 'forgot'});
  };

  const handleCheck = () => {
    dispatch(setRememberMe(!rememberMe));
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
      rememberMe,
    },
    functions: {
      onPressTab,
      onPressforgotPassword,
      handleLogin,
      handleSignup,
      signupSetterForApiData,
      loginSetterForApiData,
      handleCheck,
    },
  };
};

export default useLoginViewModel;
