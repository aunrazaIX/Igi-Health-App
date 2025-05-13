import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';

export type User = {
  userName: string | null;
  password: string | null;
};

type UseLoginViewModelReturn = {
  states: {
    selectedTab: string;
    tabs: string[];
    user: User;
  };
  functions: {
    onPressTab: (name: string) => void;
    onPressforgotPassword: (to: string) => void;
    setuser: React.Dispatch<React.SetStateAction<User>>;
  };
};

const useLoginViewModel = (): UseLoginViewModelReturn => {
  const navigation = useNavigation();
  const [selectedTab, setSelectedTab] = useState<string>('login');
  const onPressTab = (name: string) => setSelectedTab(name);

  const onPressforgotPassword = (to: string) => {
    navigation.navigate(to);
  };

  const [user, setuser] = useState<User>({
    userName: null,
    password: null,
  });

  console.log(user, 'uuuuuuuu');

  const tabs = ['login', 'signup'];
  return {
    states: {
      selectedTab,
      tabs,
      user,
    },
    functions: {
      onPressTab,
      onPressforgotPassword,
      setuser,
    },
  };
};

export default useLoginViewModel;
