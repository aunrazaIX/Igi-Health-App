import {icons} from '../assets';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {SetIsToggle} from '../redux/authSlice';

const useSettingsViewModel = () => {
  const dispatch = useDispatch();
  const isToggle = useSelector(state => state.auth.isToggle);

  const toggleSwitch = () => {
    dispatch(SetIsToggle(!isToggle));
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
