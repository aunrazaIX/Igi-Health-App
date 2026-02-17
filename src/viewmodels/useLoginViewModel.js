/* eslint-disable react-hooks/exhaustive-deps */
import {useNavigation} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  setBiometrics,
  setDeviceToken,
  SetIsToggle,
  setRememberMe,
  setUserData,
  setWidgetToken,
  setLoginCredentials,
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
import Toast from 'react-native-toast-message';

const useLoginViewModel = () => {
  const {rememberMe, credentials, biometrics, isToggle, deviceToken} =
    useSelector(state => state.auth);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [selectedTab, setSelectedTab] = useState('login');
  const [checked, setChecked] = useState(rememberMe);

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
    platform: 'mobileapp',
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
      'x-api-key': 'rjom==|tpj6w{k&Z;e7:?M)b,@8,=s1o',
    },
    apiEndpoint: endpoints.oladoc.generateToken,
    onSuccess: res => {
      if (res?.data?.data) {
        dispatch(setWidgetToken(res?.data?.data?.token));
      }
    },
    onError: error => {
      dispatch(setWidgetToken(null));
      console.log('Error', error);
    },
  });

  const {loading, trigger} = useApiHook({
    apiEndpoint: endpoints.auth.login,
    method: 'post',
    onSuccess: res => {
      console.log('REs', res);
      if (!res?.data?.policies || res?.data?.roleId !== 16) {
        dispatch(
          setErrorModal({
            Show: true,
            message: 'You are not allowed to log in.',
          }),
        );
        return;
      }
      const {allowClaims, isOladocFeatures} = res?.data || {};
      if (allowClaims || isOladocFeatures) {
        let argsOrBody = {
          identification_field: 'EMAIL',
          identification_value: res?.data?.email,
          name: res?.data?.memberName,
          city: '',
          country_code: '+92',
          company_name: res?.data?.policies[0]?.companyName,
          policy: res?.data?.policies[0]?.policyNumber,
          email: res?.data?.email,
          cnic: res?.data?.cnic,
          mobile_number: res?.data?.phoneNo,
        };
        generateToken(argsOrBody);
      }
      if (res?.data.UserName !== credentials?.userName) {
        dispatch(resetAllModules());
      }

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
      dispatch(
        setLoginCredentials({
          userName: loginApiData?.userName,
          password: loginApiData?.password,
        }),
      );
      dispatch(
        setRememberMe({
          userName: checked ? loginApiData?.userName : null,
          password: checked ? loginApiData?.password : null,
          rememberMe: checked,
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
      if (res?.data?.skipVerification) {
        Toast.show({
          type: 'success',
          text1: 'Account Created Successfully, Login to continue',
        });
        setSelectedTab('login');
        signupResetStates();
        return;
      }
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
    if (isToggle && biometrics?.userName !== loginApiData?.userName) {
      const rnBiometrics = new ReactNativeBiometrics();
      await rnBiometrics.deleteKeys();

      dispatch(SetIsToggle(false));
      dispatch(setBiometrics(null));
      dispatch(
        setErrorModal({
          Show: true,
          message: 'Previous user biometric login is disabled.',
        }),
      );
      return;
    }
    let apiData = {
      userName: loginApiData?.userName,
      password: loginApiData?.password,
      deviceToken: deviceToken ?? '--',
      platform: 'mobileapp',
    };
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
        platform: 'mobileapp',
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

  const handleCheck = () => {
    setChecked(!checked);
  };

  const tabs = ['login', 'signup'];

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
