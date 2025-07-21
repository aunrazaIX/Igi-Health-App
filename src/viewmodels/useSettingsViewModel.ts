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
    // {
    //   id: 3,
    //   label: 'Privacy',
    //   icon: icons.privacy,
    //   to: 'Privacy',
    // },
    {
      id: 4,
      label: 'Change Password',
      icon: icons.resetPasswordIcon,
      mainParent: 'DrawerStack',
      stChild: 'SettingsStack',
      ndChild: 'ForgotPassword',
    },

    // {
    //   id: 7,
    //   label: 'Notifications',
    //   icon: icons.bellNotification,
    //   mainParent: 'Tabs',
    //   stChild: 'HomeStack',
    //   ndChild: 'Notifications',
    // },

    {
      id: 8,
      label: 'Help',
      icon: icons.help,
      mainParent: 'Tabs',
      stChild: 'Helpline',
    },
  ];

  const goBack = () => {
    navigation.goBack();
  };

  const onPressMenu = (data: SettingsList) => {
    if (data?.to) {
      navigation.navigate(data?.to);
      return;
    }
    if (data?.mainParent && data?.stChild && data?.ndChild) {
      navigation.navigate(data?.mainParent, {
        screen: data?.stChild,
        params: {
          screen: data?.ndChild,
        },
      });
      return;
    }
    if (data?.mainParent && data.stChild) {
      navigation.navigate(data.mainParent, {
        screen: data.stChild,
      });
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
