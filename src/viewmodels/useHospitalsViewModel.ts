import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import useApiHook from '../hooks/useApiHook';
import endpoints from '../api/endspoints';
import {icons} from '../assets';

export type PanelHospitalList = {
  label: string;
  value: string;
};

type usePanelHospitalListViewModel = {
  states: {
    data: PanelHospitalList[][];
    selectedTab: string;
    selectedTabRight: string;
    selectedMapTab: string;
  };
  functions: {
    onPressTab: (tab: string) => void;
    onPressRightTab: (tab: string) => void;
    onPressMapTab: (tab: string) => void;
    goBack: () => void;
  };
};

const useHospitalsViewModel = (): usePanelHospitalListViewModel => {
  const [selectedTab, setSelectedTab] = useState('Panel Hospitals');
  const [selectedTabRight, setSelectedTabRight] = useState('list');
  const [selectedMapTab, setSelectedMapTab] = useState('Sindh');
  const [data, setData] = useState([]);

  const navigation = useNavigation();

  const onPressTab = (tab: string) => {
    setSelectedTab(tab);
  };

  const onPressRightTab = (tab: string) => {
    setSelectedTabRight(tab);
  };

  const onPressMapTab = (tab: string) => {
    setSelectedMapTab(tab);
  };

  const goBack = () => {
    navigation.goBack();
  };

  const {loading} = useApiHook({
    apiEndpoint: endpoints.panelHospital.getPanelHospitals,
    method: 'get',
    onSuccess: res => {
      setData(
        res?.map(item => ({
          headerLabel: item?.HospitalName,
          headerIcon: icons.taskEdit,
          longitude: item?.HospitalLong,
          latitude: item?.HospitalLat,
          items: [
            // {label: 'name:', value: item?.HospitalName},
            {label: 'phone:', value: item?.HospitalContact},
            {
              label: 'Address:',
              value: item?.HospitalAddress,
            },
            {label: 'City:', value: item?.CityName},
          ],
        })),
      );
    },
  });

  // const data: PanelHospitalList[][] = [
  //   [
  //     {label: 'name:', value: 'Heart & General Hospital'},
  //     {label: 'phone:', value: '81-2822408, 081-2822409'},
  //     {
  //       label: 'Address:',
  //       value: '15D, 16D, Model Town, Old Pishin Bus Stop, Quetta',
  //     },
  //     {label: 'City:', value: 'Baluchistan, Quetta'},
  //   ],
  //   [
  //     {label: 'name:', value: '0071453'},
  //     {label: 'phone:', value: '6140.0'},
  //     {label: 'Address:', value: 'Imran Naveed Qureshi'},
  //     {label: 'City:', value: '23/01/2021'},
  //   ],
  //   [
  //     {label: 'name:', value: 'Heart & General Hospital'},
  //     {label: 'phone:', value: '81-2822408, 081-2822409'},
  //     {
  //       label: 'Address:',
  //       value: '15D, 16D, Model Town, Old Pishin Bus Stop, Quetta',
  //     },
  //     {label: 'City:', value: 'Baluchistan, Quetta'},
  //   ],
  //   [
  //     {label: 'name:', value: 'Heart & General Hospital'},
  //     {label: 'phone:', value: '81-2822408, 081-2822409'},
  //     {
  //       label: 'Address:',
  //       value: '15D, 16D, Model Town, Old Pishin Bus Stop, Quetta',
  //     },
  //     {label: 'City:', value: 'Baluchistan, Quetta'},
  //   ],
  //   [
  //     {label: 'name:', value: 'Heart & General Hospital'},
  //     {label: 'phone:', value: '81-2822408, 081-2822409'},
  //     {
  //       label: 'Address:',
  //       value: '15D, 16D, Model Town, Old Pishin Bus Stop, Quetta',
  //     },
  //     {label: 'City:', value: 'Baluchistan, Quetta'},
  //   ],
  //   [
  //     {label: 'name:', value: 'Heart & General Hospital'},
  //     {label: 'phone:', value: '81-2822408, 081-2822409'},
  //     {
  //       label: 'Address:',
  //       value: '15D, 16D, Model Town, Old Pishin Bus Stop, Quetta',
  //     },
  //     {label: 'City:', value: 'Baluchistan, Quetta'},
  //   ],
  // ];

  return {
    states: {
      data,
      selectedTab,
      selectedTabRight,
      selectedMapTab,
    },
    functions: {
      onPressTab,
      onPressRightTab,
      onPressMapTab,
      goBack,
    },
  };
};

export default useHospitalsViewModel;
