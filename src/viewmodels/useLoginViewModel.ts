import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';

type UseLoginViewModelReturn = {
  states: {
    selectedTab: string;
    tabs: string[];
  };
  functions: {
    onPressTab: (name: string) => void;
    onPressforgotPassword: (to : string)=>void
  };
};

const useLoginViewModel = (): UseLoginViewModelReturn => {

  const navigation = useNavigation()




  const [selectedTab, setSelectedTab] = useState<string>('login');

  const onPressTab = (name: string) => setSelectedTab(name);

  const onPressforgotPassword = (to: string) => {
    navigation.navigate(to)

  }
  const tabs = ['login', 'signup']
  return {
    states: {
      selectedTab, tabs
    },
    functions: {
      onPressTab,
      onPressforgotPassword
    },
  };
};

export default useLoginViewModel;
