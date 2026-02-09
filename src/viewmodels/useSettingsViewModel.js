import {icons} from '../assets';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {SetIsToggle, setBiometrics} from '../redux/authSlice';
import {Buffer} from 'buffer';
import ReactNativeBiometrics from 'react-native-biometrics';

const useSettingsViewModel = () => {
  const dispatch = useDispatch();
  const {isToggle, loginCredentials} = useSelector(state => state.auth);

  const toggleSwitch = async () => {
    const value = !isToggle;
    dispatch(SetIsToggle(value));
    const rnBiometrics = new ReactNativeBiometrics();
    if (value) {
      if (loginCredentials?.userName && loginCredentials?.password) {
        dispatch(
          setBiometrics({
            ...loginCredentials,
            password: Buffer.from(loginCredentials.password, 'utf8').toString(
              'base64',
            ),
          }),
        );
      }
    } else {
      await rnBiometrics.deleteKeys();
      dispatch(setBiometrics(null));
    }
  };

  const navigation = useNavigation();
  const data = [
    {
      id: 1,
      label: 'Account',
      icon: icons.account,
      to: 'account',
    },
    {
      id: 2,
      label: 'Face ID/ Finger Print',
      icon: icons.faceIDIcon,
      to: 'Face ID/ Finger Print',
    },

    {
      id: 4,
      label: 'Change Password',
      params: {
        step: 3,
        isChangedPassword: true,
        type: 'forgot',
      },
      to: 'ForgotPassword',
      icon: icons.resetPasswordIcon,
    },
  ];

  const goBack = () => {
    navigation.goBack();
  };

  const onPressMenu = data => {
    let params = {};
    if (data?.params) {
      params = {...params, ...data?.params};
    }
    if (data?.to) {
      navigation.navigate(data?.to, params);
      return;
    }
  };

  return {
    states: {
      data,
      isToggle,
    },
    functions: {
      toggleSwitch,
      goBack,
      onPressMenu,
    },
  };
};

export default useSettingsViewModel;
