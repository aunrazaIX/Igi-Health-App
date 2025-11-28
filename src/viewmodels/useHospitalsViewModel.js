import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useState, useEffect, useCallback} from 'react';
import {icons} from '../assets';
import {Linking} from 'react-native';
import Geolocation from '@react-native-community/geolocation';

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

  const hospitals = [
    {
      HospitalName: 'Agha Khan University Hospital',
      HospitalLong: '67.112233',
      HospitalLat: '24.928374',
      ProvinceName: 'Sindh',
      HospitalContact: '+92-21-111-911-911',
      HospitalAddress: 'Stadium Road, Karachi',
      CityName: 'Karachi',
    },
    {
      HospitalName: 'Shaukat Khanum Memorial Hospital',
      HospitalLong: '74.358749',
      HospitalLat: '31.520370',
      ProvinceName: 'Punjab',
      HospitalContact: '+92-42-35905000',
      HospitalAddress: 'Johar Town, Lahore',
      CityName: 'Lahore',
    },
    {
      HospitalName: 'PIMS Hospital',
      HospitalLong: '73.055102',
      HospitalLat: '33.693811',
      ProvinceName: 'Islamabad',
      HospitalContact: '+92-51-9261170',
      HospitalAddress: 'G-8/3, Islamabad',
      CityName: 'Islamabad',
    },
    {
      HospitalName: 'Liaquat National Hospital',
      HospitalLong: '67.075078',
      HospitalLat: '24.873514',
      ProvinceName: 'Sindh',
      HospitalContact: '+92-21-111-456-456',
      HospitalAddress: 'National Stadium Road, Karachi',
      CityName: 'Karachi',
    },
  ];

  useEffect(() => {
    const formattedData = hospitals.map(item => ({
      headerLabel: item.HospitalName,
      headerIcon: icons.hospitalInactive,
      longitude: item.HospitalLong,
      latitude: item.HospitalLat,
      ProvinceName: item.ProvinceName,
      items: [
        {label: 'Phone:', value: item.HospitalContact},
        {label: 'Address:', value: item.HospitalAddress},
        {label: 'City:', value: item.CityName},
      ],
    }));

    setAllData(formattedData);
  }, []);

  useEffect(() => {
    let filtered = allData;
    if (selectedMapTab !== 'All') {
      filtered = filtered.filter(item => item.ProvinceName === selectedMapTab);
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

  const [position, setPosition] = useState({
    latitude: 10,
    longitude: 10,
    latitudeDelta: 0.001,
    longitudeDelta: 0.001,
  });

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
        () => {},
      );
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
      position,
      modalVisible,
      tabChanging,
      hospitalLoading: false,
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
