import {useRef, useState} from 'react';
import {cardIcons, icons} from '../assets';
import {COLORS} from '../assets/theme/colors';
import {Animated} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {ImageSourcePropType} from 'react-native';
import endpoints from '../api/endspoints';
import useApiHook from '../hooks/useApiHook';
import formatCurrency from '../utils';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {DrawerStackParamList} from '../navigation/types';
import {useSelector} from 'react-redux';
import {RootState} from '@reduxjs/toolkit/query';

export type CardItemData = {
  logo?: ImageSourcePropType;
  name?: string;
  image?: ImageSourcePropType;
  backgroundColor?: string;
  to?: string;
  mainParent?: string;
  stChild?: string;
  type?: string;
};

export type HomeHeaderData = {
  logo: ImageSourcePropType;
  name: string;
  to: string;
};

type UseHomeViewModelReturn = {
  states: {
    selectedTab: string;
    cardData: CardItemData[];
    frontAnimatedStyle: {};
    backAnimatedStyle: {};
    homeCardData: any;
    claimData: {
      totalClaimAmount: string;
      deductedAmount: string;
      paidAmount: string;
    };
    loading: boolean;
    homeCardDataLoading: any;
  };
  functions: {
    onPressTab: (name: string) => void;
    animateCard: () => void;
    toggleDrawer: () => void;
    onPressMenu: (cardData: CardItemData) => void;
    onPressHeaderIcon: () => void;
  };
};

const useHomeViewModel = (): UseHomeViewModelReturn => {
  const user = useSelector((state: RootState) => state.auth.user);

  console.log(user, 'userrrr');
  const navigate = useNavigation<DrawerNavigationProp<DrawerStackParamList>>();
  const [selectedTab, setSelectedTab] = useState<string>('login');

  const animateValue = useRef(new Animated.Value(0)).current;
  const currentValue = useRef(0);

  animateValue.addListener(({value}) => {
    currentValue.current = value;
  });
  // const {rememberMe, credentials} = useSelector(state => state.auth);

  const animateCard = () => {
    if (currentValue.current >= 90) {
      Animated.timing(animateValue, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(animateValue, {
        toValue: 180,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    }
  };

  const rotateFront = animateValue.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg'],
  });

  const rotateBack = animateValue.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg'],
  });

  const frontAnimatedStyle = {
    transform: [{perspective: 1000}, {rotateY: rotateFront}],
  };

  const backAnimatedStyle = {
    transform: [{perspective: 1000}, {rotateY: rotateBack}],
  };

  // second APi Call

  const {
    data: homeCardData,
    loading: homeCardDataLoading,
    trigger,
  } = useApiHook({
    apiEndpoint: endpoints.policy.getPolicyDetails,
    method: 'get',
    skip: true,

    onSuccess: res => {
      console.log(res, 'yaehh raha second APi ka response');
      console.log(data, 'second api ersponse another');
    },
    onError: e => {
      console.log('error in seocnd APi ', e);
    },
  });

  // 1st api call
  const {data: policyData, loading: Loading} = useApiHook({
    apiEndpoint: endpoints.policy.getPolicyTypes,
    method: 'get',
    argsOrBody: {
      ClientCode: user?.ClientCode,
    },

    onSuccess: res => {
      let policyNumber;

      if (res?.length > 1) {
        res?.forEach(item => {
          if (item?.PolicyCode?.startsWith('G' || 'g')) {
            policyNumber = item?.PolicyCode;
          }
        });
      } else if (res?.length == 1) {
        policyNumber = res[0]?.PolicyCode;
      }

      let apiData = {
        policyCode: policyNumber,
        cnic: user.cnic,
      };
      console.log('triggering second API');
      trigger(apiData);
    },
    onError: e => {
      console.log(e, 'Erorrrrrr');
    },
  });

  const cardData: CardItemData[] = [
    {
      logo: cardIcons.benefits,
      name: 'Benefits',
      image: icons.forwardArrow,
      backgroundColor: COLORS.cardBackgroundBlue,
      to: 'Benefits',
    },
    {
      logo: cardIcons.personal,
      name: 'Personal',
      image: icons.forwardArrow,
      backgroundColor: COLORS.cardBackgroundRed,
      to: 'Personal',
    },

    {
      logo: cardIcons.lodgeClaim,
      name: 'Lodge A Claim',
      image: icons.forwardArrow,
      backgroundColor: COLORS.cardBackgroundBlue,
      mainParent: 'Tabs',
      stChild: 'LodgeClaim',
    },
    {
      logo: cardIcons.taskDone,
      name: 'Prior Approval',
      image: icons.forwardArrow,
      backgroundColor: COLORS.cardBackgroundBlue,
      mainParent: 'Tabs',
      stChild: 'PriorApproval',
      type: 'PriorApproval',
    },
    {
      logo: cardIcons.hospital,
      name: 'Hopsital Directory',
      image: icons.forwardArrow,
      backgroundColor: COLORS.cardBackgroundRed,
      to: 'Hospitals',
    },
    {
      logo: cardIcons.discountedCenters,
      name: 'Discounted Centers',
      image: icons.forwardArrow,
      backgroundColor: COLORS.cardBackgroundBlue,
      to: 'PanelHospitalList',
    },
    {
      logo: cardIcons.helpLine,
      name: 'Help Line',
      image: icons.forwardArrow,
      backgroundColor: COLORS.cardBackgroundBlue,
      mainParent: 'Tabs',
      stChild: 'Helpline',
    },
  ];

  const onPressTab = (name: string) => setSelectedTab(name);
  const toggleDrawer = () => {
    navigate.toggleDrawer();
  };

  const onPressMenu = (cardData: CardItemData) => {
    if (cardData?.to) {
      navigate.navigate(cardData.to);

      return;
    }

    if (cardData?.mainParent) {
      navigate.navigate(cardData?.mainParent, {
        screen: cardData?.stChild,
      });
    }
  };

  const onPressHeaderIcon = (to: string) => {
    if (to) {
      navigate.navigate(to);
    }
  };

  return {
    states: {
      selectedTab,
      cardData,
      backAnimatedStyle,
      frontAnimatedStyle,
      homeCardData,
      claimData: data,
      loading,
      homeCardDataLoading,
    },
    functions: {
      onPressTab,
      animateCard,
      toggleDrawer,
      onPressMenu,
      onPressHeaderIcon,
    },
  };
};

export default useHomeViewModel;
