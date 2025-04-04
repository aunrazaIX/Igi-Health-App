import {useState} from 'react';

type UseLoginViewModelReturn = {
  states: {
    selectedTab: string;
  };
  functions: {
    onPressTab: (name: string) => void;
  };
};

const useLoginViewModel = (): UseLoginViewModelReturn => {
  const [selectedTab, setSelectedTab] = useState<string>('login');

  const onPressTab = (name: string) => setSelectedTab(name);

  return {
    states: {
      selectedTab,
    },
    functions: {
      onPressTab,
    },
  };
};

export default useLoginViewModel;
