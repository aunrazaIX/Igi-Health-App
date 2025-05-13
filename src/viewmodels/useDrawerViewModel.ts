import {useNavigation} from '@react-navigation/native';
import {drawerIcons, icons} from '../assets';
import {ImageSourcePropType} from 'react-native';

type UseDrawerViewModel = {
  states: {
    routes: routesData[];
  };
};

type routesData = {
    id: number;
    name: string;
    icon?: ImageSourcePropType;
    to?: string;
    mainParent?: string;
    stChild?: string;
    ndChild?: string;

};

const useDrawerViewModel = (): UseDrawerViewModel => {

  const routes: routesData[] = [
    {
          id: 1,
          name: 'Home',
          icon: drawerIcons.drawerHome,
          to: 'Home',
        },
        {
          id: 2,
          name: 'Benefits',
          icon: drawerIcons.drawerBenefits,
          mainParent: 'Tabs',
          stChild: 'HomeStack',
          ndChild: 'Benefits',
        },
    
        {
          id: 3,
          name: 'Personal',
          icon: drawerIcons.drawerPersonal,
          mainParent: 'Tabs',
          stChild: 'HomeStack',
          ndChild: 'Personal',
        },
    
        {
          id: 4,
          name: 'Lodge Claim',
          icon: drawerIcons.drawerLodgeClaim,
          mainParent: 'Tabs',
          stChild: 'LodgeClaim',
        },
        {
          id: 5,
          name: 'Prior Approval',
          icon: drawerIcons.drawerPriorApproval,
          mainParent: 'Tabs',
          stChild: 'PriorApproval',
        },
        {
          id: 6,
          name: 'Add Dependent',
          icon: drawerIcons.drawerAddDependent,
          mainParent: 'Tabs',
          stChild: 'HomeStack',
          ndChild: 'Personal',
        },
        {
          id: 7,
          name: 'Claims History',
          icon: drawerIcons.drawerClaimHistory,
          to: 'ClaimsHistory',
        },
        {
          id: 8,
          name: 'Hospital Directory',
          icon: drawerIcons.drawerHospitalDirectory,
          mainParent: 'Tabs',
          stChild: 'HomeStack',
          ndChild: 'Hospitals',
        },
        {
          id: 9,
          name: 'Discounted Centers',
          icon: drawerIcons.drawerDiscountedCenters,
          mainParent: 'Tabs',
          stChild: 'HomeStack',
          ndChild: 'PanelHospitalList',
        },
        {
          id: 10,
          name: 'Helpline',
          icon: drawerIcons.drawerHelpline,
          mainParent: 'Tabs',
          stChild: 'Helpline',
        },
    
        {
          id: 11,
          name: 'Notifications',
          icon: drawerIcons.drawerNotification,
          mainParent: 'Tabs',
          stChild: 'HomeStack',
          ndChild: 'Notifications',
        },
        {
          id: 12,
          name: 'FAQs',
          icon: drawerIcons.drawerFAQ,
          to: 'FAQs',
        },
        {
          id: 13,
          name: 'Settings',
          icon: drawerIcons.drawerSettings,
          mainParent: 'SettingsStack',
          stChild: 'Settings',
        },
    
        {
          id: 14,
          name: 'Logout',
          icon: drawerIcons.drawerLogout,
          to: "logout"
        },
  ];
  return {
    states: {
        routes,
    },
  };
};

export default useDrawerViewModel;
