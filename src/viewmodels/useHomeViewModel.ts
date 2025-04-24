import {useRef, useState} from 'react';
import {icons} from '../assets';
import {COLORS} from '../assets/theme/colors';
import { Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export type CardItemData = {
  logo: any;
  name: string;
  image: any;
  backgroundColor: any;
};

type UseHomeViewModelReturn = {
  states: {
    selectedTab: string;
    cardData: CardItemData[];
    frontAnimatedStyle: {};
    backAnimatedStyle: {};
  };
  functions: {
    onPressTab: (name: string) => void;
    animateCard: () => void;
    toggleDrawer: () => void;
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
    },

    {
      logo: icons.person,
      name: 'Personal',
      image: icons.rightArrowRound,
      backgroundColor: COLORS.cardBackgroundRed,
    },

    {
      logo: icons.claim,
      name: 'Lodge A Claim',
      image: icons.rightArrowRound,
      backgroundColor: COLORS.cardBackgroundBlue,
    },

    {
      logo: icons.benefits,
      name: 'Prior Approval',
      image: icons.rightArrowRound,
      backgroundColor: COLORS.cardBackgroundBlue,
    },
    {
      logo: icons.benefits,
      name: 'Hopsital Directory',
      image: icons.rightArrowRound,
      backgroundColor: COLORS.cardBackgroundRed,
    },
    {
      logo: icons.benefits,
      name: 'Discounted Centers',
      image: icons.rightArrowRound,
      backgroundColor: COLORS.cardBackgroundBlue,
    },
    {
      logo: icons.benefits,
      name: 'Help Line',
      image: icons.rightArrowRound,
      backgroundColor: COLORS.cardBackgroundBlue,
    },
  ];

  const onPressTab = (name: string) => setSelectedTab(name);
  const toggleDrawer=()=>{
    navigate.toggleDrawer();
  }

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
    },
  };
};

export default useHomeViewModel;
