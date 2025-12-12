import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useState, useEffect, useCallback} from 'react';
import {Linking} from 'react-native';
import {icons} from '../assets';
import Geolocation from '@react-native-community/geolocation';
import useApiHook from '../hooks/useApiHook';
import endpoints from '../api/endspoints';

const usePanelHospitalListViewModel = () => {
  const navigation = useNavigation();
  const [selectedTabRight, setSelectedTabRight] = useState('list');
  const [data, setData] = useState([]);
  const [modalVisible, setModalVisible] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [allData, setAllData] = useState({});

  const onPressRightTab = tab => {
    setSelectedTabRight(tab);
  };

  const handleMapDirection = (latitude, longitude) => {
    if (latitude && longitude) {
      const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
      Linking.openURL(url).catch(err => {
        console.error('Failed to open Google Maps:', err);
      });
    }
  };
  const goBack = () => navigation.goBack();

  useEffect(() => {
    let filtered = allData;
    const lowerText = searchText.toLowerCase();
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
  }, [searchText, allData]);

  const {loading, trigger} = useApiHook({
    apiEndpoint: endpoints.discountedCenters.getDiscountedCenters(1),
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

  const showModal = () => {
    setModalVisible(false);
  };

  return {
    states: {
      data,
      selectedTabRight,
      searchText,
      loading: false,
      modalVisible,
    },
    functions: {
      onPressRightTab,
      goBack,
      setSearchText,
      handleMapDirection,
      showModal,
    },
  };
};

export default usePanelHospitalListViewModel;
