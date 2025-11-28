/* eslint-disable react-hooks/exhaustive-deps */
import {useNavigation} from '@react-navigation/native';
import {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setBiometrics, setRememberMe} from '../redux/authSlice';
import useErrorHandlingHook from '../hooks/useErrorHandlingHook';
import {setErrorModal} from '../redux/generalSlice';
import ReactNativeBiometrics from 'react-native-biometrics';
import {PermissionsAndroid, Platform} from 'react-native';

const useLoginViewModel = () => {
  const {rememberMe, credentials, biometrics, isToggle} = useSelector(
    state => state.auth,
  );

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [selectedTab, setSelectedTab] = useState('login');
  const [checked, setChecked] = useState(rememberMe);

  useEffect(() => {
    requestPermissionHandler().catch(() => {});
  }, []);

  const requestPermissionHandler = async () => {
    if (Platform.OS === 'ios') return true;

    if (Platform.Version >= 33) {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } else {
      return true;
    }
  };

  const {
    setterForApiData: loginSetterForApiData,
    apiData: loginApiData,
    checkForError: LoginCheckForError,
  } = useErrorHandlingHook({
    userName: rememberMe ? credentials?.userName : null,
    password: rememberMe ? credentials?.password : null,
  });

  const {setterForApiData: signupSetterForApiData, apiData: signupApiData} =
    useErrorHandlingHook({
      email: '',
      cellNumber: '',
      cnic: '',
      verify_type: '0',
    });

  const handleLogin = async () => {    
    const filled = LoginCheckForError();
    if (!filled) return;
    dispatch(
      setRememberMe({
        userName: loginApiData.userName,
        password: loginApiData.password,
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
              biometryType: biometryType,
            }),
          );
        }
      } catch (error) {
        console.log('Biometric setup error:', error);
      }
    }
  };

  const onPressToucdId = async () => {
    try {
      if (!isToggle) {
        throw new Error('Enable biometrics in settings first');
      }

      const rnBiometrics = new ReactNativeBiometrics({
        allowDeviceCredentials: true,
      });
      const {available, biometryType} = await rnBiometrics.isSensorAvailable();

      if (!available) throw new Error('Biometrics not available');

      const {keysExist} = await rnBiometrics.biometricKeysExist();
      if (!keysExist) await rnBiometrics.createKeys();

      const {success} = await rnBiometrics.createSignature({
        promptMessage:
          biometryType === ReactNativeBiometrics.FaceID
            ? 'Confirm Face ID'
            : 'Confirm Fingerprint',
        payload: 'login',
      });

      if (!success) {
        throw new Error('Biometric authentication failed');
      }

      if (!biometrics?.userName || !biometrics?.password) {
        throw new Error('No stored biometric credentials');
      }

    } catch (error) {
      dispatch(
        setErrorModal({
          Show: true,
          message: 'Biometric Failed',
          detail: error.message,
        }),
      );
    }
  };

  const handleSignup = () => {
    if (signupApiData.email && signupApiData.cellNumber && signupApiData.cnic) {
    } else {
      dispatch(
        setErrorModal({
          Show: true,
          message: 'Fill all fields',
          detail: 'All fields are required to continue.',
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

  return {
    states: {
      selectedTab,
      tabs,
      signupApiData,
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
      onPressToucdId,
    },
  };
};

export default useLoginViewModel;
