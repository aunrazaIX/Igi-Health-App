import {useState} from 'react';
import {icons} from '../assets';
import {COLORS} from '../assets/theme/colors';

export type CardItemData = {
  logo: any;
  name: string;
  image: any;
  backgroundColor: any;
};

type UseHomeViewModelReturn = {
  states: {
    selectedTab: string;
    frontCard: boolean;
    cardData: CardItemData[];
  };
  functions: {
    onPressTab: (name: string) => void;
    onPressCard : (value : boolean) =>void;
  };
};

const useHomeViewModel = (): UseHomeViewModelReturn => {
  const [selectedTab, setSelectedTab] = useState<string>('login');

  const [frontCard, setFrontCard] = useState<boolean>(true);

  const onPressTab = (name: string) => setSelectedTab(name);

  const onPressCard = (value: boolean) => setFrontCard(!frontCard);

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

  return {
    states: {
      selectedTab,
      cardData,
      frontCard
    },
    functions: {
      onPressTab,
      onPressCard
    },
  };
};

export default useHomeViewModel;
