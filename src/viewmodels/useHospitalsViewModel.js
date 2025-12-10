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
  const [searchText, setSearchText] = useState('');
  const [allData, setAllData] = useState([]);
  const [data, setData] = useState([]);
  const [modalVisible, setModalVisible] = useState(true);
  const [tabChanging, setTabChanging] = useState(false);

  useEffect(() => {
    let filtered = allData;
    if (selectedMapTab !== 'All') {
      filtered = filtered.filter(item => item?.province === selectedMapTab);
    }

    if (searchText.trim()) {
      const lower = searchText.toLowerCase();
      filtered = filtered.filter(
        item =>
          item.headerLabel.toLowerCase().includes(lower) ||
          item.items.some(sub => sub.value.toLowerCase().includes(lower)),
      );
    }
    setData(filtered);
    setTabChanging(false);
  }, [searchText, selectedMapTab, allData]);

  const {loading: hospitalLoading, trigger} = useApiHook({
    apiEndpoint: endpoints.discountedCenters.getDiscountedCenters,
    method: 'post',
    argsOrBody: {
      isAllRecord: true,
    },
    onSuccess: res => {
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
  });
  useFocusEffect(
    useCallback(() => {
      trigger();
    }, []),
  );

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
    },
    functions: {
      onPressTab,
      onPressRightTab,
      onPressMapTab,
      goBack,
      setSearchText,
      handleMapDirection,
      setModalVisible,
    },
  };
};

export default useHospitalsViewModel;
