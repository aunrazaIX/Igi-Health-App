import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useState, useEffect, useCallback} from 'react';
import useApiHook from '../hooks/useApiHook';
import endpoints from '../api/endspoints';
import {icons} from '../assets';
import {Linking} from 'react-native';
import Geolocation from '@react-native-community/geolocation';

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
    position: any;
  };
  functions: {
    onPressTab: (tab: string) => void;
    onPressRightTab: (tab: string) => void;
    onPressMapTab: (tab: string) => void;
    goBack: () => void;
    setSearchText: (text: string) => void;
    handleMapDirection: any;
  };
};

const useHospitalsViewModel = (): usePanelHospitalListViewModel => {
  const navigation = useNavigation();

  const [selectedTab, setSelectedTab] = useState('Panel Hospitals');
  const [selectedTabRight, setSelectedTabRight] = useState('list');
  const [selectedMapTab, setSelectedMapTab] = useState('Sindh');
  const [searchText, setSearchText] = useState('');
  const [allData, setAllData] = useState<any[]>([]);
  const [data, setData] = useState<any[]>([]);

  const [position, setPosition] = useState({
    latitude: 10,
    longitude: 10,
    latitudeDelta: 0.001,
    longitudeDelta: 0.001,
  });

  const onPressTab = (tab: string) => setSelectedTab(tab);
  const onPressRightTab = (tab: string) => setSelectedTabRight(tab);
  const [tabChanging, setTabChanging] = useState(false);

  const onPressMapTab = (tab: string) => {
    if (selectedMapTab === tab) return;
    setTabChanging(true);
    setSelectedMapTab(tab);
    // setData([]);
  };

  const handleMapDirection = (
    latitude: string | number,
    longitude: string | number,
  ) => {
    if (latitude && longitude) {
      const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
      Linking.openURL(url).catch(err => {
        console.error('Failed to open Google Maps:', err);
      });
    }
  };
  const goBack = () => navigation.goBack();

  useEffect(() => {
    const lowerText = searchText.toLowerCase();

    let filtered: any[] = allData;

    if (selectedMapTab) {
      filtered = filtered.filter(
        (item: any) => item.ProvinceName === selectedMapTab,
      );
    }

    if (searchText.trim()) {
      filtered = filtered.filter(
        (item: any) =>
          item.headerLabel?.toLowerCase().includes(lowerText) ||
          item.items?.some((subItem: any) =>
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
        res?.map((item: any) => ({
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

  useFocusEffect(
    useCallback(() => {
      Geolocation.getCurrentPosition(
        pos => {
          const crd = pos.coords;
          console.log(crd);
          setPosition({
            latitude: crd.latitude,
            longitude: crd.longitude,
            latitudeDelta: 0.0421,
            longitudeDelta: 0.0421,
          });
        },
        err => {
          console.log(err);
        },
      );
    }, []),
  );

  return {
    states: {
      data,
      selectedTab,
      selectedTabRight,
      selectedMapTab,
      searchText,
      hospitalLoading,
      tabChanging,
      position,
    },
    functions: {
      onPressTab,
      onPressRightTab,
      onPressMapTab,
      goBack,
      setSearchText,
      handleMapDirection,
    },
  };
};

export default useHospitalsViewModel;
