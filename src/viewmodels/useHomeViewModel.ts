import {useRef, useState} from 'react';
import {icons} from '../assets';
import {COLORS} from '../assets/theme/colors';
import { Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
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
    frontAnimatedStyle: {};
    backAnimatedStyle: {};
  };
  functions: {
    onPressTab: (name: string) => void;
    animateCard: () => void;
    toggleDrawer: () => void;
    onPressMenu: (route: string) => void;
  };
};

const useHomeViewModel = (): UseHomeViewModelReturn => {
  const navigate = useNavigation();
  const [selectedTab, setSelectedTab] = useState<string>('login');
  const animateValue = useRef(new Animated.Value(0)).current;
  const currentValue = useRef(0);
  animateValue.addListener(({value}) => {
    currentValue.current = value;
  });

  const animateCard = () => {
    if(currentValue.current >= 90){
    Animated.timing(animateValue, {
      toValue: 0,
      duration: 800,
      useNativeDriver: true,
    }).start()}else{
      Animated.timing(animateValue, {
        toValue: 180,
        duration: 1000,
        useNativeDriver: true,
      }).start()
    }
    
  }

  const rotateFront = animateValue.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg'],
  });
  
  const rotateBack = animateValue.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg'],
  });
  
  const frontAnimatedStyle = {
    transform: [{ perspective: 1000 },{ rotateY: rotateFront }],
  };
  
  const backAnimatedStyle = {
    transform: [{ perspective: 1000 },{ rotateY: rotateBack }],
  };
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

  const onPressTab = (name: string) => setSelectedTab(name);
  const toggleDrawer=()=>{
    navigate.toggleDrawer();
  }

  const onPressMenu = (route: string) => {
    console.log("hye" , route)
    navigate.navigate(route);
  };

  return {
    states: {
      selectedTab,
      cardData,
      backAnimatedStyle,
      frontAnimatedStyle,
    },
    functions: {
      onPressTab,
      animateCard,
      toggleDrawer,
      onPressMenu
    },
  };
};

export default useHomeViewModel;
