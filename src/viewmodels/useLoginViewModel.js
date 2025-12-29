/* eslint-disable react-hooks/exhaustive-deps */
import {useNavigation} from '@react-navigation/native';
import {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  setBiometrics,
  setDeviceToken,
  SetIsToggle,
  setRememberMe,
  setUserData,
  setWidgetToken,
} from '../redux/authSlice';
import {
  AuthorizationStatus,
  getMessaging,
  getToken,
  requestPermission,
} from '@react-native-firebase/messaging';
import useErrorHandlingHook from '../hooks/useErrorHandlingHook';
import {
  setErrorModal,
  setPolicy,
  setSelectedPolicyObject,
} from '../redux/generalSlice';
import ReactNativeBiometrics from 'react-native-biometrics';
import {PermissionsAndroid, Platform} from 'react-native';
import endpoints from '../api/endspoints';
import useApiHook from '../hooks/useApiHook';
import {resetAllModules} from '../redux/lodgeSlice';
import {Buffer} from 'buffer';
import {getApp} from '@react-native-firebase/app';

const useLoginViewModel = () => {
  const {rememberMe, credentials, biometrics, isToggle, deviceToken} =
    useSelector(state => state.auth);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [selectedTab, setSelectedTab] = useState('login');
  const [checked, setChecked] = useState(rememberMe);
  const loginResponse = useRef(null);
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
    resetStates: signupResetStates,
    setterForApiData: signupSetterForApiData,
    apiData: signupApiData,
  } = useErrorHandlingHook({
    email: '',
    cnic: '',
    mobileNumber: '',
    roleId: 16,
  });

  const {trigger: generateToken} = useApiHook({
    method: 'post',

    instance: 'oladoc',
    headers: {
      'x-api-key': 'ASe]dcX1Pjf91e]dcIGI-demo0qxNd_I',
    },
    apiEndpoint: endpoints.oladoc.generateToken,
    onSuccess: res => {
      if (res?.data?.data) {
        dispatch(setWidgetToken(res?.data?.data?.token));
      }
    },
    onError: error => {
      console.log('Error', error);
    },
  });

  const {loading, trigger} = useApiHook({
    apiEndpoint: endpoints.auth.login,
    method: 'post',
    argsOrBody: loginApiData,
    onSuccess: res => {
      if (!res?.data?.policies || res?.data?.roleId !== 16) {
        dispatch(
          setErrorModal({
            Show: true,
            message: 'You are not allowed to log in.',
          }),
        );
        return;
      }

      console.log('REs', res);
      let argsOrBody = {
        identification_field: 'PHONE_NUMBER',
        identification_value: res?.data?.phoneNo,
        name: res?.data?.memberName,
        city: '',
        country_code: '+92',
        company_name: 'IGI LIFE LIMITED',
        policy: res?.data?.policies[0]?.policyNumber,
      };
      console.log(argsOrBody);
      generateToken(argsOrBody);
      loginResponse.current = res;
      if (res?.data.UserName !== credentials?.userName) {
        dispatch(resetAllModules());
      }
      dispatch(
        setRememberMe({
          userName: loginApiData?.userName,
          password: loginApiData?.password,
          rememberMe: checked,
        }),
      );
      if (res?.data?.policies?.length > 0) {
        dispatch(setPolicy(res?.data?.policies[0].policyNumber));
        dispatch(setSelectedPolicyObject(res?.data?.policies[0]));
      }
      dispatch(
        setUserData({
          Token: res?.data?.token,
          Data: res?.data,
        }),
      );
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
  const {trigger: triggerSignup, loading: loadingSignup} = useApiHook({
    apiEndpoint: endpoints.auth.registerUser,
    method: 'post',
    argsOrBody: signupApiData,
    onSuccess: res => {
      const hasToken = !!res?.data?.token;

      navigation.navigate('ForgotPassword', {
        type: 'signup',
        step: hasToken ? 3 : 2,
        otpToken: res?.data?.token ?? null,
        verifiedUserData: res?.data?.user,
      });
      signupResetStates();
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
  const handleLogin = async () => {
    const filled = LoginCheckForError();
    if (!filled) return;
    let apiData = {
      userName: loginApiData?.userName,
      password: loginApiData?.password,
      deviceToken: deviceToken ?? '--',
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
              userName: loginApiData?.userName,
              password: Buffer.from(loginApiData?.password, 'utf8').toString(
                'base64',
              ),
              biometryType,
            }),
          );
        }
      } catch (error) {
        console.log('Biometric setup error:', error);
      }
    }
    trigger(apiData);
  };

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

      const apiData = {
        userName: biometrics.userName,
        password: Buffer.from(biometrics.password, 'base64').toString('utf8'),
        deviceToken: deviceToken ?? '--',
      };
      await trigger(apiData);
    } catch (error) {
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
    if (
      signupApiData?.email &&
      signupApiData?.mobileNumber &&
      signupApiData?.cnic
    ) {
      triggerSignup(signupApiData);
    } else {
      dispatch(
        setErrorModal({
          Show: true,
          message: 'Please fill all fields',
          detail:
            'Please ensure that all required fields are filled out and try again. If the problem persists, contact IGI Life.',
        }),
      );
    }
  };

  const onPressTab = name => setSelectedTab(name);

  const onPressforgotPassword = screen => {
    navigation.navigate(screen, {step: 1, type: 'forgot'});
  };

  const handleCheck = () => setChecked(!checked);

  const tabs = ['login', 'signup'];

  useEffect(() => {
    if (
      biometrics?.userName &&
      loginApiData?.userName &&
      biometrics?.userName !== loginApiData?.userName
    ) {
      dispatch(SetIsToggle(false));
      dispatch(setBiometrics(null));
      return;
    }

    if (isToggle && loginApiData?.userName && loginApiData?.password) {
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
                userName: loginApiData?.userName,
                password: Buffer.from(loginApiData?.password, 'utf8').toString(
                  'base64',
                ),
                biometryType,
              }),
            );
          }
        } catch (error) {
          console.log('Biometric setup error (toggle):', error);
        }
      };
      setupBiometrics();
    }
  }, [isToggle, loginApiData?.userName, loginApiData?.password]);

  return {
    states: {
      selectedTab,
      tabs,
      signupApiData,
      loginApiData,
      checked,
      loading,
      loadingSignup,
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
