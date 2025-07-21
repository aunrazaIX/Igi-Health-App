import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useState, useEffect, useCallback} from 'react';
import {ImageSourcePropType, Linking} from 'react-native';
import {drawerIcons, icons} from '../assets';
import useApiHook from '../hooks/useApiHook';
import endpoints from '../api/endspoints';
import Geolocation from '@react-native-community/geolocation';

export type PanelHospitalGroup = {
  headerLabel: string;
  headerIcon: ImageSourcePropType;
  longitude?: string;
  latitude?: string;
  items: PanelHospitalList[];
  RelationName: string;
};

export type PanelHospitalList = {
  label: string;
  value: string;
};

type usePanelHospitalListViewModel = {
  states: {
    data: PanelHospitalGroup[];
    selectedTab: string;
    selectedTabRight: string;
    searchText: string;
    loading: boolean;
    position: any;
  };
  functions: {
    onPressTab: (tab: string) => void;
    onPressRightTab: (tab: string) => void;
    goBack: () => void;
    setSearchText: (text: string) => void;
    handleMapDirection: any;
  };
};

const usePanelHospitalListViewModel = (): usePanelHospitalListViewModel => {
  const [selectedTab, setSelectedTab] = useState('DiscountedCenters');
  const [selectedTabRight, setSelectedTabRight] = useState('list');
  const [data, setData] = useState<PanelHospitalGroup[]>([]);
  const [position, setPosition] = useState({
    latitude: 10,
    longitude: 10,
    latitudeDelta: 0.001,
    longitudeDelta: 0.001,
  });
  const [searchText, setSearchText] = useState('');
  const [allData, setAllData] = useState<{
    panelHospitals: PanelHospitalGroup[];
    discountedCenters: PanelHospitalGroup[];
  }>({panelHospitals: [], discountedCenters: []});

  const navigation = useNavigation();

  const onPressTab = (tab: string) => {
    setSelectedTab(tab);
    setData([]);
  };

  const onPressRightTab = (tab: string) => {
    setSelectedTabRight(tab);
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
    let currentData =
      selectedTab === 'PanelHospitals'
        ? allData.panelHospitals
        : allData.discountedCenters;

    if (searchText.trim()) {
      currentData = currentData.filter(
        item =>
          item.headerLabel?.toLowerCase().includes(lowerText) ||
          item.items?.some(subItem =>
            subItem.value?.toLowerCase().includes(lowerText),
          ),
      );
    }

    setData(currentData);
  }, [selectedTab, searchText, allData]);

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

  const {loading: loadingPanelHospitals} = useApiHook({
    apiEndpoint: endpoints.panelHospital.getPanelHospitals,
    method: 'get',
    onSuccess: res => {
      const formattedData =
        res?.map(item => ({
          headerLabel: item?.HospitalName,
          headerIcon: drawerIcons.drawerHospitalDirectory,
          longitude: item?.HospitalLong,
          latitude: item?.HospitalLat,
          items: [
            {label: 'Phone:', value: item?.HospitalContact},
            {label: 'Address:', value: item?.HospitalAddress},
            {label: 'City:', value: item?.CityName},
          ],
        })) || [];

      setAllData(prev => ({
        ...prev,
        panelHospitals: formattedData,
      }));
    },
  });

  const {loading: loadingDiscountedCenters} = useApiHook({
    apiEndpoint: endpoints.discountedCenters.getDiscountedCenters,
    method: 'get',
    onSuccess: res => {
      const formattedData =
        res?.map(item => ({
          headerLabel: item?.DisCenName,
          headerIcon: icons.panelHospitalIcon,
          longitude: item?.DisCenLong,
          latitude: item?.DisCenLat,
          items: [
            {label: 'Phone:', value: item?.DisCenContact},
            {label: 'Address:', value: item?.DisCenAddress},
            {label: 'City:', value: item?.CityName},
          ],
        })) || [];

      setAllData(prev => ({
        ...prev,
        discountedCenters: formattedData,
      }));
    },
  });

  return {
    states: {
      data,
      selectedTab,
      selectedTabRight,
      searchText,
      loading: loadingPanelHospitals || loadingDiscountedCenters,
      position,
    },
    functions: {
      onPressTab,
      onPressRightTab,
      goBack,
      setSearchText,
      handleMapDirection,
    },
  };
};

export default usePanelHospitalListViewModel;
