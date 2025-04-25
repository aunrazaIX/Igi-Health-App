import {useState} from 'react';
import {icons} from '../assets';
import {COLORS} from '../assets/theme/colors';
import {useNavigation} from '@react-navigation/native';
import {ImageSourcePropType} from 'react-native';

export type CardItemData = {
  logo: any;
  name: string;
  image: any;
  backgroundColor: any;
  to: any;
};

// export type menusData = {
//   name: string;
//   icon: ImageSourcePropType;
//   to: string;
// };

type UseHomeViewModelReturn = {
  states: {
    selectedTab: string;
    frontCard: boolean;
    cardData: CardItemData[];
  };
  functions: {
    onPressTab: (name: string) => void;
    onPressCard: (value: boolean) => void;
    openDrawer: () => void;
    onPressMenu: (route: string) => void;
  };
};

const useHomeViewModel = (): UseHomeViewModelReturn => {



  const [selectedTab, setSelectedTab] = useState<string>('login');
  const navigate = useNavigation();

  const [frontCard, setFrontCard] = useState<boolean>(true);

  const onPressTab = (name: string) => setSelectedTab(name);

  const onPressCard = (value: boolean) => setFrontCard(!frontCard);

  // const menus: menusData[] = [
  //   {
  //     name: 'Benefits',
  //     icon: icons.benefits,
  //     to: 'Benefits',
  //   },
  //   {
  //     name: 'Personal',
  //     icon: icons.benefits,
  //     to: 'Personal',
  //   },
  //   {
  //     name: 'Prior Approval',
  //     icon: icons.benefits,
  //     to: 'PriorApproval',
  //   },
  // ];

  const cardData: CardItemData[] = [
    {
      logo: icons.benefits,
      name: 'Benefits',
      image: icons.rightArrowRound,
      backgroundColor: COLORS.cardBackgroundBlue,
      to: 'Benefits',
    },

    {
      logo: icons.person,
      name: 'Personal',
      image: icons.rightArrowRound,
      backgroundColor: COLORS.cardBackgroundRed,
      to: 'Personal',
    },

    {
      logo: icons.claim,
      name: 'Lodge A Claim',
      image: icons.rightArrowRound,
      backgroundColor: COLORS.cardBackgroundBlue,
      to: 'PriorApproval',
    },

    {
      logo: icons.benefits,
      name: 'Prior Approval',
      image: icons.rightArrowRound,
      backgroundColor: COLORS.cardBackgroundBlue,
      to: 'PriorApproval',
    },
    {
      logo: icons.benefits,
      name: 'Hopsital Directory',
      image: icons.rightArrowRound,
      backgroundColor: COLORS.cardBackgroundRed,
      to: 'Hospitals',
    },
    {
      logo: icons.benefits,
      name: 'Discounted Centers',
      image: icons.rightArrowRound,
      backgroundColor: COLORS.cardBackgroundBlue,
      to: 'PanelHospitalList',
    },
    {
      logo: icons.benefits,
      name: 'Help Line',
      image: icons.rightArrowRound,
      backgroundColor: COLORS.cardBackgroundBlue,
      to: 'HelpLine',
    },
  ];

  const openDrawer = () => {
    navigate?.toggleDrawer();
  };

  const onPressMenu = (route: string) => {
    console.log("hye" , route)
    navigate.navigate(route);
  };


  return {
    states: {
      selectedTab,
      cardData,
      frontCard,
    },
    functions: {
      onPressTab,
      onPressCard,
      openDrawer,
      onPressMenu,
    },
  };
};

export default useHomeViewModel;
