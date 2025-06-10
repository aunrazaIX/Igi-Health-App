import {useNavigation} from '@react-navigation/native';
import {useRef, useState} from 'react';
import useApiHook from '../hooks/useApiHook';
import endpoints from '../api/endspoints';
import {useDispatch, useSelector} from 'react-redux';
import {setBiometrics, setRememberMe, setUserData} from '../redux/authSlice';
import useErrorHandlingHook from '../hooks/useErrorHandlingHook';
import {setErrorModal} from '../redux/generalSlice';
import ReactNativeBiometrics from 'react-native-biometrics';
import {RootState} from '../redux/store';

export type UserDetails = {
  name: string;
  cnicNum: string;
  email: string;
};
// type VerifiedUserData = {
//   UserID: string;
//   UserEmail: string;
//   UserCellNumber: string;
//   ClientCode: string;
//   uuid: string;
// };
type UseLoginViewModelReturn = {
  states: {
    selectedTab: string;
    tabs: string[];
    loading: boolean;
    signupApiData: any;
    loadingSignup: boolean;
    loginApiData: any;
    rememberMe: boolean;
    checked: boolean;
  };
  functions: {
    onPressTab: (name: string) => void;
    onPressforgotPassword: (to: keyof RootStackParamList) => void;
    handleLogin: () => void;
    handleSignup: () => void;
    signupSetterForApiData: (key: string, value: any) => void;
    loginSetterForApiData: (key: string, value: any) => void;
    handleCheck: () => void;
    onPressToucdId: any;
    onPressFaceId: any;
  };
};

const useLoginViewModel = (): UseLoginViewModelReturn => {
  const {rememberMe, credentials, deviceId, biometrics, user} = useSelector(
    (state: RootState) => state.auth,
  );
  console.log(user);
  // console.log(biometrics, deviceId, 'biomertriccc');

  const [selectedTab, setSelectedTab] = useState<string>('login');
  const [verifiedUserData, setVerifiedUserData] = useState(null);
  const [checked, setChecked] = useState(rememberMe);

  const loginResponse = useRef(null);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const {
    setterForApiData: loginSetterForApiData,
    apiData: loginApiData,
    checkForError: LoginCheckForError,
  } = useErrorHandlingHook({
    userName: rememberMe ? credentials?.userName : null,
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
        // ClientCode: res?.Data?.ClientCode,
        ClientCode: 'ERC',
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

    // try {
    //   const rnBiometrics = new ReactNativeBiometrics({
    //     allowDeviceCredentials: true,
    //   });

    //   const {available} = await rnBiometrics.isSensorAvailable();
    //   await rnBiometrics.deleteKeys();
    //   if (available) {
    //     const {keysExist} = await rnBiometrics.biometricKeysExist();
    //     if (!keysExist) {
    //       await rnBiometrics.createKeys();
    //     }
    //   }
    // } catch (error) {
    //   console.log('Biometric setup error:', error);
    // }

    dispatch(
      setBiometrics({
        userName: loginApiData.userName,
        password: loginApiData?.password,
        deviceId: '23232323232',
        LoginDeviceName: 'Mobile',
      }),
    );

    trigger(apiData);
  };

  const onPressFaceId = async () => {
    try {
      const rnBiometrics = new ReactNativeBiometrics({
        allowDeviceCredentials: true,
      });

      const {available, biometryType} = await rnBiometrics.isSensorAvailable();

      if (!available || biometryType !== ReactNativeBiometrics.FaceID) {
        throw new Error('Face ID is not available on this device');
      }

      const {keysExist} = await rnBiometrics.biometricKeysExist();
      if (!keysExist) {
        throw new Error(
          'Face ID keys not found. Please login manually once to enable Face ID login.',
        );
      }

      const {success} = await rnBiometrics.createSignature({
        promptMessage: 'Confirm Face ID to login',
        payload: 'face_id_auth',
      });

      if (!success) {
        throw new Error('Face ID authentication failed');
      }

      if (!biometrics?.id || !biometrics?.password || !deviceId) {
        throw new Error('Missing stored Face ID credentials');
      }

      const Buffer = require('buffer').Buffer;
      let encodedAuth = new Buffer(biometrics.password).toString('base64');

      const apiData = {
        userName: biometrics.id,
        password: encodedAuth,
        DeviceId: deviceId,
        LoginDeviceName: 'FaceIDDevice',
      };

      dispatch(
        setRememberMe({
          userName: biometrics.id,
          password: biometrics.password,
          rememberMe: true,
        }),
      );

      trigger(apiData);
    } catch (e) {
      console.log(e?.message || e, 'face id login error');
      dispatch(
        setErrorModal({
          Show: true,
          message: e?.message || 'Face ID login failed',
        }),
      );
    }
  };

  const onPressToucdId = async () => {
    console.log('Touch ID is running...');
    try {
      const rnBiometrics = new ReactNativeBiometrics({
        allowDeviceCredentials: true,
      });

      const {available} = await rnBiometrics.isSensorAvailable();
      if (!available) {
        throw new Error('Biometric sensor not available on this device');
      }

      const {keysExist} = await rnBiometrics.biometricKeysExist();
      if (!keysExist) {
        throw new Error(
          'Please login manually first to enable biometric login',
        );
      }

      const {success, signature} = await rnBiometrics.createSignature({
        promptMessage: 'Confirm your identity to login',
        payload: '22',
      });

      if (success) {
        console.log(signature, 'dsjaoij');
        // verifySignatureWithServer(signature, payload);
      }

      if (!success) {
        throw new Error('Biometric authentication failed');
      }

      if (!biometrics?.userName || !biometrics?.password || !deviceId) {
        throw new Error(
          'Missing stored biometric credentials. Please login manually first.',
        );
      }

      const Buffer = require('buffer').Buffer;
      let encodedAuth = new Buffer(biometrics.password).toString('base64');

      const apiData = {
        userName: biometrics.userName,
        password: encodedAuth,
        DeviceId: deviceId,
        LoginDeviceName: 'BiometricDevice',
      };

      if (
        credentials?.userName !== biometrics.userName ||
        credentials?.password !== biometrics.password
      ) {
        dispatch(
          setRememberMe({
            userName: biometrics.userName,
            password: biometrics.password,
            rememberMe: true,
          }),
        );
      }

      await trigger(apiData);
    } catch (error: any) {
      console.log('Biometric login error:', error);
      dispatch(
        setErrorModal({
          Show: true,
          message:
            error?.message || 'Biometric login failed. Please try again.',
        }),
      );
    }
  };

  ///// end of biometric function

  const handleSignup = () => {
    const filled = signupCheckForError();
    if (!filled) return;

    triggerSignup();
  };

  const onPressTab = (name: string) => setSelectedTab(name);

  const onPressforgotPassword = (to: keyof RootStackParamList) => {
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
      onPressToucdId,
      onPressFaceId,
    },
  };
};

export default useLoginViewModel;
