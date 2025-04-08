import {useState} from 'react';
import {icons, images} from '../assets';
import {COLORS} from '../assets/theme/colors';

type CardItemData = {
  logo: any;
  name: string;
  image: any;
  backgroundColor: any;
};

type UseHomeViewModelReturn = {
  states: {
    selectedTab: string;
    cardData: CardItemData[];
  };
  functions: {
    onPressTab: (name: string) => void;
  };
};

const useHomeViewModel = (): UseHomeViewModelReturn => {
  const [selectedTab, setSelectedTab] = useState<string>('login');

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
      name: 'Lodge a Claim',
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

  return {
    states: {
      selectedTab,
      cardData,
    },
    functions: {
      onPressTab,
    },
  };
};

export default useHomeViewModel;
