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
} from '../redux/authSlice';
import useErrorHandlingHook from '../hooks/useErrorHandlingHook';
import {setErrorModal} from '../redux/generalSlice';
import ReactNativeBiometrics from 'react-native-biometrics';
import {RootState} from '../redux/store';
import {DetailsContainer} from '../components';
import {Platform} from 'react-native';
import {generateUUID} from '../utils';

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
  const {
    rememberMe,
    credentials,
    deviceId,
    biometrics,
    user,
    isToggle,
    faceIdCredentials,
  } = useSelector((state: RootState) => state.auth);

  const test = useRef(null);

  console.log(biometrics, 'bioemtrics ');
  console.log(faceIdCredentials, 'faceiDDDDD');
  console.log(user, ' userrrrrr ');

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
        ClientCode: res?.Data?.ClientCode,
        // ClientCode: 'ERC',
      };
      getCovergaeApi(apiData);
    },
    onError: error => {
      const errorMessage = error?.error || error?.message || '';

      dispatch(
        setErrorModal({
          Show: true,
          message: `"Incorrect Credentials"`,
          detail:
            "We couldn't find an account with these details. Please check your username and password and try again.",
        }),
      );
    },
  });

  const {trigger: triggerSignup, loading: loadingSignup} = useApiHook({
    apiEndpoint: endpoints.auth.registerUser,
    method: 'post',
    argsOrBody: signupApiData,
    onSuccess: res => {
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
    },
    onError: () => {
      dispatch(
        setErrorModal({
          Show: true,
          message: 'Signup Failed',
          detail:
            'We couldn’t find your details in our records. Please check your information or contact IGI Life.',
        }),
      );

      console.log('oo');
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
      console.log('YE CASAAd', test.current);
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
              deviceId: '23232323232',
              LoginDeviceName: 'Mobile',
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

      if (
        !biometrics?.userName ||
        !biometrics?.password ||
        !biometrics?.deviceId
      ) {
        throw new Error(
          'Missing stored biometric credentials. Please login manually first...',
        );
      }

      const Buffer = require('buffer').Buffer;
      let encodedAuth = new Buffer(biometrics.password).toString('base64');

      const apiData = {
        userName: biometrics.userName,
        password: encodedAuth,
        DeviceId: biometrics.deviceId,
        LoginDeviceName: 'mobile',
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
                deviceId: '23232323232',
                LoginDeviceName: 'Mobile',
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
