import {ImageSourcePropType} from 'react-native';
import {icons} from '../assets';
import {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Notification from '../screens/Notification';
import {useDispatch, useSelector} from 'react-redux';
import {SetIsToggle} from '../redux/authSlice';

type UseSettingsViewModelReturnType = {
  states: {
    data: SettingsList[];
    isToggle: boolean;
  };
  functions: {
    toggleSwitch: () => void;
    goBack: () => void;
    onPressMenu: (data: SettingsList) => void;
  };
};
export type SettingsList = {
  id: number;
  label: string;
  icon: ImageSourcePropType;
  to?: string;

  mainParent?: string;
  stChild?: string;
  ndChild?: string;
};
const useSettingsViewModel = (): UseSettingsViewModelReturnType => {
  const dispatch = useDispatch();
  const isToggle = useSelector(state => state.auth.isToggle);

  const toggleSwitch = (): void => {
    dispatch(SetIsToggle(!isToggle));
  };

  const navigation = useNavigation();
  const data: SettingsList[] = [
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
        type: 'changePassword',
      },
      to: 'ForgotPassword',
      icon: icons.resetPasswordIcon,
    },
  ];

  const goBack = () => {
    navigation.goBack();
  };

  const onPressMenu = (data: SettingsList) => {
    let params = {};
    if (data?.params) {
      params = {...params, ...data?.params};
    }
    if (data?.to) {
      navigation.navigate(data?.to, params);
      return;
    }
  };
  // if (data?.mainParent && data?.stChild && data?.ndChild) {
  //   if (data?.stChild === 'SettingsStack') {
  //     console.log('from login');
  //     navigation.navigate(data?.mainParent, {
  //       screen: data?.stChild,
  //       params: {
  //         screen: data?.ndChild,
  //         step: 3,
  //       },
  //     });
  //   } else {
  //     navigation.navigate(data?.mainParent, {
  //       screen: data?.stChild,
  //       params: {
  //         screen: data?.ndChild,
  //       },
  //     });
  //   }

  //   return;
  // }

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
