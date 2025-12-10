import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useState, useEffect, useCallback} from 'react';
import {Linking} from 'react-native';
import {icons} from '../assets';
import Geolocation from '@react-native-community/geolocation';

const usePanelHospitalListViewModel = () => {
  const navigation = useNavigation();
  const panelHospitals = [];
  const discountedCenters = [
    {
      headerLabel: 'Health Lab',
      headerIcon: icons.labsInactive,
      latitude: 24.8607,
      longitude: 67.0011,
      items: [
        {label: 'Phone:', value: '021-9988776'},
        {label: 'Address:', value: 'Clifton Block 8'},
        {label: 'Discount:', value: '25%'},
        {label: 'City:', value: 'Karachi'},
      ],
    },
    {
      headerLabel: 'Mega Diagnostics',
      headerIcon: icons.labsInactive,
      latitude: 31.51,
      longitude: 74.34,
      items: [
        {label: 'Phone:', value: '042-7788990'},
        {label: 'Address:', value: 'Faisal Town'},
        {label: 'Discount:', value: '30%'},
        {label: 'City:', value: 'Lahore'},
      ],
    },
  ];
  const [selectedTab, setSelectedTab] = useState('DiscountedCenters');
  const [selectedTabRight, setSelectedTabRight] = useState('list');
  const [data, setData] = useState([]);
  const [position, setPosition] = useState({
    latitude: 10,
    longitude: 10,
    latitudeDelta: 0.001,
    longitudeDelta: 0.001,
  });
  const [modalVisible, setModalVisible] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [allData, setAllData] = useState({panelHospitals, discountedCenters});

  const onPressTab = tab => {
    setSelectedTab(tab);
    setData([]);
  };

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
          setPosition({
            latitude: crd.latitude,
            longitude: crd.longitude,
            latitudeDelta: 0.0421,
            longitudeDelta: 0.0421,
          });
        },
        err => console.log(err),
      );
    }, []),
  );

  const showModal = () => {
    setModalVisible(false);
  };

  return {
    states: {
      data,
      selectedTab,
      selectedTabRight,
      searchText,
      loading: false,
      position,
      modalVisible,
    },
    functions: {
      onPressTab,
      onPressRightTab,
      goBack,
      setSearchText,
      handleMapDirection,
      showModal,
    },
  };
};

export default usePanelHospitalListViewModel;
