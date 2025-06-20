import {useNavigation} from '@react-navigation/native';
import {useState, useEffect} from 'react';
import useApiHook from '../hooks/useApiHook';
import endpoints from '../api/endspoints';
import {icons} from '../assets';

export type PanelHospitalList = {
  label: string;
  value: string;
};

type usePanelHospitalListViewModel = {
  states: {
    data: PanelHospitalList[];
    selectedTab: string;
    selectedTabRight: string;
    selectedMapTab: string;
    searchText: string;
    hospitalLoading: boolean;
    tabChanging: boolean;
  };
  functions: {
    onPressTab: (tab: string) => void;
    onPressRightTab: (tab: string) => void;
    onPressMapTab: (tab: string) => void;
    goBack: () => void;
    setSearchText: (text: string) => void;
  };
};

const useHospitalsViewModel = (): usePanelHospitalListViewModel => {
  const navigation = useNavigation();

  const [selectedTab, setSelectedTab] = useState('Panel Hospitals');
  const [selectedTabRight, setSelectedTabRight] = useState('list');
  const [selectedMapTab, setSelectedMapTab] = useState('Sindh');
  const [searchText, setSearchText] = useState('');
  const [allData, setAllData] = useState([]);
  const [data, setData] = useState([]);

  const onPressTab = (tab: string) => setSelectedTab(tab);
  const onPressRightTab = (tab: string) => setSelectedTabRight(tab);
  const [tabChanging, setTabChanging] = useState(false);

  const onPressMapTab = (tab: string) => {
    setSelectedMapTab(tab);
    setData([]);
    setTabChanging(true);
  };

  const goBack = () => navigation.goBack();

  useEffect(() => {
    const lowerText = searchText.toLowerCase();

    let filtered = allData;

    if (selectedMapTab) {
      filtered = filtered.filter(item => item.ProvinceName === selectedMapTab);
    }

    if (searchText.trim()) {
      filtered = filtered.filter(
        item =>
          item.headerLabel?.toLowerCase().includes(lowerText) ||
          item.items?.some(subItem =>
            subItem.value?.toLowerCase().includes(lowerText),
          ),
      );
    }

    setData(filtered);
    setTabChanging(false);
  }, [searchText, selectedMapTab, allData]);

  const {loading: hospitalLoading} = useApiHook({
    apiEndpoint: endpoints.panelHospital.getPanelHospitals,
    method: 'get',
    onSuccess: res => {
      const formattedData =
        res?.map(item => ({
          headerLabel: item?.HospitalName,
          headerIcon: icons.taskEdit,
          longitude: item?.HospitalLong,
          latitude: item?.HospitalLat,
          ProvinceName: item?.ProvinceName,
          items: [
            {label: 'Phone:', value: item?.HospitalContact},
            {label: 'Address:', value: item?.HospitalAddress},
            {label: 'City:', value: item?.CityName},
          ],
        })) || [];

      setAllData(formattedData);
    },
  });

  return {
    states: {
      data,
      selectedTab,
      selectedTabRight,
      selectedMapTab,
      searchText,
      hospitalLoading,
      tabChanging,
    },
    functions: {
      onPressTab,
      onPressRightTab,
      onPressMapTab,
      goBack,
      setSearchText,
    },
  };
};

export default useHospitalsViewModel;
