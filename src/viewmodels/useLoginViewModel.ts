import {useState} from 'react';

type UseLoginViewModelReturn = {
  states: {
    selectedTab: string;
    tabs: string[];
  };
  functions: {
    onPressTab: (name: string) => void;
  };
};

const useLoginViewModel = (): UseLoginViewModelReturn => {
  const [selectedTab, setSelectedTab] = useState<string>('login');

  const onPressTab = (name: string) => setSelectedTab(name);
  const tabs = ['login', 'signup']
  return {
    states: {
      selectedTab, tabs
    },
    functions: {
      onPressTab,
    },
  };
};

export default useLoginViewModel;
