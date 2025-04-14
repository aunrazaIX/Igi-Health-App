import { ImageSourcePropType } from 'react-native';
import {icons} from '../assets';
import { useState } from 'react';

type UseSettingsViewModelReturnType = {
  states: {
    data: SettingsList[];
    isToggle: boolean;
  };
  functions: {
    toggleSwitch: () => void;
  }
};
export type SettingsList = {
    id: number;
    label: string;
    icon: ImageSourcePropType;
}
const useSettingsViewModel = (): UseSettingsViewModelReturnType => {
  const [isToggle, setIsToggle] = useState<boolean>(false);

  const toggleSwitch = (): void => {
    setIsToggle((previousState) => !previousState);
  };
  const data: SettingsList[] = [
    {
      id: 1,
      label: 'Account',
      icon: icons.account,
    },
    {
      id: 2,
      label: 'Face ID/ Finger Print',
      icon: icons.faceIDIcon,
    },
    {
      id: 3,
      label: 'Privacy',
      icon: icons.privacy,
    },
    {
      id: 4,
      label: 'Reset Password',
      icon: icons.resetPasswordIcon,
    },
    {
      id: 5,
      label: 'Two-step verification',
      icon: icons.twoStep,
    },
    {
      id: 6,
      label: 'Avatar',
      icon: icons.name,
    },
    {
      id: 7,
      label: 'Notifications',
      icon: icons.bellNotification,
    },
    {
      id: 8,
      label: 'Help',
      icon: icons.help,
    },
    {
      id: 9,
      label: 'Invite a Friend',
      icon: icons.friend,
    },
  ];
  return {
    states: {
      data, isToggle
    },
    functions: {
        toggleSwitch
    }
  };
};

export default useSettingsViewModel;
