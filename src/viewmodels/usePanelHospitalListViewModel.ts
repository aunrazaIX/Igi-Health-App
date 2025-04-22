import {useState} from 'react';

export type PanelHospitalList = {
  label: string;
  value: string;
};

type usePanelHospitalListViewModel = {
  states: {
    data: PanelHospitalList[][];
    selectedTab: string;
    selectedTabRight: string;
  };
  functions: {
    onPressTab: (tab: string) => void;
    onPressRightTab: (tab: string) => void;
  };
};

const usePanelHospitalListViewModel = (): usePanelHospitalListViewModel => {
  const [selectedTab, setSelectedTab] = useState('PanelHospitals');
  const [selectedTabRight, setSelectedTabRight] = useState('list');

  const onPressTab = (tab: string) => {
    setSelectedTab(tab);
  };

  const onPressRightTab = (tab: string) => {
    setSelectedTabRight(tab);
  };

  const data: PanelHospitalList[][] = [
    [
      {label: 'name:', value: 'Heart & General Hospital'},
      {label: 'phone:', value: '81-2822408, 081-2822409'},
      {
        label: 'Address:',
        value: '15D, 16D, Model Town, Old Pishin Bus Stop, Quetta',
      },
      {label: 'City:', value: 'Baluchistan, Quetta'},
    ],
    [
      {label: 'name:', value: '0071453'},
      {label: 'phone:', value: '6140.0'},
      {label: 'Address:', value: 'Imran Naveed Qureshi'},
      {label: 'City:', value: '23/01/2021'},
    ],
    [
      {label: 'name:', value: 'Heart & General Hospital'},
      {label: 'phone:', value: '81-2822408, 081-2822409'},
      {
        label: 'Address:',
        value: '15D, 16D, Model Town, Old Pishin Bus Stop, Quetta',
      },
      {label: 'City:', value: 'Baluchistan, Quetta'},
    ],
    [
      {label: 'name:', value: 'Heart & General Hospital'},
      {label: 'phone:', value: '81-2822408, 081-2822409'},
      {
        label: 'Address:',
        value: '15D, 16D, Model Town, Old Pishin Bus Stop, Quetta',
      },
      {label: 'City:', value: 'Baluchistan, Quetta'},
    ],
    [
      {label: 'name:', value: 'Heart & General Hospital'},
      {label: 'phone:', value: '81-2822408, 081-2822409'},
      {
        label: 'Address:',
        value: '15D, 16D, Model Town, Old Pishin Bus Stop, Quetta',
      },
      {label: 'City:', value: 'Baluchistan, Quetta'},
    ],
    [
      {label: 'name:', value: 'Heart & General Hospital'},
      {label: 'phone:', value: '81-2822408, 081-2822409'},
      {
        label: 'Address:',
        value: '15D, 16D, Model Town, Old Pishin Bus Stop, Quetta',
      },
      {label: 'City:', value: 'Baluchistan, Quetta'},
    ],
  ];

  return {
    states: {
      data,
      selectedTab,
      selectedTabRight,
    },
    functions: {
      onPressTab,
      onPressRightTab,
    },
  };
};

export default usePanelHospitalListViewModel;
