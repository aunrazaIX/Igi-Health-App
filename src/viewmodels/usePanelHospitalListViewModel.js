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
  const [searchText, setSearchText] = useState(null);
  const [position, setPosition] = useState({
    latitude: 24.8607,
    longitude: 67.0011,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const onPressRightTab = tab => {
    setSelectedTabRight(tab);
  };

  const handleMapDirection = (latitude, longitude) => {
    if (latitude && longitude) {
      const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
      Linking.openURL(url).catch(err => console.log(err));
    }
  };
  const goBack = () => navigation.goBack();

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchText !== null) {
        trigger();
      }
    }, 1000);
    return () => clearTimeout(delayDebounceFn);
  }, [searchText]);

  const {loading, trigger} = useApiHook({
    apiEndpoint: endpoints.discountedCenters.getDiscountedCenters(1),
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
          items: [
            {label: 'Phone:', value: item?.phoneNumber},
            {label: 'Address:', value: item?.address},
            {label: 'Discount:', value: item?.discountPercentage},
            {label: 'City:', value: item?.city?.name},
          ],
        })) || [];
      setData(formattedData);
    },
  });
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

  const showModal = () => {
    setModalVisible(false);
  };

  return {
    states: {
      data,
      selectedTabRight,
      searchText,
      loading,
      modalVisible,
      position,
    },
    functions: {
      onPressRightTab,
      goBack,
      setSearchText,
      handleMapDirection,
      showModal,
      openInGoogleMaps,
      cleanCoordinate,
    },
  };
};

export default usePanelHospitalListViewModel;
