import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import {ImageSourcePropType} from 'react-native';
import {icons} from '../assets';
import useApiHook from '../hooks/useApiHook';
import endpoints from '../api/endspoints';

export type PanelHospitalGroup = {
  headerLabel: string;
  headerIcon: ImageSourcePropType;
  items: PanelHospitalList[];
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
  };
  functions: {
    onPressTab: (tab: string) => void;
    onPressRightTab: (tab: string) => void;
    goBack: () => void;
  };
};

const usePanelHospitalListViewModel = (): usePanelHospitalListViewModel => {
  const [selectedTab, setSelectedTab] = useState('PanelHospitals');
  const [selectedTabRight, setSelectedTabRight] = useState('list');
  const [data, setData] = useState<PanelHospitalGroup[]>([]);

  const navigation = useNavigation();
  const {loading} = useApiHook({
    apiEndpoint: endpoints.discountedCenters.getDiscountedCenters,
    method: 'get',
    onSuccess: res => {
      setData(
        res?.map(item => ({
          headerLabel: ``,
          headerIcon: icons.taskEdit,
          longitude: item?.DisCenLong,
          latitude: item?.DisCenLat,
          items: [
            {label: 'name:', value: item?.DisCenName},
            {label: 'phone:', value: item?.DisCenContact},
            {
              label: 'Address:',
              value: item?.DisCenAddress,
            },
            {label: 'City:', value: item?.CityName},
          ],
        })),
      );
    },
  });

  const onPressTab = (tab: string) => {
    setSelectedTab(tab);
  };

  const onPressRightTab = (tab: string) => {
    setSelectedTabRight(tab);
  };

  const goBack = () => {
    navigation.goBack();
  };

  // const data: PanelHospitalGroup[] = [
  //   {
  //     headerLabel: 'Baluchistan',
  //     headerIcon: icons.panelHospitalIcon,
  //     items: [
  //       {label: 'name:', value: 'Heart & General Hospital'},
  //       {label: 'phone:', value: '81-2822408, 081-2822409'},
  //       {
  //         label: 'Address:',
  //         value: '15D, 16D, Model Town, Old Pishin Bus Stop, Quetta',
  //       },
  //       {label: 'City:', value: 'Baluchistan, Quetta'},
  //     ],
  //   },

  //   {
  //     headerLabel: 'Larkana',
  //     headerIcon: icons.panelHospitalIcon,
  //     items: [
  //       {label: 'name:', value: 'NICVD Larkana'},
  //       {label: 'phone:', value: '---'},
  //       {
  //         label: 'Address:',
  //         value: 'Department of Cardiology, Civil Hospital, VIP Road, Larkana',
  //       },
  //       {label: 'City:', value: 'Larkana'},
  //     ],
  //   },

  //   {
  //     headerLabel: 'Hyderabad',
  //     headerIcon: icons.panelHospitalIcon,
  //     items: [
  //       {label: 'name:', value: 'NICVD Larkana'},
  //       {label: 'phone:', value: '---'},
  //       {
  //         label: 'Address:',
  //         value: 'Department of Cardiology, Civil Hospital, VIP Road, Larkana',
  //       },
  //       {label: 'City:', value: 'Hyderabad'},
  //     ],
  //   },

  //   {
  //     headerLabel: 'Hyderabad',
  //     headerIcon: icons.panelHospitalIcon,
  //     items: [
  //       {label: 'name:', value: 'NICVD Larkana'},
  //       {label: 'phone:', value: '---'},
  //       {
  //         label: 'Address:',
  //         value: 'Department of Cardiology, Civil Hospital, VIP Road, Larkana',
  //       },
  //       {label: 'City:', value: 'Hyderabad'},
  //     ],
  //   },
  // ];

  return {
    states: {
      data,
      selectedTab,
      selectedTabRight,
    },
    functions: {
      onPressTab,
      onPressRightTab,
      goBack,
    },
  };
};

export default usePanelHospitalListViewModel;
