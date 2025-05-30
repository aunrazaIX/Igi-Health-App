import {useNavigation} from '@react-navigation/native';
import {useRef, useState} from 'react';
import useApiHook from '../hooks/useApiHook';
import endpoints from '../api/endspoints';
import {useDispatch, useSelector} from 'react-redux';
import {setRememberMe, setUserData} from '../redux/authSlice';
import useErrorHandlingHook from '../hooks/useErrorHandlingHook';
import {setErrorModal} from '../redux/generalSlice';

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
  const {rememberMe, credentials} = useSelector(state => state.auth);
  const [selectedTab, setSelectedTab] = useState<string>('login');
  const [verifiedUserData, setVerifiedUserData] = useState(null);
  const [checked, setChecked] = useState(rememberMe);

  const loginResponse = useRef(null);

  const navigation = useNavigation();
  const dispatch = useDispatch();
  let user = useSelector((state: RootState) => state.auth);

  const {
    setterForApiData: loginSetterForApiData,
    apiData: loginApiData,
    checkForError: LoginCheckForError,
  } = useErrorHandlingHook({
    userName: rememberMe ? credentials.userName : null,
    password: rememberMe ? credentials?.password : null,
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

  const {
    data: getCoverageData,
    loading: getCoverageLoading,
    trigger: getCovergaeApi,
  } = useApiHook({
    apiEndpoint: endpoints.coverage.getCoverage,
    method: 'get',
    skip: true,

    onSuccess: res => {
      let data = loginResponse.current;
      data.Data.coverageType = res;
      data.Data.showPriorApproval = res?.some(
        item => item?.CoverageType === 'IPD',
      );

      dispatch(setUserData(data));
    },
    onError: e => {
      console.log('error in seocnd APi ', e);
    },
  });

  const {loading, trigger} = useApiHook({
    apiEndpoint: endpoints.auth.login,
    method: 'post',

    onSuccess: res => {
      loginResponse.current = res;
      let apiData = {
        ClientCode: res?.Data?.ClientCode,
      };

      getCovergaeApi(apiData);
    },
    onError: error => {
      dispatch(setErrorModal({Show: true, message: error.error}));
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

  const handleLogin = async () => {
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

    dispatch(
      setRememberMe({
        userName: loginApiData.userName,
        password: loginApiData?.password,
        rememberMe: checked,
      }),
    );
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
    setChecked(!checked);
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
      checked,
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
