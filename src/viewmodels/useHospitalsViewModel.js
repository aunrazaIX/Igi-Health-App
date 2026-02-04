import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useState, useEffect, useCallback} from 'react';
import {icons} from '../assets';
import {Linking} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import useApiHook from '../hooks/useApiHook';
import endpoints from '../api/endspoints';

const useHospitalsViewModel = () => {
  const navigation = useNavigation();
  const [selectedTab, setSelectedTab] = useState('Panel Hospitals');
  const [selectedTabRight, setSelectedTabRight] = useState('list');
  const [selectedMapTab, setSelectedMapTab] = useState('All');
  const [searchText, setSearchText] = useState(null);
  const [allData, setAllData] = useState([]);
  const [data, setData] = useState([]);
  const [modalVisible, setModalVisible] = useState(true);
  const [tabChanging, setTabChanging] = useState(false);
  const [position, setPosition] = useState({
    latitude: 24.8607,
    longitude: 67.0011,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  useEffect(() => {
    let filtered = allData;
    if (selectedMapTab !== 'All') {
      filtered = filtered.filter(item => item?.province === selectedMapTab);
    }
    setData(filtered);
    setTabChanging(false);
  }, [selectedMapTab, allData]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchText !== null) {
        trigger();
      }
    }, 1000);
    return () => clearTimeout(delayDebounceFn);
  }, [searchText]);

  const {loading: hospitalLoading, trigger} = useApiHook({
    apiEndpoint: endpoints.discountedCenters.getDiscountedCenters(2),
    method: 'post',
    argsOrBody: {
      searchString: searchText,
      isAllRecord: true,
    },
    onSuccess: res => {
      console.log(res);
      const formattedData =
        res?.data?.dataList?.map(item => ({
          headerLabel: item?.name,
          headerIcon: icons.hospitalInactive,
          longitude: item?.longitude,
          latitude: item?.latitude,
          province: item?.city?.province,
          items: [
            {label: 'Phone:', value: item?.phoneNumber},
            {label: 'Address:', value: item?.address},
            {label: 'City:', value: item?.city?.name},
          ],
        })) || [];
      setAllData(formattedData);
    },
    onError: err => console.log(err),
  });

  const handleMapDirection = (latitude, longitude) => {
    if (latitude && longitude) {
      const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
      Linking.openURL(url).catch(err => console.log(err));
    }
  };

  const onPressTab = tab => setSelectedTab(tab);
  const onPressRightTab = tab => setSelectedTabRight(tab);
  const goBack = () => navigation.goBack();

  const onPressMapTab = tab => {
    if (selectedMapTab === tab) return;
    setTabChanging(true);
    setSelectedMapTab(tab);
  };
  useFocusEffect(
    useCallback(() => {
      trigger();
      Geolocation.getCurrentPosition(
        pos => {
          const crd = pos.coords;
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
  const cleanCoordinate = value => {
    if (!value || typeof value !== 'string') return null;

    const match = value.match(/^([\d.]+)\s*°/);
    if (!match) return null;

    const number = parseFloat(match[1]);
    return isNaN(number) ? null : number;
  };
  const openInGoogleMaps = (latitude, longitude) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    Linking.openURL(url);
  };
  return {
    states: {
      data,
      selectedTab,
      selectedTabRight,
      selectedMapTab,
      searchText,
      modalVisible,
      tabChanging,
      hospitalLoading,
      position,
    },
    functions: {
      onPressTab,
      onPressRightTab,
      onPressMapTab,
      goBack,
      setSearchText,
      handleMapDirection,
      setModalVisible,
      cleanCoordinate,
      openInGoogleMaps,
    },
  };
};

export default useHospitalsViewModel;
