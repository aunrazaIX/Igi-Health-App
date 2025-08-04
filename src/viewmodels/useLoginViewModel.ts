import {useNavigation} from '@react-navigation/native';
import {useEffect, useRef, useState} from 'react';
import useApiHook from '../hooks/useApiHook';
import endpoints from '../api/endspoints';
import {useDispatch, useSelector} from 'react-redux';
import {
  setBiometrics,
  setRememberMe,
  setUserData,
  setFaceIdCredentials,
  setDeviceToken,
} from '../redux/authSlice';
import useErrorHandlingHook from '../hooks/useErrorHandlingHook';
import {setErrorModal} from '../redux/generalSlice';
import ReactNativeBiometrics from 'react-native-biometrics';
import {RootState} from '../redux/store';
import {DetailsContainer} from '../components';
import {PermissionsAndroid, Platform} from 'react-native';
import {generateUUID} from '../utils';
import {
  AuthorizationStatus,
  getMessaging,
  getToken,
  requestPermission,
} from '@react-native-firebase/messaging';
import {getApp} from '@react-native-firebase/app';
import {resetAllModules} from '../redux/lodgeSlice';

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
    // onPressFaceId: any;
  };
};

const useLoginViewModel = (): UseLoginViewModelReturn => {
  const {rememberMe, credentials, biometrics, isToggle, deviceToken, user} =
    useSelector((state: RootState) => state.auth);

  const test = useRef(null);

  const [selectedTab, setSelectedTab] = useState<string>('login');
  const [verifiedUserData, setVerifiedUserData] = useState(null);
  const [checked, setChecked] = useState(rememberMe);
  const loginResponse = useRef(null);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    requestPermissionHandler()
      .then(bool => {
        if (bool) {
          const messagingInstance = getMessaging(getApp());
          getToken(messagingInstance)
            .then(token => {
              dispatch(setDeviceToken(token));
            })
            .catch(e => {
              console.log(e);
            });
        }
      })
      .catch(e => {
        console.log('E', e);
      });
  }, []);

  const requestPermissionHandler = async () => {
    let allowed = false;
    if (Platform.OS === 'ios') {
      const messagingInstance = getMessaging(getApp());
      const authStatus = await requestPermission(messagingInstance);
      const enabled =
        authStatus === AuthorizationStatus.AUTHORIZED ||
        authStatus === AuthorizationStatus.PROVISIONAL;
      if (enabled) {
        allowed = true;
      }
    } else {
      if (Platform.Version >= 33) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          allowed = true;
        }
      } else {
        allowed = true;
      }
    }
    return allowed;
  };

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
        item => item?.CoverageType === 'IPD - Hospitalization',
      );
      dispatch(setUserData(data));
    },
  });

  const {loading, trigger} = useApiHook({
    apiEndpoint: endpoints.auth.login,
    method: 'post',
    onSuccess: res => {
      loginResponse.current = res;
      if (res?.Data.UserName !== credentials?.userName) {
        dispatch(resetAllModules());
      }
      dispatch(
        setRememberMe({
          userName: loginApiData.userName,
          password: loginApiData?.password,
          rememberMe: checked,
        }),
      );
      let apiData = {
        ClientCode: res?.Data?.ClientCode,
        // ClientCode: 'PTC',
      };
      getCovergaeApi(apiData);
    },
    onError: e => {
      const errorMessage = e?.error || e?.message || '';

      dispatch(
        setErrorModal({
          Show: true,
          message: e?.header,
          detail: e?.error,
        }),
      );
    },
  });

  const {trigger: triggerSignup, loading: loadingSignup} = useApiHook({
    apiEndpoint: endpoints.auth.registerUser,
    method: 'post',
    argsOrBody: signupApiData,
    onSuccess: res => {
      if (res?.Data) {
        let id = generateUUID();
        test.current = {...res?.Data, uuid: id};
        let apiData = {
          userId: res?.Data?.UserID,
          uuid: id,
          user_email: res?.Data?.UserEmail,
          user_cellnumber: res?.Data?.UserCellNumber,
          opt_reason: 'Register New User',
          opt_typeID: '3',
          ClientCode: res?.Data?.ClientCode,
        };
        sendOtp(apiData);
      }
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
        verifiedUserData: test.current,
        type: 'signup',
      });
      signupResetStates();
    },
    onError: res => {
      dispatch(
        setErrorModal({
          Show: true,
          message: 'Signup Failed',
          detail:
            'We couldn’t find your details in our records. Please check your information or contact IGI Life.',
        }),
      );
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
      DeviceId: deviceToken ? deviceToken : '--',
      LoginDeviceName: 'Emulator',
    };

    if (isToggle) {
      try {
        const rnBiometrics = new ReactNativeBiometrics({
          allowDeviceCredentials: true,
        });
        const {available, biometryType} =
          await rnBiometrics.isSensorAvailable();
        if (available) {
          await rnBiometrics.deleteKeys();
          await rnBiometrics.createKeys();
          dispatch(
            setBiometrics({
              userName: loginApiData.userName,
              password: loginApiData?.password,
              biometryType: biometryType,
            }),
          );
        }
      } catch (error) {
        console.log('Biometric setup error:', error);
      }
    }
    trigger(apiData);
  };

  // face ID func
  // const onPressFaceId = async () => {
  //   try {
  //     if (!isToggle) {
  //       throw new Error('Please enable FaceId login from settings first');
  //     }
  //     const rnBiometrics = new ReactNativeBiometrics({
  //       allowDeviceCredentials: true,
  //     });

  //     const {available, biometryType} = await rnBiometrics.isSensorAvailable();

  //     if (!available || biometryType !== ReactNativeBiometrics.FaceId) {
  //       throw new Error('Face ID is not available on this device');
  //     }

  //     // Generate keys if they don't exist
  //     const {keysExist} = await rnBiometrics.biometricKeysExist();
  //     if (!keysExist) {
  //       await rnBiometrics.createKeys();
  //     }

  //     const {success} = await rnBiometrics.createSignature({
  //       promptMessage: 'Confirm Face ID to login',
  //       payload: '22',
  //     });
  //     if (!success) {
  //       throw new Error('Face ID authentication failed');
  //     }
  //     if (
  //       !faceIdCredentials?.userName ||
  //       !faceIdCredentials?.password ||
  //       !deviceId
  //     ) {
  //       throw new Error('Missing stored Face ID credentials');
  //     }
  //     const Buffer = require('buffer').Buffer;
  //     let encodedAuth = new Buffer(faceIdCredentials.password).toString(
  //       'base64',
  //     );
  //     const apiData = {
  //       userName: faceIdCredentials.userName,
  //       password: encodedAuth,
  //       DeviceId: faceIdCredentials.deviceId,
  //       LoginDeviceName: 'Mobile',
  //     };
  //     await trigger(apiData);
  //   } catch (e) {
  //     console.log(e?.message || e, 'face id login error');
  //     dispatch(
  //       setErrorModal({
  //         Show: true,
  //         message: e?.message || 'Face ID login failed',
  //       }),
  //     );
  //   }
  // };

  // Fngprnt func
  const onPressToucdId = async () => {
    try {
      if (!isToggle) {
        throw new Error(
          'Please enable Fingerprint/FaceId from App  settings first',
        );
      }
      const rnBiometrics = new ReactNativeBiometrics({
        allowDeviceCredentials: true,
      });

      const {available, biometryType} = await rnBiometrics.isSensorAvailable();

      if (!available) {
        throw new Error('No biometric sensor available on this device');
      }

      if (biometryType === ReactNativeBiometrics.FaceID && !available) {
        throw new Error('Face ID is not available on this device');
      }

      if (biometryType === ReactNativeBiometrics.TouchID && !available) {
        throw new Error('Fingerprint sensor is not available on this device');
      }

      const {keysExist} = await rnBiometrics.biometricKeysExist();
      if (!keysExist) {
        await rnBiometrics.createKeys();
      }

      const {success} = await rnBiometrics.createSignature({
        promptMessage:
          biometryType === ReactNativeBiometrics.FaceID
            ? 'Confirm Face ID to login'
            : 'Confirm your fingerprint to login',
        payload: '22',
      });

      if (!success) {
        throw new Error(
          `${
            biometryType === ReactNativeBiometrics.FaceID
              ? 'Face ID'
              : 'Fingerprint'
          } authentication failed`,
        );
      }

      if (!biometrics?.userName || !biometrics?.password) {
        throw new Error(
          'Missing stored biometric credentials. Please login manually first...',
        );
      }

      const Buffer = require('buffer').Buffer;
      let encodedAuth = new Buffer(biometrics.password).toString('base64');

      const apiData = {
        userName: biometrics.userName,
        password: encodedAuth,
        DeviceId: deviceToken ? deviceToken : '--',
        LoginDeviceName: 'Emulator',
      };

      await trigger(apiData);
    } catch (error: any) {
      console.log('Biometric login error:', error);
      if (Platform.OS === 'ios') {
        dispatch(
          setErrorModal({
            Show: true,
            message: 'Enable Face ID / Touch ID',
            detail:
              ' Please log in with your username and password first. You can turn on Face ID or Touch ID later in the app settings.',
          }),
        );
      } else {
        dispatch(
          setErrorModal({
            Show: true,
            message: 'Biometric Login Not Set Up',
            detail:
              "Please sign in with your username and password first. You can then enable biometric login in the app's settings.",
          }),
        );
      }
    }
  };

  const handleSignup = () => {
    // const filled = signupCheckForError();
    // if (!filled) return;

    if (signupApiData.email && signupApiData.cellNumber && signupApiData.cnic) {
      triggerSignup();
    } else {
      dispatch(
        setErrorModal({
          Show: true,
          message: 'Please fill all feilds',
          detail:
            'Please ensure that all required fields are filled out and try again. If the problem persists, contact IGI Life.',
        }),
      );
    }
  };

  const onPressTab = (name: string) => setSelectedTab(name);

  const onPressforgotPassword = (to: keyof RootStackParamList) => {
    navigation.navigate(to, {step: 1, type: 'forgot'});
  };

  const handleCheck = () => {
    setChecked(!checked);
  };

  const tabs = ['login', 'signup'];

  useEffect(() => {
    if (isToggle && credentials?.userName && credentials?.password) {
      const setupBiometrics = async () => {
        try {
          const rnBiometrics = new ReactNativeBiometrics({
            allowDeviceCredentials: true,
          });
          const {available, biometryType} =
            await rnBiometrics.isSensorAvailable();
          if (available) {
            await rnBiometrics.deleteKeys();
            await rnBiometrics.createKeys();
            dispatch(
              setBiometrics({
                userName: loginApiData.userName,
                password: loginApiData?.password,
                biometryType: biometryType,
              }),
            );
          }
        } catch (error) {
          console.log('Biometric setup error (toggle):', error);
        }
      };
      setupBiometrics();
    }
  }, [isToggle]);

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
      verifiedUserData,
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
    },
  };
};

export default useLoginViewModel;
